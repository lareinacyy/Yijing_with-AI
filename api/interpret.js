module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ reply: "仅支持 POST 请求" });
    }

    const { target, guaName, guaText } = req.body;
    const API_KEY = process.env.AI_API_KEY;

    try {
        // 智谱 AI 的标准 API 地址
        const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}` // 这里的 Key 稍后在 Vercel 换成智谱的
            },
            body: JSON.stringify({
                model: "glm-4-flash", // 智谱的免费轻量模型
                messages: [
                    { 
                        role: "system", 
                        content: "你是一位精通易经的国学大师。任务一：判断用户提问是否有效。如果输入是乱码、挑衅或违法内容，请直接回复：【REJECT】。任务二：如果有效，请结合求测事项和卦象进行深度解卦。" 
                    },
                    { role: "user", content: `求测事项：${target}\n卦象：${guaName}\n卦辞：${guaText}` }
                ],
                stream: false // 保持非流式传输，方便逻辑处理
            })
        });

        const data = await response.json();

        // 智谱的返回结构与 OpenAI 类似，都在 choices[0].message 里
        if (data.choices && data.choices.length > 0) {
            res.status(200).json({ reply: data.choices[0].message.content });
        } else {
            console.error("智谱返回异常:", data);
            res.status(500).json({ reply: "天机阻塞：" + (data.error?.message || "未知错误") });
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ reply: "无法连接天机，请检查网络。" });
    }
};
