import { UrlEncoder } from './components/UrlEncoder'
import { motion } from 'framer-motion'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-start py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        {/* 页面标题 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 border-b border-[var(--border)] pb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 text-[var(--primary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold font-[var(--font-sans)]">
              URL 编码/解码工具
            </h1>
          </div>
          <p className="text-base text-[var(--muted-foreground)] max-w-2xl">
            轻松转换 URL 编码字符串和 JSON 对象，支持实时预览和一键复制
          </p>
        </motion.div>

        {/* 主内容区 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 shadow-sm"
        >
          <UrlEncoder />
        </motion.div>

        {/* 页脚 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 text-[var(--muted-foreground)] text-sm"
        >
          <p>© 2026 URL Tool | 测试 URL 编码/解码工具</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default App