/**
 * URL编码/解码工具主组件
 * 提供用户界面和交互逻辑
 */

import { useState } from 'react';
import { useUrlEncoderState } from './urlEncoderState';

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
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          URL 编码/解码工具
        </h1>
        <p className="text-gray-600">
          将JavaScript对象序列化后进行URL编码，或将URL编码字符串解码为对象
        </p>
      </div>

      {/* 模式切换 */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMode}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>切换到{mode === 'encode' ? '解码' : '编码'}模式</span>
          </button>
          
          <button
            onClick={loadExample}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            加载示例
          </button>
          
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            清空
          </button>
        </div>
      </div>

      {/* 当前模式提示 */}
      <div className="mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          mode === 'encode' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-purple-100 text-purple-800'
        }`}>
          {mode === 'encode' ? '编码模式' : '解码模式'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {mode === 'encode' ? '输入对象 (JSON格式)' : '输入URL编码字符串'}
            </h2>
            {input && (
              <button
                onClick={() => handleCopy(input)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                复制输入
              </button>
            )}
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode' 
                ? '请输入JavaScript对象，例如：\n{\n  "task_tag": "WT123",\n  "placement_tag": "WP123"\n}'
                : '请输入URL编码后的字符串，例如：\n%%7B%22task_tag%22%3A%22WT123%22%2C%22placement_tag%22%3A%22WP123%22%7D'
            }
            className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="flex space-x-2">
            <button
              onClick={handleProcess}
              disabled={!input.trim()}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {mode === 'encode' ? '编码' : '解码'}
            </button>
          </div>
        </div>

        {/* 输出区域 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {mode === 'encode' ? '编码结果' : '解码结果'}
            </h2>
            {output && (
              <button
                onClick={() => handleCopy(output)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                复制结果
              </button>
            )}
          </div>
          
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder={`${mode === 'encode' ? '编码' : '解码'}结果将显示在这里...`}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none font-mono text-sm bg-gray-50"
            />
            {output && (
              <div className="absolute top-2 right-2">
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  {output.length} 字符
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800 font-medium">错误：</span>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}

      {/* 复制成功提示 */}
      {copySuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {copySuccess}
        </div>
      )}

      {/* 使用说明 */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">使用说明</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>编码模式：</strong>输入JavaScript对象，工具会将其转换为JSON字符串，然后进行URL编码</p>
          <p><strong>解码模式：</strong>输入URL编码的字符串，工具会先解码，然后解析为JavaScript对象</p>
          <p><strong>编码流程：</strong>对象 → JSON.stringify() → encodeURIComponent()</p>
          <p><strong>解码流程：</strong>编码字符串 → decodeURIComponent() → JSON.parse()</p>
        </div>
      </div>
    </div>
  );
}
