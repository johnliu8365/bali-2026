window.TRIP = {
  title: "峇里島 涵威活該沒玩到",
  startDate: "2026-09-26",
  endDate: "2026-10-04",
  lastSynced: "2026-09-22",
  sharedMap: "https://maps.app.goo.gl/EYtgvMmLSHdt5Vys9",
  cities: ["峇里島", "泗水", "新加坡"],
  days: [
    {
      date:"2026-09-26",label:"9 月 26 日",city:"台北 → 新加坡 → 峇里島・烏布",tone:"amber",image:"assets/day-01-bali-arrival.jpg",
      events:[
        {time:"01:35",end:"06:00",category:"移動",plan:"main",title:"酷航 TR873",subtitle:"台北 → 新加坡",description:"TPE 第一航廈 → SIN 第一航廈｜Boeing 787-8｜飛行 4 小時 25 分",duration:"4 小時 25 分",regions:["台北","新加坡"]},
        {time:"07:30",end:"10:20",category:"移動",plan:"main",title:"酷航 TR280",subtitle:"新加坡 → 峇里島",description:"SIN 第一航廈 → DPS 國際航廈｜Boeing 787-8｜飛行 2 小時 50 分",duration:"2 小時 50 分",regions:["新加坡","峇里島"]},
        {time:"11:45",end:"13:45",category:"移動",plan:"main",title:"DPS 機場 → Emerald Hill Villa",subtitle:"機場接送",description:"車程約 75～120 分鐘；抵達日建議事先預約，避免落地後才處理交通。",duration:"約 1 小時 15 分～2 小時",reservation:"建議預約",regions:["峇里島"]},
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
        {time:"13:00",end:"15:00",category:"移動",plan:"main",title:"Ubud Villa → 海神廟",subtitle:"包車移動",description:"換住宿日帶行李移動，保守抓 1.5～2 小時。",duration:"約 1.5～2 小時",reservation:"建議預約",regions:["峇里島"]},
        {time:"15:00",end:"18:15",category:"景點",plan:"main",title:"海神廟",englishName:"Tanah Lot",description:"換飯店日的主景點；下午抵達後慢慢逛並等夕陽。",regions:["峇里島"]},
        {time:"18:15",end:"19:30",category:"移動",plan:"main",title:"海神廟 → Spacious 3BR Villa",subtitle:"前往水明漾入住",description:"夕陽後直接前往 Seminyak。",duration:"約 60～75 分鐘",regions:["峇里島"]},
        {time:"20:00",end:"20:20",category:"移動",plan:"main",title:"Spacious 3BR Villa → Mamasan Bali",subtitle:"Grab／Gojek／計程車",description:"入住 Seminyak Villa 稍作整理後前往餐廳。",duration:"約 20 分鐘",regions:["峇里島"]},
        {time:"20:30",end:"22:00",category:"吃",plan:"main",title:"Mamasan Bali",subtitle:"朋友大推｜現代東南亞料理",description:"朋友大推的 Seminyak 現代東南亞料理。官方每天晚餐 17:30–22:30，建議事先訂位。",reservation:"建議事先訂位",maps:"https://maps.app.goo.gl/T7GSnhw6UhSwVsGz5",website:"https://mamasanbali.com/",image:"assets/mamasan-bali.webp",regions:["峇里島"]}
      ],
      alternatives:[{time:"17:00",end:"18:30",category:"景點",plan:"backup",title:"Potato Head Sound Healing",subtitle:"取代海神廟",description:"若不去 Tanah Lot，可改成 Seminyak 的 Sound Healing；Notion 標示 17:00 場次。",reservation:"需預約",regions:["峇里島"]}]
    },
    {
      date:"2026-09-29",label:"9 月 29 日",city:"峇里島・水明漾 → 烏魯瓦圖",tone:"blue",image:"assets/day-04-uluwatu.jpg",
      events:[
        {time:"09:00",end:"10:15",category:"吃",plan:"main",title:"水明漾早餐＋咖啡",description:"留在 Villa／Seminyak 附近，不特別跨區。",regions:["峇里島"]},
        {time:"10:15",end:"10:45",category:"移動",plan:"main",title:"Seminyak Villa → Desa Potato Head",subtitle:"Grab／Gojek／計程車",description:"包含叫車等待，提早抵達報到。",duration:"約 15～30 分鐘",regions:["峇里島"]},
        {time:"11:00",end:"12:30",category:"景點",plan:"main",title:"Potato Head Sound Healing",subtitle:"Klymax",description:"Notion 標示為官方 9/29 付費場次。",reservation:"需預約",regions:["峇里島"]},
        {time:"14:00",end:"16:00",category:"移動",plan:"main",title:"Seminyak → Uluwatu",subtitle:"包車／私人司機",description:"午後往南容易塞車；建議司機一路等到 Kecak 結束。",duration:"約 1.5～2 小時",reservation:"建議預約",regions:["峇里島"]},
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
      date:"2026-10-01",label:"10 月 1 日",city:"泗水・老城 → Tunjungan",tone:"stone",image:"assets/day-06-surabaya-old-city.jpg",
      events:[
        {time:"08:15",end:"09:00",category:"移動",plan:"main",title:"Aloft → Tugu Pahlawan",subtitle:"Grab",description:"從 East Surabaya 前往市中心。",duration:"約 30～45 分鐘",regions:["泗水"]},
        {time:"09:00",end:"10:15",category:"景點",plan:"main",title:"Tugu Pahlawan + Museum Sepuluh Nopember",description:"泗水代表性歷史景點。",regions:["泗水"]},
        {time:"10:15",end:"10:45",category:"移動",plan:"main",title:"Tugu Pahlawan → Jembatan Merah",subtitle:"Grab",description:"包含叫車等待，前往 Old City。",duration:"約 15～30 分鐘",regions:["泗水"]},
        {time:"10:45",end:"11:10",category:"景點",plan:"main",title:"紅橋",englishName:"Jembatan Merah",description:"Surabaya Old City 歷史地標。",regions:["泗水"]},
        {time:"11:10",end:"11:20",category:"移動",plan:"main",title:"Jembatan Merah → Kembang Jepun",subtitle:"步行",description:"步行進入 Kembang Jepun／Surabaya Chinatown。",duration:"約 5～10 分鐘",regions:["泗水"]},
        {time:"11:20",end:"12:30",category:"景點",plan:"main",title:"泗水唐人街",englishName:"Surabaya Chinatown",description:"Kembang Jepun 老城散步，與紅橋同區。",regions:["泗水"]},
        {time:"12:30",end:"13:30",category:"吃",plan:"main",title:"Old City 午餐",description:"在紅橋／Kembang Jepun 一帶找午餐，保留彈性。",regions:["泗水"]},
        {time:"14:30",end:"15:00",category:"移動",plan:"main",title:"Old City → Jalan Tunjungan",subtitle:"Grab",description:"從紅橋／Chinatown 區域前往 Tunjungan。",duration:"約 20～30 分鐘",regions:["泗水"]},
        {time:"15:00",end:"17:30",category:"景點",plan:"main",title:"Jalan Tunjungan",subtitle:"下午散步＋咖啡",description:"下午到傍晚逛 Tunjungan，街區氣氛較好。",regions:["泗水"]},
        {time:"17:30",end:"18:15",category:"移動",plan:"main",title:"Jalan Tunjungan → Aloft",subtitle:"回飯店",description:"早點吃飯、洗澡、休息，準備午夜 Bromo Tour。",duration:"約 45 分鐘",regions:["泗水"]}
      ],
      alternatives:[
        {time:"12:30",end:"13:15",category:"景點",plan:"backup",title:"Jembatan Merah Plaza",description:"老城區傳統商場；想逛再加入，否則主線直接午餐。",regions:["泗水"]},
        {time:"13:30",end:"14:15",category:"景點",plan:"backup",title:"Pasar Pabean Surabaya",description:"傳統香料與菜市場，與老城／Chinatown 距離近；體力與時間充裕再加入。",regions:["泗水"]}
      ]
    },
    {
      date:"2026-10-02",label:"10 月 2 日",city:"泗水 → 布羅莫火山 → 泗水",tone:"green",image:"assets/day-07-bromo.jpg",
      events:[
        {time:"00:00",end:"03:30",category:"移動",plan:"main",title:"Aloft → Bromo",subtitle:"午夜 Tour 接送",description:"通常午夜從 Surabaya 飯店接人，抵達 Bromo 區後轉 4WD Jeep。",duration:"約 3.5 小時",reservation:"需預約",regions:["泗水"]},
        {time:"03:30",end:"10:00",category:"景點",plan:"main",title:"布羅莫火山",englishName:"Mt. Bromo",description:"日出觀景點 → 4WD 穿越沙海 → 火山口健行。",reservation:"需預約 Tour／4WD",regions:["泗水"]},
        {time:"10:00",end:"14:00",category:"移動",plan:"main",title:"Bromo → Aloft",subtitle:"Tour 回程",description:"早餐後返回 Surabaya；多數一日行程約 13:00～15:00 回到市區。",duration:"約 3～4 小時",regions:["泗水"]}
      ],
      alternatives:[
        {time:"10:00",end:"17:00",category:"景點",plan:"backup",title:"Bromo + Madakaripura Waterfall",description:"若想升級成較滿的一日遊，可在 Bromo 後接瀑布；會比標準行程晚回 Surabaya。",reservation:"需預約",regions:["泗水"]},
        {time:"05:00",end:"18:00",category:"景點",plan:"backup",title:"賽武瀑布",englishName:"Tumpak Sewu Waterfall",subtitle:"取代 Bromo",description:"完整一日遊備案；若改選此方案就不跑 Bromo，不建議兩個硬塞同一天。",reservation:"建議預約包車／Tour",regions:["泗水"]}
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
    {category:"景點",title:"克隆孔古法院",englishName:"Kertha Gosa",description:"位於 Ubud 往東／Sidemen 方向，與 9/28 Ubud → Tanah Lot → Seminyak 路線相反，因此保留在未排日。",regions:["峇里島"],status:"未排日"}
  ],
  stays:[
    {name:"Emerald Hill Villa｜Minimalist 2BR Villa in Ubud",dates:"9/26–9/28・2 晚",startDate:"2026-09-26",endDate:"2026-09-28",checkIn:"14:00",location:"Ubud",region:"峇里島",image:"assets/stay-ubud.jpg"},
    {name:"Spacious 3BR Villa in Seminyak",dates:"9/28–9/30・2 晚",startDate:"2026-09-28",endDate:"2026-09-30",checkIn:"19:30",location:"Seminyak",region:"峇里島",image:"assets/stay-seminyak.jpg"},
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
    syncedAt:"2026-09-22 14:21",
    lastCompleted:"航班、4 間住宿與峇里島／泗水／新加坡主行程已排定。",
    nextPriority:"先決定包車與機場接送，再完成 Bromo Tour、Sound Healing／Kecak 預約；接著處理簽證入境、eSIM 與換匯。",
    discussion:[
      {title:"💰 錢",details:["決定 IDR 現金金額與換匯方式","確認信用卡海外刷卡與手續費","決定是否準備少量 SGD"]},
      {title:"🚗 峇里島包車",details:["9/28 Ubud → Tanah Lot → Seminyak","9/29 Seminyak → Uluwatu → Seminyak","確認兩天都包車或部分改用 Grab／Gojek"]},
      {title:"✈️ 機場接送",details:["9/26 DPS → Ubud Villa","9/30 Seminyak Villa → DPS","10/3 Aloft → SUB"]},
      {title:"🌋 Bromo 火山一日遊",details:["決定 Tour 業者與價格","確認接送、4WD、門票與早餐內容","確認 Pickup 與回程時間"]},
      {title:"🧘 Sound Healing 參加人數",details:["9/29 11:00–12:30","確認參加人數後一次訂票"]},
      {title:"🔥 Uluwatu Kecak 參加人數",details:["9/29 18:00 場","確認參加人數後購買電子票"]},
      {title:"🍽 Mamasan Bali 訂位人數",details:["9/28 20:30 晚餐","朋友大推","確認人數後事先訂位"]}
    ],
    bookings:[
      {date:"9/26",title:"DPS → Ubud 機場接送"},
      {date:"9/28",title:"Ubud → Tanah Lot → Seminyak 包車"},
      {date:"9/28",title:"Mamasan Bali 20:30 訂位"},
      {date:"9/29",title:"Potato Head Sound Healing"},
      {date:"9/29",title:"Seminyak → Uluwatu → Seminyak 包車"},
      {date:"9/29",title:"Uluwatu Kecak 18:00 電子票"},
      {date:"9/30",title:"Seminyak → DPS 送機"},
      {date:"10/2",title:"Bromo Sunrise Tour"},
      {date:"10/3",title:"Aloft → SUB 送機"}
    ],
    personal:[
      {title:"🛂 簽證／入境",details:["確認護照效期至少 6 個月","辦理 e-VoA／VoA","填寫 Arrival Card 並保存 QR Code","支付 Bali Tourist Levy"]},
      {title:"📱 eSIM／SIM",details:["決定 eSIM 或實體 SIM","確認印尼流量方案與新加坡使用方式","確認出發前開通方式"]},
      {title:"💳 個人支付設定",details:["開啟信用卡海外交易","確認海外刷卡 PIN","準備至少一張備用卡"]},
      {title:"📲 手機準備",details:["Grab／Gojek 可登入","下載 Google Maps 離線地圖","確認航班、住宿與 Voucher 可離線查看"]}
    ],
    completed:["國際線機票","峇里島 → 泗水國內線","住宿全部訂好","峇里島主行程排定","泗水主行程排定","新加坡 Stopover 主行程排定","婆羅浮屠移至未排日","Tumpak Sewu／Madakaripura 保留為備案"],
    later:["餐廳","咖啡廳","酒吧","按摩","購物","臨時景點"]
  },
  packing:[
    {name:"⭐ 必帶",items:["請假","護照","旅遊簽證","旅遊保險","信用卡 ×2（主卡＋備用卡）","少量現金／IDR","手機","eSIM／SIM","行動電源","充電線","多孔充電器／旅行轉接頭","耳機","常備藥","機票／住宿／Voucher／QR Code 可離線查看"]},
    {name:"☀️ 海島用品",items:["SPF50+ 防曬","防曬護唇膏","防蚊液","保濕用品","小包衛生紙／濕紙巾","摺疊傘","防水袋／夾鏈袋"]},
    {name:"🧴 盥洗／個人用品",items:["牙刷／牙膏","牙線","洗面乳","保養品（旅行分裝）","刮鬍刀","梳子／髮蠟","個人藥品","止痛藥","腸胃藥","暈車藥","OK 繃"]},
    {name:"🌴 衣物",items:["輕薄上衣 ×3–4","短褲 ×2–3","內衣褲","襪子 ×2–3","睡衣／舒適衣物 ×1","泳衣 ×1","帽子","太陽眼鏡","輕便拖鞋／涼鞋","好走的運動鞋"]},
    {name:"🌋 Bromo 火山專用",items:["薄長袖／保暖內層 ×1","長褲 ×1","薄羽絨或保暖外套 ×1","好走、防滑的運動鞋","襪子","口罩（火山灰）","毛帽／帽子（怕冷再帶）","薄手套（怕冷再帶）","小背包","水","小零食／能量棒"]},
    {name:"🟢 可選",items:["飛機頸枕","水壺","相機","藍牙喇叭","Chromecast","額外鞋子"]}
  ],
  categories:[{name:"移動",icon:"🚀"},{name:"住宿",icon:"🏨"},{name:"吃",icon:"🍽"},{name:"景點",icon:"🏛"}]
};
