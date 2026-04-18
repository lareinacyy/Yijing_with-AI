// 注意：CommonJS 不需要 export 关键字，直接用 module.exports
module.exports = async function handler(req, res) {
    // 检查请求方法
    if (req.method !== 'POST') {
        return res.status(405).json({ reply: "仅支持 POST 请求" });
    }

    const { target, guaName, guaText } = req.body;
    const API_KEY = process.env.AI_API_KEY;

    try {
        const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { 
                        role: "system", 
                        content: "你是一位精通易经的国学大师。任务一：判断用户提问是否有效。如果输入是乱码、挑衅或违法内容，请直接回复：【REJECT】。任务二：如果有效，请结合求测事项和卦象进行深度解卦。" 
                    },
                    { role: "user", content: `求测事项：${target}\n卦象：${guaName}\n卦辞：${guaText}` }
                ]
            })
        });

        const data = await response.json();

        // 调试用：在 Vercel 日志中查看 AI 返回
        console.log("DeepSeek Response:", JSON.stringify(data));

        if (data.choices && data.choices.length > 0) {
            res.status(200).json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ reply: "天机阻塞：" + (data.error?.message || "未知错误") });
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ reply: "无法连接天机，请稍后再试。" });
    }
};
