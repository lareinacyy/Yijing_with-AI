let count = 0;
let results = [];
let isTossing = false;

const guaData = {
    "111111": { name: "乾", text: "元亨，利贞。" },
    "000000": { name: "坤", text: "元亨，利牝马之贞。君子有攸往，先迷后得主。" },
    "010001": { name: "屯", text: "元亨，利贞。勿用有攸往，利建侯。" },
    "100010": { name: "蒙", text: "亨。匪我求童蒙，童蒙求我，初筮告，再三渎，渎则不告。利贞。" },
    "111010": { name: "需", text: "有孚，光亨，贞吉。利涉大川。" },
    "010111": { name: "讼", text: "有孚，窒惕，中吉。终凶。利见大人，不利涉大川。" },
    "010000": { name: "师", text: "贞，丈人，吉无咎。" },
    "000010": { name: "比", text: "吉。原筮元永贞，无咎。不宁方来，后夫凶。" },
    "110111": { name: "小畜", text: "亨。密云不雨，自我西郊。" },
    "111011": { name: "履", text: "履虎尾，不咥人，亨。" },
    "111000": { name: "泰", text: "小往大来，吉亨。" },
    "000111": { name: "否", text: "否之匪人，不利君子贞，大往小来。" },
    "101111": { name: "同人", text: "同人于野，亨。利涉大川，利君子贞。" },
    "111101": { name: "大有", text: "元亨。" },
    "000100": { name: "谦", text: "亨，君子有终。" },
    "001000": { name: "豫", text: "利建侯行师。" },
    "011001": { name: "随", text: "元亨利贞，无咎。" },
    "100110": { name: "蛊", text: "元亨，利涉大川。先甲三日，后甲三日。" },
    "110000": { name: "临", text: "元亨利贞。至于八月有凶。" },
    "000011": { name: "观", text: "盥而不荐，有孚颙若。" },
    "101001": { name: "噬嗑", text: "亨。利用狱。" },
    "100101": { name: "贲", text: "亨。小利有攸往。" },
    "100000": { name: "剥", text: "不利有攸往。" },
    "000001": { name: "复", text: "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。" },
    "100111": { name: "无妄", text: "元亨，利贞。其匪正有眚，不利有攸往。" },
    "111001": { name: "大畜", text: "利贞，不家食吉，利涉大川。" },
    "100001": { name: "颐", text: "贞吉。观颐，自求口实。" },
    "011110": { name: "大过", text: "栋桡，利有攸往，亨。" },
    "010010": { name: "坎", text: "习坎，有孚，维心亨，行有尚。" },
    "101101": { name: "离", text: "利贞，亨。畜牝牛，吉。" },
    "001110": { name: "咸", text: "亨，利贞，取女吉。" },
    "011100": { name: "恒", text: "亨，无咎，利贞，利有攸往。" },
    "001111": { name: "遁", text: "亨，小利贞。" },
    "111100": { name: "大壮", text: "利贞。" },
    "000101": { name: "晋", text: "康侯用锡马蕃庶，昼日三接。" },
    "101000": { name: "明夷", text: "利艰贞。" },
    "101011": { name: "家人", text: "利女贞。" },
    "110101": { name: "睽", text: "小事吉。" },
    "010100": { name: "蹇", text: "利西南，不利东北；利见大人，贞吉。" },
    "001010": { name: "解", text: "利西南，无所往，其来复吉。有攸往，夙吉。" },
    "110001": { name: "损", text: "有孚，元吉，无咎，可贞，利有攸往。" },
    "100011": { name: "益", text: "利有攸往，利涉大川。" },
    "011111": { name: "夬", text: "扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往。" },
    "111110": { name: "姤", text: "女壮，勿用取女。" },
    "011000": { name: "萃", text: "亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。" },
    "000110": { name: "升", text: "元亨，用见大人，勿恤。南征吉。" },
    "010110": { name: "困", text: "亨，贞，大人吉，无咎，有言不信。" },
    "011010": { name: "井", text: "改邑不改井，无丧无得，往来井井。" },
    "011101": { name: "革", text: "己日乃孚，元亨利贞，悔亡。" },
    "101110": { name: "鼎", text: "元吉，亨。" },
    "001001": { name: "震", text: "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。" },
    "100100": { name: "艮", text: "艮其背，不获其身，行其庭，不见其人，无咎。" },
    "001011": { name: "渐", text: "女归吉，利贞。" },
    "110100": { name: "归妹", text: "征凶，无攸利。" },
    "101100": { name: "丰", text: "亨，王假之，勿忧，宜日中。" },
    "001101": { name: "旅", text: "小亨，旅贞吉。" },
    "011011": { name: "巽", text: "小亨，利有攸往，利见大人。" },
    "110110": { name: "兑", text: "亨，利贞。" },
    "010011": { name: "涣", text: "亨。王假有庙，利涉大川，利贞。" },
    "110010": { name: "节", text: "亨。苦节不可贞。" },
    "110011": { name: "中孚", text: "豚鱼吉，利涉大川，利贞。" },
    "001100": { name: "小过", text: "亨，利贞，可小事，不可大事。" },
    "010101": { name: "既济", text: "亨，小利贞，初吉终乱。" },
    "101010": { name: "未济", text: "亨，小狐汔济，濡其尾，无攸利。" }
};

