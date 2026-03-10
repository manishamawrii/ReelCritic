import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-2">
        {toasts.map(t => (
          <div
            key={t.id}
            onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))}
            className={`
              animate-slide-in animation-fill-both cursor-pointer
              px-4 py-3 rounded text-sm font-medium border backdrop-blur-sm
              ${t.type === 'success'
                ? 'bg-card border-green-500/40 text-green-400'
                : 'bg-card border-red/40 text-red'
              }
            `}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)



// const toast = useCallback((message, type = 'success') => {

// Matlab:

// Ek toast function create karo
// jo message aur type lega
// aur React us function ko memory me stable rakhe
// Ek stable toast function banao jo message aur type receive kare.

// setTimeout → decide karta hai kaunsi id delete hogi
// filter → us id ko array se remove karta hai