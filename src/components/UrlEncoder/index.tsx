/**
 * URL编码/解码工具主组件
 * 提供用户界面和交互逻辑
 */

import { useState } from 'react';
import { useUrlEncoderState } from './urlEncoderState';
import { motion } from 'framer-motion';

export function UrlEncoder() {
  const {
    input,
    setInput,
    output,
    error,
    mode,
    toggleMode,
    handleEncode,
    handleDecode,
    loadExample,
    clearAll,
    copyToClipboard
  } = useUrlEncoderState();

  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess('复制成功！');
      setTimeout(() => setCopySuccess(''), 2000);
    } else {
      setCopySuccess('复制失败');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  return (
    <div className="space-y-6">
      {/* 模式切换和操作按钮 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleMode}
            className="flex items-center space-x-2 px-4 py-2 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--primary-dark)] transition-all font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>切换到{mode === 'encode' ? '解码' : '编码'}模式</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={loadExample}
            className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-full hover:bg-[var(--accent)] transition-all font-medium text-sm border border-[var(--border)]"
          >
            加载示例
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearAll}
            className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-full hover:bg-[var(--accent)] transition-all font-medium text-sm border border-[var(--border)]"
          >
            清空
          </motion.button>
        </div>

        {/* 当前模式提示 */}
        <div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              mode === 'encode' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20' 
                : 'bg-[var(--secondary)]/10 text-[var(--secondary)] border border-[var(--secondary)]/20'
            }`}
          >
            {mode === 'encode' ? '编码模式' : '解码模式'}
          </motion.div>
        </div>
      </motion.div>

      {/* 输入输出区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 输入区域 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--foreground)]">
              {mode === 'encode' ? '输入对象 (JSON格式)' : '输入URL编码字符串'}
            </h2>
            {input && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(input)}
                className="text-xs text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors font-medium"
              >
                复制
              </motion.button>
            )}
          </div>
          
          <motion.div
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'encode' 
                  ? '请输入JavaScript对象，例如：\n{\n  "task_tag": "WT123",\n  "placement_tag": "WP123"\n}'
                  : '请输入URL编码后的字符串，例如：\n%%7B%22task_tag%22%3A%22WT123%22%2C%22placement_tag%22%3A%22WP123%22%7D'
              }
              className="w-full h-64 p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg resize-none font-mono text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
            />
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProcess}
            disabled={!input.trim()}
            className="w-full py-2 px-4 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--primary-dark)] disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:cursor-not-allowed transition-all font-medium text-sm"
          >
            {mode === 'encode' ? '编码' : '解码'}
          </motion.button>
        </motion.div>

        {/* 输出区域 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--foreground)]">
              {mode === 'encode' ? '编码结果' : '解码结果'}
            </h2>
            {output && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(output)}
                className="text-xs text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors font-medium"
              >
                复制
              </motion.button>
            )}
          </div>
          
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder={`${mode === 'encode' ? '编码' : '解码'}结果将显示在这里...`}
              className="w-full h-64 p-4 bg-[var(--muted)] border border-[var(--border)] rounded-lg resize-none font-mono text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition-all"
            />
            {output && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-3 right-3"
              >
                <span className="text-xs text-[var(--muted-foreground)] bg-[var(--background)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                  {output.length} 字符
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 错误信息 */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-4 bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-lg"
        >
          <div className="flex items-start">
            <svg className="w-4 h-4 text-[var(--error)] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <span className="text-[var(--error)] font-medium text-sm">错误：</span>
              <p className="text-[var(--error)]/80 mt-1 text-sm">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 复制成功提示 */}
      {copySuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-4 right-4 bg-[var(--success)]/90 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium border border-[var(--success)]/30"
        >
          {copySuccess}
        </motion.div>
      )}

      {/* 使用说明 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 p-4 bg-[var(--muted)] border border-[var(--border)] rounded-lg"
      >
        <h3 className="text-base font-semibold text-[var(--foreground)] mb-3">使用说明</h3>
        <div className="space-y-2 text-xs text-[var(--muted-foreground)]">
          <p><strong className="text-[var(--foreground)]">编码模式：</strong>输入JavaScript对象，工具会将其转换为JSON字符串，然后进行URL编码</p>
          <p><strong className="text-[var(--foreground)]">解码模式：</strong>输入URL编码的字符串，工具会先解码，然后解析为JavaScript对象</p>
          <p><strong className="text-[var(--foreground)]">编码流程：</strong>对象 → JSON.stringify() → encodeURIComponent()</p>
          <p><strong className="text-[var(--foreground)]">解码流程：</strong>编码字符串 → decodeURIComponent() → JSON.parse()</p>
        </div>
      </motion.div>
    </div>
  );
}
