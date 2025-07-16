/**
 * URL编码工具状态管理模块
 * 管理输入内容、输出结果、错误信息等状态
 */

import { useState } from 'react';
import { 
  encodeObjectToUrl, 
  decodeUrlToObject, 
  formatJson, 
  getExampleData 
} from './urlEncoderUtilities';

export function useUrlEncoderState() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  // 执行编码操作
  const handleEncode = () => {
    setError('');
    
    if (!input.trim()) {
      setError('请输入要编码的对象');
      setOutput('');
      return;
    }

    const result = encodeObjectToUrl(input);
    
    if (result.success) {
      setOutput(result.result!);
    } else {
      setError(result.error!);
      setOutput('');
    }
  };

  // 执行解码操作
  const handleDecode = () => {
    setError('');
    
    if (!input.trim()) {
      setError('请输入要解码的URL编码字符串');
      setOutput('');
      return;
    }

    const result = decodeUrlToObject(input);
    
    if (result.success) {
      setOutput(formatJson(result.result));
    } else {
      setError(result.error!);
      setOutput('');
    }
  };

  // 切换模式
  const toggleMode = () => {
    setMode(prev => prev === 'encode' ? 'decode' : 'encode');
    setInput('');
    setOutput('');
    setError('');
  };

  // 加载示例数据
  const loadExample = () => {
    const example = getExampleData();
    
    if (mode === 'encode') {
      setInput(formatJson(example.object));
    } else {
      // 先生成编码后的示例
      const encoded = encodeObjectToUrl(formatJson(example.object));
      if (encoded.success) {
        setInput(encoded.result!);
      }
    }
    
    setOutput('');
    setError('');
  };

  // 清空所有内容
  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  // 复制结果到剪贴板
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  return {
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
  };
}