function goToStep2() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
}

function doToss() {
    if (count >= 6 || isTossing) return;
    isTossing = true;
    document.getElementById('mainBtn').disabled = true;

    let heads = 0;
    for (let i = 1; i <= 3; i++) {
        let isHead = Math.random() > 0.5;
        if (isHead) heads++;
        let coin = document.getElementById('c' + i);
        let spinCycles = (count + 1) * 1080;
        let targetY = isHead ? spinCycles : (spinCycles + 180);
        coin.style.transform = `rotateY(${targetY}deg)`;
    }

    setTimeout(() => {
        let isYang = heads >= 2;
        results.push(isYang ? 1 : 0);
        let div = document.createElement('div');
        div.className = isYang ? 'yao yang' : 'yao yin';
        document.getElementById('gua-container').appendChild(div);
        count++;
        document.getElementById('progress').style.width = (count / 6 * 100) + '%';

        if (count < 6) {
            document.getElementById('info').innerText = `请掷钱（第 ${count + 1} 次 / 共 6 次）`;
            isTossing = false;
            document.getElementById('mainBtn').disabled = false;
        } else {
            document.getElementById('info').innerText = "六爻已成，卦象圆满";
            let btn = document.getElementById('mainBtn');
            btn.innerText = "查看解卦";
            btn.onclick = showResult;
            isTossing = false;
            btn.disabled = false;
        }
    }, 1300);
}

async function showResult() {
    const code = results.join('');
    const resultData = guaData[code];
    const targetInput = document.getElementById('target').value.trim() || "未填写";

    // 1. 立即切换到结果页面
    document.getElementById('final-target').innerText = "所求之事：" + targetInput;
    document.getElementById('result-gua-display').innerHTML = document.getElementById('gua-container').innerHTML;
    
    const guaTextContainer = document.getElementById('gua-text'); // 【修正 1：定义容器变量】

    if (resultData) {
        document.getElementById('gua-name').innerText = resultData.name;
        // 显示加载动画
        guaTextContainer.innerHTML = '<div class="loading-text">大师正在合算天机，请稍候...</div>';
    } else {
        document.getElementById('gua-name').innerText = code;
        guaTextContainer.innerText = '未找到对应卦象数据';
        return;
    }

    // 切换显示 Step 3
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');

    // 2. 异步调用 AI 接口
    try {
        const response = await fetch('/api/interpret', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                target: targetInput,
                guaName: resultData.name,
                guaText: resultData.text
            })
        });

        const aiData = await response.json(); // 注意：这里定义的变量名叫 aiData

        // 3. 处理 AI 的校验结果
        if (aiData.reply && aiData.reply.includes("REJECT")) {
            alert("卦象显示：所求之事语焉不详。请重新整理思绪，诚心发问。");
            location.reload(); 
            return;
        }

        // 4. 【修正 2：确保变量名一致】
        guaTextContainer.innerHTML = ""; // 删掉加载文字

        const replyDiv = document.createElement('div');
        replyDiv.className = "fade-in-text"; 
        replyDiv.innerText = aiData.reply; // 【这里必须用 aiData.reply】
        guaTextContainer.appendChild(replyDiv); 

    } catch (error) {
        console.error("AI 接口调用失败:", error);
        // 报错时显示基础卦辞
        document.getElementById('gua-text').innerText = "暂无法连接天机，请看基础卦辞：" + (resultData ? resultData.text : "无");
    }
}
