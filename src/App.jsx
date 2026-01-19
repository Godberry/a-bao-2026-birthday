import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Coffee, Utensils, Home, AlertCircle, Sparkles, Heart, Train, Music, Volleyball, Camera, Clock, ExternalLink } from 'lucide-react';
import diamondImg from './assets/diamond.png';
import birthdayBoyImg from './assets/birthday_boy.png';
import hint1Img from './assets/hint1.png';
import hint2Img from './assets/hint2.JPG';

export default function BirthdayTrip() {
    const [showIntro, setShowIntro] = useState(true);
    const [showGame, setShowGame] = useState(false);
    const [activeTab, setActiveTab] = useState('itinerary');

    // 模擬鑽石閃爍動畫
    useEffect(() => {
        const timer = setTimeout(() => {
            // 動畫結束後可自動跳轉，這裡保留手動點擊增加儀式感
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const PearlBlue = "text-[#005CA8]"; // 寶藍色
    const BgPearlBlue = "bg-[#005CA8]"; // 寶藍色背景
    const LightBlueBg = "bg-[#E6F0FA]"; // 淺藍背景

    // 開場動畫組件
    const IntroAnimation = () => (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-1000
    ${showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            <div className="relative mb-6 z-10 flex flex-col items-center">
                {/* 壽星照片 */}
                <div className="relative w-32 h-32 mb-4 animate-[bounce_2s_infinite]">
                    <img
                        src={birthdayBoyImg}
                        alt="Birthday Boy"
                        className="w-full h-full object-cover rounded-full border-4 border-[#005CA8] shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow-md rotate-12">
                        壽星
                    </div>
                </div>
            </div>

            <h1 className={`text-4xl font-bold ${PearlBlue} mb-4 tracking-widest animate-bounce`}>
                Happy Birthday
            </h1>
            <h2 className="text-2xl text-gray-600 font-light mb-8">
                阿堡
            </h2>

            <button onClick={() => { setShowIntro(false); setShowGame(true); }}
                className={`${BgPearlBlue} text-white px-8 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-transform
      flex items-center gap-2`}
            >
                <Sparkles size={20} />
                開啟妳的生日之旅
            </button>

            <p className="mt-8 text-sm text-gray-400">森日快樂~</p>
        </div>
    );

    // 猜地點小遊戲
    const GuessGame = () => {
        const [guess, setGuess] = useState('');
        const [hintLevel, setHintLevel] = useState(1); // Default show level 1
        const [error, setError] = useState('');

        const checkAnswer = () => {
            if (guess.includes('高雄')) {
                setShowGame(false);
            } else {
                setError('再試試看！提示：兩個字。');
                setGuess('');
            }
        };

        return (
            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 overflow-y-auto`}>
                <div className="w-full max-w-md px-6 py-6 flex flex-col items-center">
                    <h2 className={`text-2xl font-bold ${PearlBlue} mb-4`}>猜猜我們要去哪？</h2>

                    <div className="space-y-4 w-full mb-6">
                        {/* Hint 1: Image */}
                        <div className="animate-fadeIn w-full flex flex-col items-center">
                            <span className="text-xs text-gray-400 mb-1">提示 1</span>
                            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-1 bg-white">
                                <img src={hint1Img} alt="Hint 1" className="w-full h-40 object-cover rounded-lg" />
                            </div>
                        </div>

                        {/* Hint 2: Image */}
                        {hintLevel >= 2 && (
                            <div className="animate-fadeIn w-full flex flex-col items-center">
                                <span className="text-xs text-gray-400 mb-1">提示 2</span>
                                <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-1 bg-white">
                                    <img src={hint2Img} alt="Hint 2" className="w-full h-40 object-cover rounded-lg" />
                                </div>
                            </div>
                        )}

                        {/* Hint 3: Text */}
                        {hintLevel >= 3 && (
                            <div className="animate-fadeIn w-full text-center">
                                <span className="text-xs text-gray-400">提示 3</span>
                                <div className="bg-blue-50 p-3 rounded-lg text-lg font-bold text-[#005CA8] mt-1 shadow-inner">
                                    藍色
                                </div>
                            </div>
                        )}
                    </div>

                    <input
                        type="text"
                        value={guess}
                        onChange={(e) => {
                            setGuess(e.target.value);
                            setError('');
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        placeholder="請輸入地點..."
                        className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-[#005CA8] outline-none text-center text-lg mb-3"
                    />

                    <button
                        onClick={checkAnswer}
                        className={`${BgPearlBlue} text-white px-8 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-transform w-full mb-4`}
                    >
                        出發！
                    </button>

                    {error && <p className="text-red-400 text-sm mb-2 animate-bounce">{error}</p>}

                    {hintLevel < 3 && (
                        <button
                            onClick={() => setHintLevel(prev => prev + 1)}
                            className="text-gray-400 text-sm underline hover:text-[#005CA8] transition-colors"
                        >
                            再給我一個提示 ({hintLevel}/3)
                        </button>
                    )}
                </div>
            </div>
        );
    };

    // 分頁內容
    const renderContent = () => {
        switch (activeTab) {
            case 'itinerary':
                return <ItinerarySection PearlBlue={PearlBlue} LightBlueBg={LightBlueBg} />;
            case 'food':
                return <FoodMapSection PearlBlue={PearlBlue} />;
            case 'hotel':
                return <HotelSection PearlBlue={PearlBlue} />;
            case 'notice':
                return <NoticeSection PearlBlue={PearlBlue} BgPearlBlue={BgPearlBlue} />;
            default:
                return <ItinerarySection PearlBlue={PearlBlue} LightBlueBg={LightBlueBg} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            {/* 背景隱晦鑽石紋理 */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#005CA8 1px, transparent 1px)', backgroundSize: '30px 30px'
            }}>
            </div>

            {/* 隨機鑽石背景 */}
            <RandomDiamonds count={30} minSize={40} maxSize={80} className="fixed inset-0 pointer-events-none z-0 opacity-20" />

            {showIntro && <IntroAnimation />}

            {showGame && <GuessGame />}

            {/* 頂部導航 */}
            <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100">
                <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
                    <div className={`font-bold text-lg ${PearlBlue} flex items-center gap-1`}>
                        <div className="w-3 h-3 bg-[#005CA8] rotate-45"></div>
                        阿堡生日遊
                    </div>
                    <div className="text-xs text-gray-400">2026.01.24 - 01.25</div>
                </div>

                {/* Tab 選單 */}
                <div className="flex justify-around pb-2 max-w-md mx-auto">
                    <TabButton icon={<Calendar size={18} />} label="行程" id="itinerary" active={activeTab} setActive={setActiveTab}
                        color={PearlBlue} />
                    <TabButton icon={<Utensils size={18} />} label="美食" id="food" active={activeTab} setActive={setActiveTab}
                        color={PearlBlue} />
                    <TabButton icon={<Home size={18} />} label="住宿" id="hotel" active={activeTab} setActive={setActiveTab}
                        color={PearlBlue} />
                    <TabButton icon={<AlertCircle size={18} />} label="注意" id="notice" active={activeTab} setActive={setActiveTab}
                        color={PearlBlue} />
                </div>
            </nav>

            {/* 主要內容區 */}
            <main className="max-w-md mx-auto px-4 py-6 pb-24">
                {renderContent()}
            </main>

            {/* 底部裝飾 */}
            <footer
                className="fixed bottom-0 left-0 right-0 p-2 text-center text-xs text-gray-300 bg-white/50 backdrop-blur pointer-events-none z-0">
                Made with
                <Heart size={10} className="inline text-red-300 fill-current" /> for Abao
            </footer>
        </div>
    );
}

// 子組件：Tab 按鈕
const TabButton = ({ icon, label, id, active, setActive, color }) => (
    <button onClick={() => setActive(id)}
        className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${active === id ? 'bg-blue-50 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
    >
        <div className={active === id ? color : ''}>{icon}</div>
        <span className={`text-xs font-medium ${active === id ? color : ''}`}>{label}</span>
    </button>
);

// 子組件：行程表
const ItinerarySection = ({ PearlBlue, LightBlueBg }) => (
    <div className="space-y-8 animate-fadeIn">
        {/* Day 1 */}
        <div className="relative">
            <div className={`absolute top-0 left-4 h-full w-0.5 bg-blue-100`}></div>

            <div className="flex items-center gap-3 mb-6 relative">
                <div className={`w-8 h-8 ${LightBlueBg} rounded-full flex items-center justify-center font-bold text-blue-600
        z-10`}>1</div>
                <h3 className="text-xl font-bold text-gray-800">1/24 (六) 高雄流浪記</h3>
            </div>

            <TimelineItem time="09:01" title="高鐵出發" icon={<Train size={16} />} content="台北 → 左營 (1309車次)。帶著好心情南下囉！"
                PearlBlue={PearlBlue} />
            <TimelineItem time="11:40" title="抵達飯店寄行李" icon={<Home size={16} />} content="前往「福容徠旅」。先丟包行李，開啟輕裝模式！"
                PearlBlue={PearlBlue} />
            <TimelineItem time="12:30" title="在地午餐時光" icon={<Utensils size={16} />} content="前金/鹽埕區探險。興隆居湯包 或 鴨肉珍，看心情決定！"
                PearlBlue={PearlBlue} />
            <TimelineItem time="14:30" title="自由黃昏市場" icon={<Utensils size={16} />} content="在地人的廚房！買點滷味、炸物墊墊胃，為晚上儲備體力。"
                PearlBlue={PearlBlue} />
            <TimelineItem time="17:00" title="巨蛋周邊散策" icon={<Sparkles size={16} />}
                content="前往巨蛋廣場感受週末熱鬧氣氛！聽說今天這裡人很多，我們去湊湊熱鬧，買買小物，記得穿上我們的幸運色「寶藍色」喔！"
                highlight={true}
                PearlBlue={PearlBlue}
            />
            <TimelineItem time="21:30" title="飯店 Check-in" icon={<Home size={16} />} content="回飯店休息，如果趕得上還能喝免費飲料！"
                PearlBlue={PearlBlue} />
        </div>

        {/* Day 2 */}
        <div className="relative mt-12">
            <div className={`absolute top-0 left-4 h-full w-0.5 bg-blue-100`}></div>

            <div className="flex items-center gap-3 mb-6 relative">
                <div className={`w-8 h-8 ${LightBlueBg} rounded-full flex items-center justify-center font-bold text-blue-600
        z-10`}>2</div>
                <h3 className="text-xl font-bold text-gray-800">1/25 (日) 熱血與美食</h3>
            </div>

            <TimelineItem time="09:30" title="睡飽吃早餐" icon={<Coffee size={16} />} content="享受飯店早餐 (07:00-11:00)，補充滿滿元氣。"
                PearlBlue={PearlBlue} />
            <TimelineItem time="11:30" title="市區漫遊" icon={<Camera size={16} />} content="愛河散步或駁二特區，享受港都的陽光與藝術氣息。"
                PearlBlue={PearlBlue} />
            <TimelineItem time="13:00" title="樂活時光" icon={<Coffee size={16} />} content="回飯店大廳吹冷氣，享受免費點心與飲料，避開正午太陽。"
                PearlBlue={PearlBlue} />
            <TimelineItem time="15:00" title="熱血排球賽" icon={<Volleyball size={16} />} content="鳳山體育館：台鋼天鷹 vs 臺中連莊。一起大聲吶喊！"
                PearlBlue={PearlBlue} />
            <TimelineItem time="19:00" title="快樂賦歸" icon={<Train size={16} />} content="左營 → 台北 (149/678車次)。帶著滿滿回憶回家。"
                PearlBlue={PearlBlue} />
        </div>
    </div>
);

const TimelineItem = ({ time, title, icon, content, highlight = false, PearlBlue }) => (
    <div className="flex gap-4 mb-6 relative pl-12 group">
        <div className={`absolute left-[11px] top-1 w-3 h-3 rounded-sm rotate-45 border-2 ${highlight
            ? 'bg-[#005CA8] border-[#005CA8]' : 'bg-white border-blue-300'} z-10 group-hover:scale-125 transition-transform`}>
        </div>
        <div className={`flex-1 p-4 rounded-2xl ${highlight ? 'bg-blue-50 border border-blue-200 shadow-sm'
            : 'bg-white border border-gray-100 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-2">
                <span className={`text-sm font-bold ${PearlBlue} bg-blue-100/50 px-2 py-0.5 rounded-md`}>{time}</span>
                <div className="text-gray-400">{icon}</div>
            </div>
            <h4 className={`font-bold ${highlight ? 'text-blue-800' : 'text-gray-800'} mb-1`}>{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
        </div>
    </div>
);

// 子組件：美食地圖
const FoodMapSection = ({ PearlBlue }) => (
    <div className="space-y-6 animate-fadeIn">
        <div className="text-center mb-6">
            <h3 className={`text-xl font-bold ${PearlBlue}`}>高雄必吃清單</h3>
            <p className="text-xs text-gray-400">跟著在地人吃就對了</p>
        </div>

        {/* 前金區 */}
        <FoodCategory title="前金 / 鹽埕 (飯店周邊)" icon={<MapPin size={18} />}>
            <FoodItem name="興隆居" tag="傳統早餐" desc="傳說中的爆汁湯包，排隊也要吃！" />
            <FoodItem name="前金肉燥飯" tag="米其林推薦" desc="必點：肉燥飯 + 半熟流汁鴨蛋包，銷魂組合。" />
            <FoodItem name="七賢鴨肉飯" tag="深夜食堂" desc="軟嫩鴨肉配上香濃鴨油飯，當歸湯必喝。" />
            <FoodItem name="小南碗粿" tag="古早味" desc="軟Q碗粿配上獨門醬料，就在自強二路。" />
            <FoodItem name="松藝奶茶" tag="文青飲品" desc="老宅裡的鍋煮奶茶，適合午後歇腳。" />
        </FoodCategory>

        {/* 鳳山區 */}
        <FoodCategory title="鳳山區 (球賽周邊)" icon={<MapPin size={18} />}>
            <FoodItem name="李家肉圓" tag="珍珠肉圓" desc="一口一顆剛剛好，皮Q肉紮實，漲價還是要吃。" />
            <FoodItem name="兵仔市無名肉燥飯" tag="市場老味" desc="隱藏版排隊名店，魚皮湯＋肉燥飯是標配。" />
            <FoodItem name="老周冷熱冰" tag="甜點" desc="熱湯圓遇上剉冰，冷熱交替的奇妙口感。" />
            <FoodItem name="STORY Restaurant" tag="義式" desc="巷弄內的隱藏版，煙花女義大利麵很有名。" />
        </FoodCategory>
    </div>
);

const FoodCategory = ({ title, icon, children }) => (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4 text-[#005CA8] font-bold border-b border-gray-100 pb-2">
            {icon}
            {title}
        </div>
        <div className="grid grid-cols-1 gap-3">
            {children}
        </div>
    </div>
);

const FoodItem = ({ name, tag, desc }) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " 高雄")}`;

    return (
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="flex flex-col border-l-2 border-blue-100 pl-3 py-1 group-hover:border-[#005CA8] transition-colors">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-gray-800 group-hover:text-[#005CA8] transition-colors">{name}</span>
                        <ExternalLink size={12} className="text-gray-300 group-hover:text-[#005CA8] transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{tag}</span>
                </div>
                <p className="text-xs text-gray-500">{desc}</p>
            </div>
        </a>
    );
};

// 子組件：住宿資訊
const HotelSection = ({ PearlBlue }) => (
    <div className="animate-fadeIn">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg mb-6">
            <div className="h-40 bg-gray-200 relative">
                <img
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Hotel Vibe" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#005CA8]">
                    壽星入住
                </div>
            </div>
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">福容徠旅 高雄</h2>
                    <a href="https://www.fullon-hotels.com.tw/fullon-poshtels/kh/tw/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#005CA8] hover:underline inline-flex items-center gap-1 transition-colors hover:text-blue-700">
                        Fullon Poshtel Kaohsiung <ExternalLink size={14} />
                    </a>
                </div>

                <div className="space-y-4">
                    <HotelFeature icon={<Clock className="text-[#005CA8]" />} title="Check-in / Check-out" desc="入住 16:00  •  退房 11:00" />
                    <HotelFeature icon={<MapPin className="text-[#005CA8]" />} title="絕佳位置" desc="前金區，捷運市議會站 (O4) 4號出口步行2分鐘。" />
                    <HotelFeature icon={<Coffee className="text-[#005CA8]" />} title="早餐時光" desc="07:00 - 11:00，睡飽飽再吃。" />
                    <HotelFeature icon={<Sparkles className="text-[#005CA8]" />} title="樂活時光 (Lohas Time)" desc="13:00 - 22:00，提供免費飲料與零食！" />
                </div>
            </div>
        </div>

        <div className="bg-[#E6F0FA] p-5 rounded-2xl flex items-start gap-3">
            <div className="mt-1 text-[#005CA8]">
                <Heart size={20} fill="#005CA8" />
            </div>
            <div>
                <h4 className={`font-bold ${PearlBlue} mb-1`}>備註</h4>
                <p className="text-sm text-gray-600">
                    IKEA 風格設計，簡約又舒適，就在橘線上，去哪都方便！
                </p>
            </div>
        </div>
    </div>
);

const HotelFeature = ({ icon, title, desc }) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 bg-blue-50 p-1.5 rounded-lg">{icon}</div>
        <div>
            <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
    </div>
);

// 子組件：注意事項
const NoticeSection = ({ PearlBlue, BgPearlBlue }) => (
    <div className="animate-fadeIn space-y-4">
        <div className={`${BgPearlBlue} text-white p-6 rounded-3xl shadow-lg relative overflow-hidden`}>
            <Sparkles className="absolute top-2 right-2 opacity-20 w-20 h-20 rotate-12" />
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle /> 出發前請閱讀
            </h3>

            <div className="space-y-4">
                <NoticeItem num="4" title="🚄 準時出發" desc="08:30 在「台北車站」集合，我們要搭 09:01 的高鐵。" />
                <NoticeItem num="1" title="🎒 輕便行李！" desc="Day 1 下午我們會去逛市場和散步，兩天一夜而已！帶一套換洗衣物即可。" />
                <NoticeItem num="2" title="👟 穿最好走的鞋" desc="兩天的行程包含逛市場、散步，舒適的球鞋是必備的。" />
                <NoticeItem num="3" title="🧥 洋蔥式穿搭" desc="高雄白天溫暖但早晚偏涼，加上室內場館可能有空調，記得帶件薄外套以備不時之需。" />
                <NoticeItem num="5" title="😊 一顆愉快的心" desc="哈皮哈皮哈皮~！" />
            </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100">
            <h3 className={`text-lg font-bold ${PearlBlue} mb-4 flex items-center gap-2`}>
                <div className="w-2 h-2 bg-[#005CA8] rotate-45"></div>
                神秘 Dress Code
            </h3>
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        據說這兩天高雄的幸運色是<span className="font-bold text-[#005CA8]">「寶藍色」</span>。
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        建議阿堡身上可以帶點寶藍色元素（衣服、飾品皆可），走在巨蛋附近可能會遇到好事喔！
                        <span className="opacity-0">（嘿嘿~~）</span>
                    </p>
                </div>
                <div
                    className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-100 rotate-12">
                    <div className="w-8 h-8 bg-[#005CA8] rotate-45 shadow-sm"></div>
                </div>
            </div>
        </div>

        <div className="text-center py-8">
            <button className="bg-gray-100 text-gray-400 text-xs px-4 py-2 rounded-full cursor-default">
                距離出發倒數：1/24 見
            </button>
        </div>
    </div>
);

const NoticeItem = ({ num, title, desc }) => (
    <div className="flex gap-3">
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            {num}
        </div>
        <div>
            <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
            <p className="text-blue-100 text-xs">{desc}</p>
        </div>
    </div>
);

const RandomDiamonds = ({ count = 10, minSize = 20, maxSize = 50, className = "" }) => {
    const [diamonds, setDiamonds] = useState([]);

    useEffect(() => {
        // Grid based distribution algorithm
        const cols = Math.ceil(Math.sqrt(count));
        const rows = Math.ceil(count / cols);
        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;

        const newDiamonds = Array.from({ length: count }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;

            // Randomize position within the grid cell with 10% padding to avoid edge bunching
            const top = (row * cellHeight) + (Math.random() * cellHeight * 0.8) + (cellHeight * 0.1);
            const left = (col * cellWidth) + (Math.random() * cellWidth * 0.8) + (cellWidth * 0.1);

            return {
                id: i,
                top,
                left,
                size: Math.random() * (maxSize - minSize) + minSize,
                rotation: Math.random() * 360,
                delay: Math.random() * 5,
                duration: Math.random() * 10 + 10, // 10-20s duration
            };
        });
        setDiamonds(newDiamonds);
    }, [count, minSize, maxSize]);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {diamonds.map((d) => (
                <img
                    key={d.id}
                    src={diamondImg}
                    alt=""
                    style={{
                        position: 'absolute',
                        top: `${d.top}%`,
                        left: `${d.left}%`,
                        width: `${d.size}px`,
                        transform: `rotate(${d.rotation}deg)`,
                    }}
                    className="opacity-60 mix-blend-multiply transition-all duration-1000"
                />
            ))}
        </div>
    );
};
