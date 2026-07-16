import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, TrendingUp, Award, Code, Clock } from 'lucide-react'

const CodingProfiles = () => {
  const [leetcodeData, setLeetcodeData] = useState(null)
  const [hackerrankData, setHackerrankData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // LeetCode Data Fetching
  // Note: LeetCode GraphQL API has CORS restrictions. 
  // For production, use a backend proxy or public API service like leetcode-api-faisalshohag
  const fetchLeetcodeData = async () => {
    const cacheKey = 'leetcode_data'
    const cacheTime = 1000 * 60 * 60 * 6 // 6 hour cache
    const cached = localStorage.getItem(cacheKey)
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < cacheTime) {
        return data
      }
    }

    try {
      // Try using a public LeetCode stats API (you can replace with your own backend)
      // Example: https://leetcode-api-faisalshohag.vercel.app/hamsha07
      const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/hamsha07', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        if (result && result.totalSolved !== undefined) {
          const data = {
            total: result.totalSolved || 0,
            easy: result.easySolved || 0,
            medium: result.mediumSolved || 0,
            hard: result.hardSolved || 0,
            rank: result.ranking || null,
            acceptanceRate: result.acceptanceRate || null,
            badges: [],
            lastUpdated: new Date().toISOString(),
          }
          
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))
          return data
        }
      }
    } catch (err) {
      console.error('LeetCode API error:', err)
      // If API fails, try GraphQL as fallback (may fail due to CORS)
      try {
        const query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile { ranking }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `
        const graphqlResponse = await fetch('https://leetcode.com/graphql/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables: { username: 'hamsha07' } }),
        })
        
        if (graphqlResponse.ok) {
          const result = await graphqlResponse.json()
          if (result.data?.matchedUser) {
            const user = result.data.matchedUser
            const stats = user.submitStats?.acSubmissionNum || []
            const data = {
              total: stats.reduce((sum, item) => sum + item.count, 0),
              easy: stats.find(s => s.difficulty === 'Easy')?.count || 0,
              medium: stats.find(s => s.difficulty === 'Medium')?.count || 0,
              hard: stats.find(s => s.difficulty === 'Hard')?.count || 0,
              rank: user.profile?.ranking || null,
              badges: [],
              lastUpdated: new Date().toISOString(),
            }
            localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))
            return data
          }
        }
      } catch (graphqlErr) {
        console.error('LeetCode GraphQL error:', graphqlErr)
      }
    }

    // Return cached data even if expired, or default placeholder values
    if (cached) {
      const cachedData = JSON.parse(cached).data
      // Mark as stale but still show it
      cachedData.isStale = true
      return cachedData
    }
    
    // Default placeholder - update these manually if API doesn't work
    return {
      total: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      rank: null,
      badges: [],
      lastUpdated: null,
      isPlaceholder: true,
    }
  }

  // HackerRank Data Fetching - Using fallback static data
  const fetchHackerrankData = async () => {
    const cacheKey = 'hackerrank_data'
    const cacheTime = 1000 * 60 * 60 * 6 // 6 hour cache
    const cached = localStorage.getItem(cacheKey)
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < cacheTime) {
        return data
      }
    }

    try {
      // Use allorigins CORS proxy to fetch public HackerRank profile data
      const targetUrl = encodeURIComponent('https://www.hackerrank.com/rest/contests/master/hackers/Hamsha266/profile')
      const response = await fetch(`https://api.allorigins.win/raw?url=${targetUrl}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      })

      if (response.ok) {
        const result = await response.json()
        if (result && result.model) {
          const rawBadges = result.model.badges || []
          const badges = rawBadges.map(b => ({
            name: b.badge_name || b.name || 'Badge',
            stars: typeof b.stars === 'number' ? '★'.repeat(b.stars) : (b.stars || '★'),
          }))
          
          const data = {
            badges,
            certificates: result.model.certificates || [],
            lastUpdated: new Date().toISOString(),
          }
          
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))
          return data
        }
      }
    } catch (err) {
      console.error('HackerRank API error:', err)
    }

    // Return cached data even if expired, or default placeholder
    if (cached) {
      const cachedData = JSON.parse(cached).data
      cachedData.isStale = true
      return cachedData
    }

    // Default placeholder data
    return {
      badges: [],
      certificates: [],
      lastUpdated: null,
      isPlaceholder: true,
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const [leetcode, hackerrank] = await Promise.all([
          fetchLeetcodeData(),
          fetchHackerrankData(),
        ])
        
        setLeetcodeData(leetcode)
        setHackerrankData(hackerrank)
      } catch (err) {
        setError('Failed to load coding profile data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Count-up animation component
  const CountUp = ({ end = 0, duration = 2 }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      setCount(0)
      if (end === 0) return
      
      let startTime = null
      let animationFrame = null
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      animationFrame = requestAnimationFrame(animate)
      
      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame)
      }
    }, [end, duration])

    return <span>{count}</span>
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="glass rounded-xl p-8 border border-white/10 animate-pulse">
      <div className="h-8 bg-dark-card rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-dark-card rounded w-1/2 mb-6"></div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-dark-card rounded"></div>
        ))}
      </div>
    </div>
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="coding-profiles" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text text-center">
            Coding Profiles & Achievements
          </h2>
          <p className="text-center text-gray-400 text-lg">
            Track my competitive programming journey across platforms
          </p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* LeetCode Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass rounded-xl p-8 border border-white/10 hover:border-orange-500/50 transition-all group relative overflow-hidden"
          >
            {/* Platform Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-shadow"
                >
                  <Code className="text-white" size={32} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">LeetCode</h3>
                  <p className="text-gray-400 text-sm">@hamsha07</p>
                </div>
              </div>
              <motion.a
                href="https://leetcode.com/u/hamsha07/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-orange-500 hover:text-orange-400 transition-colors"
                aria-label="View LeetCode profile"
              >
                <ExternalLink size={24} />
              </motion.a>
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : leetcodeData ? (
              <>
                {/* Total Problems Solved */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-white" aria-label={`${leetcodeData.total} total problems solved`}>
                      <CountUp end={leetcodeData.total} />
                    </span>
                    <span className="text-gray-400">Problems Solved</span>
                  </div>
                </div>

                {/* Difficulty Breakdown */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-lg p-4 border border-green-500/30"
                    role="status"
                    aria-label={`${leetcodeData.easy} easy problems solved`}
                  >
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      <CountUp end={leetcodeData.easy} duration={1.5} />
                    </div>
                    <div className="text-xs text-gray-400">Easy</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-lg p-4 border border-yellow-500/30"
                    role="status"
                    aria-label={`${leetcodeData.medium} medium problems solved`}
                  >
                    <div className="text-2xl font-bold text-yellow-400 mb-1">
                      <CountUp end={leetcodeData.medium} duration={1.5} />
                    </div>
                    <div className="text-xs text-gray-400">Medium</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-lg p-4 border border-red-500/30"
                    role="status"
                    aria-label={`${leetcodeData.hard} hard problems solved`}
                  >
                    <div className="text-2xl font-bold text-red-400 mb-1">
                      <CountUp end={leetcodeData.hard} duration={1.5} />
                    </div>
                    <div className="text-xs text-gray-400">Hard</div>
                  </motion.div>
                </div>

                {/* Rank */}
                {leetcodeData.rank && (
                  <div className="flex items-center gap-2 mb-4 text-gray-300">
                    <TrendingUp size={20} className="text-orange-500" />
                    <span>Rank: #{leetcodeData.rank.toLocaleString()}</span>
                  </div>
                )}

                {/* Badges */}
                {leetcodeData.badges && leetcodeData.badges.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Award size={20} className="text-orange-500" />
                      <span className="text-sm font-semibold text-gray-300">Badges</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {leetcodeData.badges.slice(0, 5).map((badge, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-xs text-orange-300"
                          title={badge.displayName}
                        >
                          {badge.displayName}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Last Updated */}
                {leetcodeData.lastUpdated && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                    <Clock size={14} />
                    <span>
                      Last updated: {new Date(leetcodeData.lastUpdated).toLocaleDateString()}
                      {leetcodeData.isStale && ' (Stale - refreshing...)'}
                    </span>
                  </div>
                )}
                
                {/* Placeholder Notice */}
                {leetcodeData.isPlaceholder && (
                  <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-xs text-orange-300">
                    ⚠️ Live data unavailable. Please check the profile link for current stats.
                  </div>
                )}

                {/* View Profile Button */}
                <motion.a
                  href="https://leetcode.com/u/hamsha07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-semibold text-center block hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  View Profile
                </motion.a>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8">
                Unable to load LeetCode data. Please check the profile link.
              </div>
            )}
          </motion.div>

          {/* HackerRank Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass rounded-xl p-8 border border-white/10 hover:border-green-500/50 transition-all group relative overflow-hidden"
          >
            {/* Platform Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-shadow"
                >
                  <Code className="text-white" size={32} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">HackerRank</h3>
                  <p className="text-gray-400 text-sm">@Hamsha266</p>
                </div>
              </div>
              <motion.a
                href="https://www.hackerrank.com/profile/Hamsha266"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-green-500 hover:text-green-400 transition-colors"
                aria-label="View HackerRank profile"
              >
                <ExternalLink size={24} />
              </motion.a>
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : hackerrankData ? (
              <>
                {/* Badges Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="text-green-500" size={24} />
                    <h4 className="text-xl font-semibold text-white">Badges & Certifications</h4>
                  </div>
                  
                  {hackerrankData.badges && hackerrankData.badges.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {hackerrankData.badges.map((badge, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="glass rounded-lg p-4 border border-green-500/30 text-center"
                        >
                          <div className="text-lg font-bold text-green-400 mb-1">
                            {badge.name || 'Badge'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {badge.stars || '★'} Star
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="glass rounded-lg p-4 border border-green-500/30">
                        <div className="text-green-400 font-semibold mb-1">Problem Solving</div>
                        <div className="text-xs text-gray-400">Core Skills</div>
                      </div>
                      <div className="glass rounded-lg p-4 border border-green-500/30">
                        <div className="text-green-400 font-semibold mb-1">Python</div>
                        <div className="text-xs text-gray-400">Programming Language</div>
                      </div>
                      <div className="glass rounded-lg p-4 border border-green-500/30">
                        <div className="text-green-400 font-semibold mb-1">Java</div>
                        <div className="text-xs text-gray-400">Programming Language</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Certifications */}
                {hackerrankData.certificates && hackerrankData.certificates.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Award size={20} className="text-green-500" />
                      <span className="text-sm font-semibold text-gray-300">Certifications</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hackerrankData.certificates.map((cert, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-300"
                        >
                          {cert.name || cert}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Last Updated */}
                {hackerrankData.lastUpdated && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                    <Clock size={14} />
                    <span>
                      Last updated: {new Date(hackerrankData.lastUpdated).toLocaleDateString()}
                      {hackerrankData.isStale && ' (Stale - refreshing...)'}
                    </span>
                  </div>
                )}
                
                {/* Placeholder Notice */}
                {hackerrankData.isPlaceholder && (
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-xs text-green-300">
                    ⚠️ Live data unavailable. Please check the profile link for current stats.
                  </div>
                )}

                {/* View Profile Button */}
                <motion.a
                  href="https://www.hackerrank.com/profile/Hamsha266"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold text-center block hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  View Profile
                </motion.a>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8">
                Unable to load HackerRank data. Please check the profile link.
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CodingProfiles


