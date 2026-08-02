import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ArrowRight, CheckCircle2, Phone, User as UserIcon } from 'lucide-react'
import { useAuth } from '@/lib/auth'

export function Login() {
  const [step, setStep] = useState<'phone' | 'otp' | 'name'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Where to go after login (e.g. if they clicked 'Talk to CareBuddy' from home)
  const from = location.state?.from?.pathname || '/'

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 10) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('otp')
    }, 1200) // Fake OTP send delay
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 4) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('name')
    }, 800) // Fake verify delay
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.length < 2) return
    setIsLoading(true)
    setTimeout(() => {
      login(name, phone)
      navigate(from, { replace: true })
    }, 1000)
  }

  return (
    <div className="relative min-h-[100dvh] w-full bg-tint-sand flex items-center justify-center overflow-hidden font-sans p-4">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute left-1/2 top-1/2 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full bg-tint-sage/20 opacity-50 blur-[100px]" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-tint-clay/10 opacity-60 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/60 p-8 backdrop-blur-2xl shadow-xl shadow-black/5 ring-1 ring-black/5"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-tint-sage text-white shadow-lg shadow-tint-sage/30">
              <Shield className="size-7" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Welcome to CareBuddy.
            </h1>
            <p className="mt-2 text-sm text-text-tertiary">
              Securely access your health timeline and triage history.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 'phone' && (
                <motion.form
                  key="phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handlePhoneSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-text-tertiary" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter your 10-digit number"
                        className="w-full rounded-xl border-none bg-black/5 py-3.5 pl-11 pr-4 text-text-primary placeholder:text-text-tertiary focus:bg-white focus:outline-none focus:ring-2 focus:ring-tint-sage"
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <button
                    disabled={isLoading || phone.length < 10}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-tint-sage py-3.5 font-semibold text-white shadow-lg shadow-tint-sage/25 transition-all hover:bg-tint-sage/90 disabled:opacity-50"
                  >
                    {isLoading ? 'Sending OTP...' : 'Continue'}
                    {!isLoading && <ArrowRight className="size-4" />}
                  </button>
                </motion.form>
              )}

              {step === 'otp' && (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleOtpSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-text-secondary">
                      <span>Verification Code</span>
                      <button
                        type="button"
                        onClick={() => setStep('phone')}
                        className="text-xs text-tint-sage hover:underline"
                      >
                        Change number
                      </button>
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-text-tertiary" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter any 4-digit code"
                        maxLength={4}
                        className="w-full rounded-xl border-none bg-black/5 py-3.5 pl-11 pr-4 text-center text-lg font-bold tracking-widest text-text-primary placeholder:text-text-tertiary focus:bg-white focus:outline-none focus:ring-2 focus:ring-tint-sage"
                        required
                        autoFocus
                      />
                    </div>
                    <p className="mt-2 text-center text-xs text-text-tertiary">
                      For this demo, any 4 digits will work.
                    </p>
                  </div>
                  <button
                    disabled={isLoading || otp.length < 4}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-tint-sage py-3.5 font-semibold text-white shadow-lg shadow-tint-sage/25 transition-all hover:bg-tint-sage/90 disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                    {!isLoading && <CheckCircle2 className="size-4" />}
                  </button>
                </motion.form>
              )}

              {step === 'name' && (
                <motion.form
                  key="name"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleNameSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                      What should we call you?
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-text-tertiary" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border-none bg-black/5 py-3.5 pl-11 pr-4 text-text-primary placeholder:text-text-tertiary focus:bg-white focus:outline-none focus:ring-2 focus:ring-tint-sage"
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <button
                    disabled={isLoading || name.length < 2}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-text-primary py-3.5 font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-black disabled:opacity-50"
                  >
                    {isLoading ? 'Setting up...' : 'Get Started'}
                    {!isLoading && <ArrowRight className="size-4" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
