export default async function handler(req, res) {
    const { target, guaName, guaText } = req.body;
    const API_KEY = process.env.AI_API_KEY;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
                { 
                    role: "system", 
                    content: `你是一位精通易经的国学大师。
                    任务一：判断用户输入是否为有效的占卜提问（如：对未来、决策、状态的询问）。
                    任务二：如果输入是乱码、无意义字符、或者是挑衅、违法内容，请直接只回复一句话：【REJECT】。
                    任务三：如果输入有效，请结合卦象进行专业深度解卦。` 
                },
                { role: "user", content: `求测事项：${target}\n卦象：${guaName}\n卦辞：${guaText}` }
            ]
        })
    });


    const data = await response.json();

    // 调试利器：在 Vercel Logs 里看看 AI 到底返回了什么
    console.log("DeepSeek Response:", JSON.stringify(data));
    
    // 增加安全判断
    if (data.choices && data.choices.length > 0) {
        const aiReply = data.choices[0].message.content;
        res.status(200).json({ reply: aiReply });
    } else {
        // 如果 AI 报错了，把报错信息传回给前端，方便你 Debug
        console.error("AI Error Details:", data);
        res.status(500).json({ reply: "天机阻塞，原因：" + (data.error?.message || "未知错误") });
    }
