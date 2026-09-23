window.TRIP = {
  title: "峇里島 涵威活該沒玩到",
  startDate: "2026-09-26",
  endDate: "2026-10-04",
  lastSynced: "2026-09-24",
  sharedMap: "https://maps.app.goo.gl/EYtgvMmLSHdt5Vys9",
  cities: ["峇里島", "泗水", "新加坡"],
  days: [
    {
      date:"2026-09-26",label:"9 月 26 日",city:"台北 → 新加坡 → 峇里島・烏布",tone:"amber",image:"assets/day-01-bali-arrival.jpg",
      events:[
        {time:"01:35",end:"06:00",category:"移動",plan:"main",title:"酷航 TR873",subtitle:"台北 → 新加坡",description:"TPE 第一航廈 → SIN 第一航廈｜Boeing 787-8｜飛行 4 小時 25 分",duration:"4 小時 25 分",regions:["台北","新加坡"]},
        {time:"07:30",end:"10:20",category:"移動",plan:"main",title:"酷航 TR280",subtitle:"新加坡 → 峇里島",description:"SIN 第一航廈 → DPS 國際航廈｜Boeing 787-8｜飛行 2 小時 50 分",duration:"2 小時 50 分",regions:["新加坡","峇里島"]},
        {time:"11:05",category:"移動",plan:"main",title:"DPS 機場 → Emerald Hills by ENKI",subtitle:"機場接送",description:"配合 TR280 抵達後前往 Ubud 住宿；Comfort 車型已預約。",reservation:"已預約",regions:["峇里島"]},
        {time:"18:30",category:"移動",plan:"main",title:"同行者抵達",description:"原始備註：先不用理他。",regions:["峇里島"]}
      ],
      alternatives:[{time:"18:00",end:"20:30",category:"景點",plan:"backup",title:"Ubud Center",subtitle:"晚餐＋散步",description:"只有抵達後精神好再去；否則留在 Villa 附近休息。",regions:["峇里島"]}]
    },
    {
      date:"2026-09-27",label:"9 月 27 日",city:"峇里島・烏布",tone:"green",image:"assets/day-02-ubud.jpg",
      events:[
        {time:"09:00",end:"10:30",category:"景點",plan:"main",title:"坎普漢山脊步道",englishName:"Campuhan Ridge Walk",description:"早上走較舒服，完整步行約 1～1.5 小時。",regions:["峇里島"]},
        {time:"10:30",end:"10:45",category:"移動",plan:"main",title:"Campuhan Ridge Walk → Ubud Center",subtitle:"步行",description:"步行前往烏布皇宮與薩拉斯瓦蒂寺。",duration:"約 10～15 分鐘",regions:["峇里島"]},
        {time:"11:00",end:"11:30",category:"景點",plan:"main",title:"烏布皇宮",englishName:"Ubud Royal Palace",description:"Ubud Center 市區散步主線。",regions:["峇里島"]},
        {time:"11:40",end:"12:10",category:"景點",plan:"main",title:"薩拉斯瓦蒂寺",englishName:"Saraswati Temple",description:"又稱水宮殿；從烏布皇宮步行約 5～10 分鐘。",regions:["峇里島"]},
        {time:"13:30",end:"14:30",category:"景點",plan:"main",title:"烏布市場",englishName:"Ubud Market",description:"午後逛市場，結束後回 Villa 休息。",regions:["峇里島"]},
        {time:"14:30",end:"15:00",category:"移動",plan:"main",title:"Ubud Center → Emerald Hill Villa",subtitle:"Grab／Gojek／計程車",description:"依 Villa 位置與塞車調整；回 Villa 休息。",duration:"約 15～30 分鐘",regions:["峇里島"]}
      ],
      alternatives:[
        {time:"14:30",end:"15:30",category:"景點",plan:"backup",title:"德哥拉朗梯田",englishName:"Tegallalang Rice Terrace",description:"郊區備案；可取代部分 Ubud Center／Villa 休息時間。從 Ubud 市區車程約 30～50 分鐘。",duration:"單程約 30～50 分鐘",regions:["峇里島"]},
        {time:"16:00",end:"17:00",category:"景點",plan:"backup",title:"聖泉寺",englishName:"Tirta Empul",description:"可與德哥拉朗梯田組成郊區備案；梯田到聖泉寺車程約 20～30 分鐘。",duration:"景點間約 20～30 分鐘",regions:["峇里島"]}
      ]
    },
    {
      date:"2026-09-28",label:"9 月 28 日",city:"峇里島・烏布 → 海神廟 → 水明漾",tone:"stone",image:"assets/day-03-tanah-lot.jpg",
      events:[
        {time:"13:00",end:"15:00",category:"移動",plan:"main",title:"Ubud Villa → 海神廟",subtitle:"包車／Grab",description:"換住宿日帶行李移動；不提前預約，到當地再找包車／司機，必要時使用 Grab。",duration:"約 2 小時",reservation:"現場處理",regions:["峇里島"]},
        {time:"15:00",end:"17:15",category:"景點",plan:"main",title:"海神廟",englishName:"Tanah Lot",description:"下午逛 Tanah Lot；因 19:30 Mama San 已訂位，需提早離開，不等完整夕陽。",regions:["峇里島"]},
        {time:"17:15",end:"18:30",category:"移動",plan:"main",title:"海神廟 → Spacious 3BR Villa",subtitle:"前往水明漾入住",description:"回 Villa 放行李、快速整理後再出發前往餐廳。",duration:"約 1 小時 15 分",regions:["峇里島"]},
        {time:"18:50",end:"19:10",category:"移動",plan:"main",title:"Spacious 3BR Villa → Mama San",subtitle:"Grab／Gojek／計程車",description:"建議 19:15 前抵達，訂位僅保留 15 分鐘。",duration:"約 20 分鐘",regions:["峇里島"]},
        {time:"19:30",end:"21:30",category:"吃",plan:"main",title:"Mama San",subtitle:"朋友大推｜現代東南亞料理",description:"朋友大推的 Seminyak 現代東南亞料理，晚餐已訂位。",reservation:"已訂位",maps:"https://maps.app.goo.gl/T7GSnhw6UhSwVsGz5",website:"https://mamasanbali.com/",image:"assets/mamasan-bali.webp",regions:["峇里島"]}
      ],
      alternatives:[{time:"17:00",end:"18:30",category:"景點",plan:"backup",title:"Potato Head Sound Healing",subtitle:"取代海神廟",description:"若不去 Tanah Lot，可改成 Seminyak 的 Sound Healing；Notion 標示 17:00 場次。",reservation:"需預約",regions:["峇里島"]}]
    },
    {
      date:"2026-09-29",label:"9 月 29 日",city:"峇里島・水明漾 → 烏魯瓦圖",tone:"blue",image:"assets/day-04-uluwatu.jpg",
      events:[
        {time:"09:00",end:"10:15",category:"吃",plan:"main",title:"水明漾早餐＋咖啡",description:"留在 Villa／Seminyak 附近，不特別跨區。",regions:["峇里島"]},
        {time:"10:15",end:"10:45",category:"移動",plan:"main",title:"Seminyak Villa → Desa Potato Head",subtitle:"Grab／Gojek／計程車",description:"包含叫車等待，提早抵達報到。",duration:"約 15～30 分鐘",regions:["峇里島"]},
        {time:"11:00",end:"12:30",category:"景點",plan:"main",title:"Potato Head Sound Healing",subtitle:"Klymax",description:"Notion 標示為官方 9/29 付費場次。",reservation:"需預約",regions:["峇里島"]},
        {time:"14:00",end:"16:00",category:"移動",plan:"main",title:"Seminyak → Uluwatu",subtitle:"包車／Grab",description:"預留 1.5～2 小時交通緩衝；不提前預約，到當地再找包車／司機或使用 Grab。",duration:"約 1.5～2 小時",reservation:"現場處理",regions:["峇里島"]},
        {time:"16:00",end:"17:30",category:"景點",plan:"main",title:"烏魯瓦圖廟",englishName:"Uluwatu Temple",description:"下午參觀寺廟，接續 18:00 Kecak Dance。",regions:["峇里島"]},
        {time:"18:00",end:"19:00",category:"景點",plan:"main",title:"Kecak & Fire Dance Uluwatu",description:"夕陽場；現場約 16:00 起售票但常排隊。",reservation:"建議先買票",regions:["峇里島"]},
        {time:"19:15",end:"20:45",category:"移動",plan:"main",title:"Uluwatu → Seminyak Villa",subtitle:"回飯店",description:"建議沿用下午包車司機。",duration:"約 1～1.5 小時",regions:["峇里島"]}
      ],
      alternatives:[{time:"17:00",end:"18:30",category:"景點",plan:"backup",title:"Sonic Breath @ Potato Head",subtitle:"取代 Uluwatu",description:"若不去 Uluwatu，可留在 Seminyak 參加 Tuesday Sonic Breath。",reservation:"需預約",regions:["峇里島"]}]
    },
    {
      date:"2026-09-30",label:"9 月 30 日",city:"峇里島 → 泗水",tone:"amber",image:"assets/day-05-surabaya-arrival.jpg",
      events:[
        {time:"10:15",end:"11:15",category:"移動",plan:"main",title:"Seminyak Villa → DPS 機場",subtitle:"送機",description:"Lion Air 13:55 起飛；不要拖到 11:00 才出發。",duration:"約 30～60 分鐘",reservation:"建議預約",regions:["峇里島"]},
        {time:"13:55",end:"13:55",category:"移動",plan:"main",title:"Lion Air JT919",subtitle:"峇里島 → 泗水",description:"DPS 13:55 → SUB 13:55；飛行約 1 小時，峇里島比泗水快 1 小時。",duration:"約 1 小時",regions:["峇里島","泗水"]},
        {time:"14:45",end:"15:30",category:"移動",plan:"main",title:"SUB 機場 → Aloft Surabaya Pakuwon City",subtitle:"Grab／計程車",description:"領完行李後前往飯店；Aloft 距 SUB 約 18 公里。",duration:"約 45 分鐘",regions:["泗水"]},
        {time:"18:00",end:"20:30",category:"吃",plan:"main",title:"Pakuwon City Mall",subtitle:"晚餐＋休息",description:"抵達泗水第一晚不跑市區；直接在飯店相連商場吃飯、補給。",regions:["泗水"]}
      ],alternatives:[]
    },
    {
      date:"2026-10-01",label:"10 月 1 日",city:"泗水 → 布羅莫火山 → Madakaripura → 泗水",tone:"green",image:"assets/day-07-bromo.jpg",
      events:[
        {time:"00:00",end:"03:30",category:"移動",plan:"main",title:"Aloft → Bromo",subtitle:"一日遊接送",description:"主方案為 Bromo＋Madakaripura；出發前先確認 Tour 業者、價格、飯店接送、4WD Jeep、門票與實際 Pickup 時間。",duration:"約 3.5 小時",reservation:"需先確認／預訂",regions:["泗水"]},
        {time:"03:30",end:"09:15",category:"景點",plan:"main",title:"布羅莫火山",englishName:"Mt. Bromo",description:"Bromo 日出 → 沙海 → 火山口 → 早餐，接著前往 Madakaripura Waterfall。",reservation:"需預約 Tour／4WD",regions:["泗水"]},
        {time:"09:15",end:"11:00",category:"移動",plan:"main",title:"Bromo → Madakaripura Waterfall",subtitle:"Tour 移動",description:"Bromo 早餐後離開高地，由一日遊車輛接續前往瀑布。",duration:"約 1 小時 45 分",regions:["泗水"]},
        {time:"11:00",end:"12:30",category:"景點",plan:"main",title:"Madakaripura Waterfall",subtitle:"一日遊瀑布段",description:"步道會濕滑，建議準備防滑涼鞋／可碰水鞋、防水袋與輕便防水層。",regions:["泗水"]},
        {time:"12:30",end:"15:00",category:"移動",plan:"main",title:"Madakaripura → Aloft",subtitle:"Tour 回程",description:"瀑布行程結束後返回 Surabaya，實際抵達時間依交通調整。",duration:"約 2.5 小時",regions:["泗水"]}
      ],alternatives:[]
    },
    {
      date:"2026-10-02",label:"10 月 2 日",city:"泗水・老城 → Tunjungan",tone:"stone",image:"assets/day-06-surabaya-old-city.jpg",
      events:[
        {time:"09:30",end:"10:15",category:"移動",plan:"main",title:"Aloft → Tugu Pahlawan",subtitle:"Grab",description:"Bromo 隔天睡晚一點再出發，前往泗水市中心。",duration:"約 45 分鐘",regions:["泗水"]},
        {time:"10:15",end:"11:15",category:"景點",plan:"main",title:"Tugu Pahlawan + Museum Sepuluh Nopember",description:"泗水代表性歷史景點。",regions:["泗水"]},
        {time:"11:15",end:"11:45",category:"移動",plan:"main",title:"Tugu Pahlawan → Jembatan Merah",subtitle:"Grab",description:"短程叫車前往 Old City／Jembatan Merah。",duration:"約 30 分鐘",regions:["泗水"]},
        {time:"11:45",end:"12:10",category:"景點",plan:"main",title:"紅橋",englishName:"Jembatan Merah",description:"Surabaya Old City 歷史地標，接著步行前往 Kembang Jepun／Chinatown。",regions:["泗水"]},
        {time:"12:10",end:"12:20",category:"移動",plan:"main",title:"Jembatan Merah → Kembang Jepun",subtitle:"步行",description:"步行進入 Kembang Jepun／Surabaya Chinatown。",duration:"約 5～10 分鐘",regions:["泗水"]},
        {time:"12:20",end:"13:15",category:"景點",plan:"main",title:"泗水唐人街",englishName:"Surabaya Chinatown",description:"Kembang Jepun 老城散步。",regions:["泗水"]},
        {time:"13:15",end:"14:15",category:"吃",plan:"main",title:"Old City 午餐",description:"在 Jembatan Merah／Kembang Jepun 一帶找午餐，保留彈性。",regions:["泗水"]},
        {time:"14:30",end:"15:00",category:"移動",plan:"main",title:"Old City → Jalan Tunjungan",subtitle:"Grab",description:"從 Old City 前往 Jalan Tunjungan。",duration:"約 20～30 分鐘",regions:["泗水"]},
        {time:"15:00",end:"17:30",category:"景點",plan:"main",title:"Jalan Tunjungan",subtitle:"下午散步＋咖啡",description:"下午到傍晚逛 Jalan Tunjungan、咖啡與老建築，作為泗水最後一晚收尾。",regions:["泗水"]},
        {time:"17:30",end:"18:15",category:"移動",plan:"main",title:"Jalan Tunjungan → Aloft",subtitle:"回飯店",description:"晚上整理行李，隔天早上前往 SUB 機場。",duration:"約 45 分鐘",regions:["泗水"]}
      ],
      alternatives:[
        {time:"14:15",end:"15:00",category:"景點",plan:"backup",title:"Pasar Pabean Surabaya",description:"傳統市場；老城行程若有興趣再加入，與 Jembatan Merah Plaza 二選一。",regions:["泗水"]},
        {time:"14:15",end:"15:00",category:"景點",plan:"backup",title:"Jembatan Merah Plaza",description:"老城區傳統商場；若還想逛再加入，否則直接前往 Tunjungan。",regions:["泗水"]}
      ]
    },
    {
      date:"2026-10-03",label:"10 月 3 日",city:"泗水 → 新加坡・Marina Bay",tone:"blue",image:"assets/day-08-singapore.jpg",
      events:[
        {time:"07:00",end:"08:00",category:"移動",plan:"main",title:"Aloft → SUB 機場",subtitle:"送機",description:"10:35 國際線起飛，建議至少預留 2.5 小時以上辦理出境。",duration:"約 1 小時",reservation:"建議前晚預約",regions:["泗水"]},
        {time:"10:35",end:"14:00",category:"移動",plan:"main",title:"酷航 TR297",subtitle:"泗水 → 新加坡",description:"SUB 第二航廈 → SIN 第一航廈｜Airbus A320neo｜飛行 2 小時 25 分。",duration:"2 小時 25 分",regions:["泗水","新加坡"]},
        {time:"14:45",end:"15:45",category:"移動",plan:"main",title:"SIN T1 → Hotel Mi Bencoolen",subtitle:"MRT／Grab／Taxi",description:"入境取行李後前往 Bencoolen。",duration:"約 45～60 分鐘",regions:["新加坡"]},
        {time:"16:30",end:"17:00",category:"移動",plan:"main",title:"Hotel Mi Bencoolen → Merlion Park",subtitle:"MRT／Grab",description:"只帶輕便隨身物品。",duration:"約 30 分鐘",regions:["新加坡"]},
        {time:"17:00",end:"17:45",category:"景點",plan:"main",title:"魚尾獅公園＋濱海灣",englishName:"Merlion Park + Marina Bay",description:"新加坡短停留先看最經典 Marina Bay 景觀。",regions:["新加坡"]},
        {time:"17:45",end:"18:20",category:"移動",plan:"main",title:"Merlion Park → Gardens by the Bay",subtitle:"步行",description:"沿 Marina Bay、經 Marina Bay Sands 前往。",duration:"約 30～35 分鐘",regions:["新加坡"]},
        {time:"18:20",end:"19:45",category:"景點",plan:"main",title:"濱海灣花園・擎天樹叢",englishName:"Gardens by the Bay · Supertree Grove",description:"傍晚逛 Supertree Grove，接 19:45 燈光秀。",regions:["新加坡"]},
        {time:"19:45",end:"20:00",category:"景點",plan:"main",title:"Garden Rhapsody",subtitle:"Supertree Light Show",description:"免費燈光音樂秀。",regions:["新加坡"]},
        {time:"20:00",end:"20:30",category:"移動",plan:"main",title:"Supertree Grove → Marina Bay Sands",subtitle:"步行",description:"途中可順便吃簡單晚餐或買飲料。",duration:"約 30 分鐘",regions:["新加坡"]},
        {time:"21:00",end:"21:15",category:"景點",plan:"main",title:"Spectra",subtitle:"Marina Bay Sands Light & Water Show",description:"Notion 安排 21:00 場次。",regions:["新加坡"]},
        {time:"21:30",end:"22:00",category:"移動",plan:"main",title:"Marina Bay Sands → Hotel Mi Bencoolen",subtitle:"MRT／Grab",description:"回飯店，結束新加坡短停留行程。",duration:"約 30 分鐘",regions:["新加坡"]}
      ],
      alternatives:[{time:"16:30",end:"20:00",category:"景點",plan:"backup",title:"Bugis／Haji Lane",subtitle:"飯店附近輕鬆版",description:"若航班延誤或太累，取消 Marina Bay 長路線；附近逛街、晚餐後早點回飯店。",regions:["新加坡"]}]
    },
    {
      date:"2026-10-04",label:"10 月 4 日",city:"新加坡 → 台北",tone:"amber",image:"assets/day-09-changi.jpg",
      events:[
        {time:"08:15",end:"09:00",category:"移動",plan:"main",title:"Hotel Mi Bencoolen → Changi T1",subtitle:"送機",description:"12:25 起飛，早上直接前往機場；Grab／Taxi 最省時間。",duration:"約 45 分鐘",regions:["新加坡"]},
        {time:"12:25",end:"17:10",category:"移動",plan:"main",title:"酷航 TR872",subtitle:"新加坡 → 台北",description:"SIN 第一航廈 → TPE 第一航廈｜Boeing 787-8｜飛行 4 小時 45 分。",duration:"4 小時 45 分",regions:["新加坡","台北"]}
      ],
      alternatives:[{time:"09:15",end:"10:15",category:"景點",plan:"backup",title:"Jewel Changi",subtitle:"早餐＋Rain Vortex",description:"若提早完成報到／託運，可去 T1 相連的 Jewel；Rain Vortex 10:00 開始。",regions:["新加坡"]}]
    }
  ],
  wishlist:[
    {category:"景點",title:"婆羅浮屠",englishName:"Candi Borobudur",description:"位於 Yogyakarta／Magelang 方向，與本次泗水市區＋Bromo 動線差距太大，因此保留在未排日。",regions:["印尼・爪哇"],status:"未排日"},
    {category:"景點",title:"賽武瀑布",englishName:"Tumpak Sewu Waterfall",description:"10/1 已確定 Bromo＋Madakaripura，不再塞入本次主行程，保留為未排日備案。",regions:["泗水"],status:"未排日"},
    {category:"景點",title:"克隆孔古法院",englishName:"Kertha Gosa",description:"位於 Ubud 往東／Sidemen 方向，與 9/28 Ubud → Tanah Lot → Seminyak 路線相反，因此保留在未排日。",regions:["峇里島"],status:"未排日"}
  ],
  stays:[
    {name:"Emerald Hill Villa｜Minimalist 2BR Villa in Ubud",dates:"9/26–9/28・2 晚",startDate:"2026-09-26",endDate:"2026-09-28",checkIn:"14:00",location:"Ubud",region:"峇里島",image:"assets/stay-ubud.jpg"},
    {name:"Spacious 3BR Villa in Seminyak",dates:"9/28–9/30・2 晚",startDate:"2026-09-28",endDate:"2026-09-30",checkIn:"18:30",location:"Seminyak",region:"峇里島",image:"assets/stay-seminyak.jpg"},
    {name:"Aloft by Marriott Surabaya Pakuwon City",dates:"9/30–10/3・3 晚",startDate:"2026-09-30",endDate:"2026-10-03",checkIn:"15:30",location:"Surabaya",region:"泗水",image:"assets/stay-surabaya.jpg"},
    {name:"Hotel Mi Bencoolen",dates:"10/3–10/4・1 晚",startDate:"2026-10-03",endDate:"2026-10-04",checkIn:"15:45",location:"Singapore",region:"新加坡",image:"assets/stay-singapore.jpg"}
  ],
  flights:[
    {route:"台北桃園（TPE） → 新加坡樟宜（SIN）",number:"TR873",date:"9 月 26 日",depart:"01:35",arrive:"06:00",from:"台北桃園・第一航廈",to:"新加坡樟宜・第一航廈",aircraft:"Boeing 787-8"},
    {route:"新加坡樟宜（SIN） → 峇里島伍拉・賴（DPS）",number:"TR280",date:"9 月 26 日",depart:"07:30",arrive:"10:20",from:"新加坡樟宜・第一航廈",to:"峇里島伍拉・賴・國際航廈",aircraft:"Boeing 787-8"},
    {route:"峇里島伍拉・賴（DPS） → 泗水朱安達（SUB）",number:"JT919",date:"9 月 30 日",depart:"13:55",arrive:"13:55",from:"峇里島伍拉・賴",to:"泗水朱安達",aircraft:"Lion Air"},
    {route:"泗水朱安達（SUB） → 新加坡樟宜（SIN）",number:"TR297",date:"10 月 3 日",depart:"10:35",arrive:"14:00",from:"泗水朱安達・第二航廈",to:"新加坡樟宜・第一航廈",aircraft:"Airbus A320neo"},
    {route:"新加坡樟宜（SIN） → 台北桃園（TPE）",number:"TR872",date:"10 月 4 日",depart:"12:25",arrive:"17:10",from:"新加坡樟宜・第一航廈",to:"台北桃園・第一航廈",aircraft:"Boeing 787-8"}
  ],
  preparation:{
    syncedAt:"2026-09-24 01:38",
    lastCompleted:"Mama San 已訂位、9/26 機場接送已預約，峇里島兩日包車決定現場處理。",
    nextPriority:"先完成簽證／入境與換匯，再確認 Bromo＋Madakaripura Tour、Sound Healing 與 Kecak 票券。",
    discussion:[
      {title:"💰 錢",details:["決定 IDR 現金金額與換匯方式","確認信用卡海外刷卡與手續費","決定是否準備少量 SGD"]},
      {title:"✈️ 機場接送",details:["9/26 DPS → Ubud 已預約","9/30 Seminyak Villa → DPS：當天 Grab／叫車","10/3 Aloft → SUB：前一晚確認 Grab／飯店叫車"]},
      {title:"🌋 Bromo＋Madakaripura 一日遊",details:["確認 Tour 業者與價格","確認飯店接送、4WD、兩處門票、早餐與 Local Guide 等內容","確認實際 Pickup 與返回 Surabaya 時間"]},
      {title:"🧘 Sound Healing 參加人數",details:["9/29 11:00–12:30","確認參加人數後一次訂票"]},
      {title:"🔥 Uluwatu Kecak 參加人數",details:["9/29 18:00 場","建議確認人數後先買電子票"]}
    ],
    bookings:[
      {date:"9/29",title:"Potato Head Sound Healing"},
      {date:"9/29",title:"Uluwatu Kecak 18:00 電子票"},
      {date:"9/30",title:"Seminyak → DPS｜當天 Grab／叫車"},
      {date:"10/1",title:"Bromo＋Madakaripura Tour"},
      {date:"10/3",title:"Aloft → SUB｜前一晚確認叫車"}
    ],
    personal:[
      {title:"🛂 簽證／入境",details:["確認護照效期至少 6 個月","辦理 Indonesia eVOA／VOA 並支付 Bali Tourist Levy","9/23 起填 All Indonesia Arrival Card","10/1 起填 Singapore SG Arrival Card"]}
    ],
    completed:["國際線機票","峇里島 → 泗水國內線","住宿全部訂好","峇里島主行程排定","泗水主行程排定","新加坡 Stopover 主行程排定","9/26 DPS → Ubud 機場接送已預約","9/28 Mama San 已訂位","峇里島兩日包車決定現場處理","eSIM 已購買","個人支付設定完成","手機 Grab 可登入","婆羅浮屠移至未排日","Madakaripura 併入 10/1 主行程；Tumpak Sewu 移回未排日"],
    later:["餐廳","咖啡廳","酒吧","按摩","購物","臨時景點"]
  },
  packing:[
    {name:"⭐ 必帶",items:["請假","護照","旅遊簽證","旅遊保險","信用卡 ×2（主卡＋備用卡）","少量現金／IDR","手機","eSIM / SIM","行動電源","充電線","多孔充電器","插座轉接頭","延長線","淨水龍頭","耳機","常備藥","機票／住宿／Voucher／QR Code 可離線查看"]},
    {name:"☀️ 海島用品",items:["SPF50+ 防曬","防曬護唇膏","防蚊液","保濕用品","小包衛生紙／濕紙巾","摺疊傘","防水袋／夾鏈袋"]},
    {name:"🧴 盥洗／個人用品",items:["牙刷／牙膏","牙線","洗面乳","保養品（旅行分裝）","刮鬍刀","梳子／髮蠟","個人藥品","止痛藥","腸胃藥","暈車藥","OK 繃"]},
    {name:"🌴 衣物",items:["輕薄上衣 ×3–4","短褲 ×2–3","內衣褲","襪子 ×2–3","睡衣／舒適衣物 ×1","泳衣 ×1","帽子","太陽眼鏡","輕便拖鞋／涼鞋","好走的運動鞋"]},
    {name:"🌋 Bromo 火山專用",items:["薄長袖／保暖內層 ×1","長褲 ×1","薄羽絨或保暖外套 ×1","好走、防滑的運動鞋","襪子","口罩（火山灰）","毛帽／帽子（怕冷再帶）","薄手套（怕冷再帶）","小背包","水","小零食／能量棒"]},
    {name:"🟢 可選",items:["飛機頸枕","水壺","相機","藍牙喇叭","Chromecast","額外鞋子"]}
  ],
  categories:[{name:"移動",icon:"🚀"},{name:"住宿",icon:"🏨"},{name:"吃",icon:"🍽"},{name:"景點",icon:"🏛"}]
};
