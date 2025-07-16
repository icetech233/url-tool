/**
 * URL编码/解码工具函数模块
 * 提供对象与URL编码字符串之间的转换功能
 */

export interface EncodeResult {
  success: boolean;
  result?: string;
  error?: string;
}

export interface DecodeResult {
  success: boolean;
  result?: any;
  error?: string;
}

/**
 * 将对象编码为URL编码字符串
 * 步骤：对象 → JSON字符串 → URL编码
 */
export function encodeObjectToUrl(input: string): EncodeResult {
  try {
    // 首先尝试解析输入的字符串为对象
    const obj = JSON.parse(input);
    
    // 将对象转换为JSON字符串
    const jsonString = JSON.stringify(obj);
    
    // 进行URL编码
    const encoded = encodeURIComponent(jsonString);
    
    return {
      success: true,
      result: encoded
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '编码失败'
    };
  }
}

/**
 * 将URL编码字符串解码为对象
 * 步骤：URL编码字符串 → 解码 → JSON对象
 */
export function decodeUrlToObject(input: string): DecodeResult {
  try {
    // 进行URL解码
    const decoded = decodeURIComponent(input);
    
    // 将解码后的字符串解析为对象
    const obj = JSON.parse(decoded);
    
    return {
      success: true,
      result: obj
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '解码失败'
    };
  }
}

/**
 * 格式化JSON字符串，使其更易读
 */
export function formatJson(obj: any): string {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

/**
 * 获取示例数据
 */
export function getExampleData() {
  return {
    object: {
      task_tag: "WT123",
      placement_tag: "WP123"
    },
    encoded: ""
  };
}
