import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, TrendingUp, Award, Code, Sparkles, CheckCircle2, Star } from 'lucide-react'

const CodingProfiles = () => {
  const [leetcodeData, setLeetcodeData] = useState(null)
  const [hackerrankData, setHackerrankData] = useState(null)
  const [loading, setLoading] = useState(true)

  // LeetCode Data Fetching
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
      const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/hamsha07', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      })

      if (response.ok) {
        const result = await response.json()
        if (result && (result.totalSolved !== undefined || result.easySolved !== undefined)) {
          const easy = result.easySolved || 126
          const medium = result.mediumSolved || 137
          const hard = result.hardSolved || 41
          const categorySum = easy + medium + hard
          const total = categorySum > 0 ? categorySum : (result.totalSolved || 304)

          const data = {
            total,
            easy,
            medium,
            hard,
            rank: result.ranking || 185420,
            acceptanceRate: result.acceptanceRate || 68.5,
            badges: [],
            lastUpdated: new Date().toISOString(),
          }
          
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))
          return data
        }
      }
    } catch (err) {
      console.warn('LeetCode API fetch error (using fallback):', err.message || err)
    }

    if (cached) {
      return JSON.parse(cached).data
    }
    
    // Default stats matching verified counts
    return {
      total: 304,
      easy: 126,
      medium: 137,
      hard: 41,
      rank: 185420,
      acceptanceRate: 68.5,
      badges: [],
      lastUpdated: new Date().toISOString(),
    }
  }

  // HackerRank Data Fetching
  const fetchHackerrankData = async () => {
    const cacheKey = 'hackerrank_data'
    const cacheTime = 1000 * 60 * 60 * 6
    const cached = localStorage.getItem(cacheKey)
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < cacheTime) {
        return data
      }
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const targetUrl = encodeURIComponent('https://www.hackerrank.com/rest/contests/master/hackers/Hamsha266/profile')
      const response = await fetch(`https://api.allorigins.win/raw?url=${targetUrl}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (response.ok) {
        const result = await response.json()
        if (result && result.model) {
          const rawBadges = result.model.badges || []
          const badges = rawBadges.map(b => ({
            name: b.badge_name || b.name || 'Badge',
            stars: typeof b.stars === 'number' ? b.stars : 5,
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
      console.warn('HackerRank API fallback:', err.message || err)
    }

    if (cached) {
      return JSON.parse(cached).data
    }

    return {
      badges: [
        { name: 'Problem Solving', stars: 5 },
        { name: 'Python', stars: 5 },
        { name: 'Java', stars: 4 },
        { name: 'C++', stars: 4 }
      ],
      certificates: ['Problem Solving (Basic)', 'Python (Basic)'],
      lastUpdated: new Date().toISOString(),
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [leetcode, hackerrank] = await Promise.all([
          fetchLeetcodeData(),
          fetchHackerrankData(),
        ])
        setLeetcodeData(leetcode)
        setHackerrankData(hackerrank)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Count Up component
  const CountUp = ({ end = 0, duration = 1.8 }) => {
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

  return (
    <section id="coding-profiles" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="editorial-badge mb-3">
            <Sparkles size={14} className="text-brand-yellow" />
            Competitive Programming
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            CODING <span className="gold-gradient-text">PROFILES</span>
          </h2>
        </motion.div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LeetCode Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-brand-yellow/50 transition-all shadow-xl bg-dark-card flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-yellow to-brand-amber text-black rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
                    <Code size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">LeetCode</h3>
                    <p className="text-sm font-semibold text-brand-yellow">@hamsha07</p>
                  </div>
                </div>
                <a
                  href="https://leetcode.com/u/hamsha07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-yellow hover:text-brand-yellow text-gray-300 transition-colors"
                  aria-label="View LeetCode profile"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              {/* Solved Stat Highlight Box */}
              {leetcodeData && (
                <>
                  <div className="stat-box mb-8 text-left bg-dark-surface border-brand-yellow/30 relative overflow-hidden">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-5xl font-extrabold gold-gradient-text">
                        <CountUp end={leetcodeData.total} />
                      </span>
                      <span className="text-sm font-bold uppercase tracking-wider text-gray-300">
                        Total Problems Solved
                      </span>
                    </div>
                    {leetcodeData.rank && (
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                        <TrendingUp size={16} className="text-brand-yellow" />
                        <span>Global Rank: #{leetcodeData.rank.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Difficulty Breakdown Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-black/40 border border-green-500/30 text-center">
                      <span className="text-xs uppercase tracking-wider font-bold text-green-400 block mb-1">Easy</span>
                      <span className="text-2xl font-bold text-white block mb-2">
                        <CountUp end={leetcodeData.easy} />
                      </span>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-green-400 h-full rounded-full" 
                          style={{ width: `${(leetcodeData.easy / leetcodeData.total) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-yellow-500/30 text-center">
                      <span className="text-xs uppercase tracking-wider font-bold text-yellow-400 block mb-1">Medium</span>
                      <span className="text-2xl font-bold text-white block mb-2">
                        <CountUp end={leetcodeData.medium} />
                      </span>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-yellow-400 h-full rounded-full" 
                          style={{ width: `${(leetcodeData.medium / leetcodeData.total) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-red-500/30 text-center">
                      <span className="text-xs uppercase tracking-wider font-bold text-red-400 block mb-1">Hard</span>
                      <span className="text-2xl font-bold text-white block mb-2">
                        <CountUp end={leetcodeData.hard} />
                      </span>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-red-400 h-full rounded-full" 
                          style={{ width: `${(leetcodeData.hard / leetcodeData.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* HackerRank Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-brand-yellow/50 transition-all shadow-xl bg-dark-card flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-green-500/20">
                    <Award size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">HackerRank</h3>
                    <p className="text-sm font-semibold text-brand-yellow">@Hamsha266</p>
                  </div>
                </div>
                <a
                  href="https://www.hackerrank.com/Hamsha266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-yellow hover:text-brand-yellow text-gray-300 transition-colors"
                  aria-label="View HackerRank profile"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              {/* Badges Grid */}
              {hackerrankData && (
                <div>
                  <h4 className="text-sm uppercase tracking-wider font-bold text-gray-300 mb-4 flex items-center gap-2">
                    <Award size={16} className="text-brand-yellow" />
                    Verified Badges & Stars
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {hackerrankData.badges.map((badge, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between"
                      >
                        <span className="text-sm font-bold text-white block mb-1">
                          {badge.name}
                        </span>
                        <div className="flex gap-1 text-brand-yellow">
                          {[...Array(typeof badge.stars === 'number' ? badge.stars : 5)].map((_, s) => (
                            <Star key={s} size={14} fill="#FFB800" stroke="#FFB800" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Certifications */}
                  <h4 className="text-sm uppercase tracking-wider font-bold text-gray-300 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-yellow" />
                    Skill Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-semibold text-brand-yellow">
                      Problem Solving (Basic)
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-semibold text-brand-yellow">
                      Python (Basic)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CodingProfiles
