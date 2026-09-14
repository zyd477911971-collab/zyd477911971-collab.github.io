/* Richer, topic-aware oracle copy. Original poetic lines; entertainment only. */
(function(){
  const TOPICS={
    love:{
      zh:'感情', en:'love',
      keys:['复合','感情','爱情','恋爱','喜欢','前任','分手','男朋友','女朋友','老公','老婆','结婚','婚姻','他会','她会','对方','缘分','暧昧','联系','回头'],
      enKeys:['love','relationship','ex','marry','marriage','boyfriend','girlfriend','back together'],
      poems:[
        '旧雨未停，新灯已亮；若问归期，先问心门。','花落不等于春尽，风回之处，仍有新枝。','两岸若还有灯，水面终会记得来路。','月有迟圆之夜，人有迟悟之时。','旧弦若要重鸣，先把尘声放轻。','缘未必断在远处，常断在一句未说清的话。','春风不催旧梦醒，只把新路吹到眼前。','若是有缘重逢，也应以新的模样相见。'],
      guidance:[
        '关系仍有回流空间，但越急着要答案，越容易让对方退回防御。先恢复轻松、稳定、可持续的互动。',
        '这件事的关键不在“有没有缘”，而在双方是否愿意重新建立信任。比起表态，行动的一致性更重要。',
        '目前更像情绪尚未完全散去，但关系结构还没有真正修复。若想继续，先处理旧问题，而不是重复旧模式。',
        '你在意的是结果，对方可能更在意压力感。把节奏放缓，给彼此留下主动靠近的空间，会比追问更有效。',
        '这段关系并非完全没有余地，但需要一次新的相处方式。若只是回到过去，旧矛盾大概率也会一起回来。'
      ],
      omens:['旧梦回声','灯影相照','风向回转','月色渐圆','双叶并生','远信将至'],
      prices:['需要耐心','需要放下控制','需要重新信任','需要一次坦诚','需要停止试探','需要新的相处方式']
    },
    career:{
      zh:'事业', en:'career',
      keys:['工作','事业','面试','升职','跳槽','职场','项目','公司','老板','创业','offer','入职','转正','客户','合作'],
      enKeys:['job','career','interview','promotion','offer','business','project','client'],
      poems:['山路不怕长，只怕雾里停步。','石上有苔，阶上有光；慢一步，也是在向上。','风未到高处，帆先学会张开。','门不开时，先把钥匙磨亮。','云压山腰，不代表峰顶无日。','路逢岔口，最忌两边都舍不得。','新枝欲高，先把旧叶放下。','贵人未至之前，先让自己值得被看见。'],
      guidance:['机会正在形成，但更需要你主动争取，而不是等待被发现。把成果、能力和可量化价值摆到台面上。','短期可能有阻力，但这更像筛选而不是否定。把目标缩小到下一步可执行动作，会明显改善局面。','现在适合做选择，而不是同时保留所有可能。方向越清楚，资源越容易聚拢。','这件事更依赖准备度。把最薄弱的一环补齐后，后续进展会比现在顺得多。','外部机会并不差，但你需要把主动权拿回来。尤其是沟通、谈条件和展示成果时，不要过度保守。'],
      omens:['阶梯向上','东风渐起','新门微开','纸上有印','晨光照案','远客来信'],
      prices:['需要准备','需要主动争取','需要舍弃旧路','需要承担责任','需要持续输出','需要更清晰的选择']
    },
    money:{
      zh:'财运', en:'money',
      keys:['钱','财运','财富','赚钱','收入','投资','生意','回款','订单','收益','盈利','存款','房子','买房'],
      enKeys:['money','income','profit','investment','business','wealth','revenue'],
      poems:['水满则溢，财聚先看器。','细流不断，胜过骤雨一场。','金落掌中易，留在掌中难。','风来可借，不可把船交给风。','财门不怕小，只怕进出无数。','米从一粒积，仓从一日满。','见利先问风险，见快先问代价。','月光照银，不替人守银。'],
      guidance:['这个愿望更适合走“稳定积累”而不是追求一次性的爆发。先看现金流和风险，再谈收益。','有机会，但不宜把不确定性当成确定收益。越是看起来轻松的回报，越要检查隐藏条件。','财务上的转机通常来自结构改善：提高收入来源、降低无效支出、减少高风险决策。','短期诱惑可能不少，真正有利的是能重复、能持续、能控制风险的路径。','这支更偏“守中求进”。先保住本金与节奏，再扩大规模，会比冒进更稳。'],
      omens:['细水入渠','仓门渐满','金线相连','账目见清','雨后见田','灯下有数'],
      prices:['需要克制冲动','需要控制风险','需要长期积累','需要清楚账目','需要拒绝贪快','需要保留余地']
    },
    study:{
      zh:'学业', en:'study',
      keys:['考试','学业','学习','上岸','录取','成绩','考研','高考','留学','学校','申请','论文','证书'],
      enKeys:['exam','study','school','admission','grade','university','application','thesis'],
      poems:['灯下多一页，榜上多一分。','书山不问早晚，只问脚步未停。','墨未干时，答案仍可改。','晨钟一声，胜过夜里百念。','路在纸上窄，走到终点却宽。','心若不乱，难题也会露出门缝。','一日一寸，终能越过长尺。','先把会的做稳，再去碰最难的山。'],
      guidance:['结果更受稳定投入影响。与其反复预测成败，不如把薄弱项拆开，逐一补齐。','目前最大的风险不是能力不足，而是节奏被焦虑打乱。先把每天可完成的任务固定下来。','这件事仍有提升空间，尤其适合通过模拟、复盘和针对性练习拉开差距。','你不需要一次解决全部问题。只要连续几天把核心任务完成，局面就会开始改变。','临近结果时最忌频繁改变方法。把已经验证有效的节奏守住，比追逐新技巧更重要。'],
      omens:['灯火未熄','墨色渐浓','榜纸见字','晨钟清响','书页顺风','笔锋渐稳'],
      prices:['需要规律','需要复盘','需要耐心积累','需要减少焦虑','需要专注弱项','需要守住节奏']
    },
    family:{
      zh:'家庭', en:'family',
      keys:['家人','家庭','父母','妈妈','爸爸','孩子','儿子','女儿','兄弟','姐妹','家里'],
      enKeys:['family','mother','father','parents','child','son','daughter'],
      poems:['屋檐虽小，能遮住的往往是人心。','灯要有人添油，家也要有人先开口。','门内风声重时，更需要一句轻话。','旧结不是一刀能断，常是一句一句慢慢松。','一家人最远的距离，有时只隔着一句不肯说的话。','饭桌上的温度，胜过道理的高度。','水向低处流，话也该向柔处落。','若想家门安，先让心门松。'],
      guidance:['这类问题更适合先降温再沟通。关系越近，越容易把“为你好”说成压力。','真正有效的修复通常来自具体的小行动，而不是一次把所有旧账说完。','你可能需要先区分：哪些是你的责任，哪些是对方必须自己承担的部分。','有些矛盾不是靠说服解决，而是靠边界、时间和稳定行为慢慢改变。','若愿意先把情绪和问题分开谈，很多僵局会比预想中更容易松动。'],
      omens:['灯火同明','门扉渐松','饭香回暖','旧结渐解','归鸟入檐','窗纸透光'],
      prices:['需要先听后说','需要建立边界','需要少翻旧账','需要给彼此时间','需要一次温和沟通','需要放下输赢']
    },
    health:{
      zh:'健康', en:'health',
      keys:['健康','身体','生病','疾病','手术','康复','治疗','医院','医生','症状','疼痛','怀孕'],
      enKeys:['health','sick','illness','surgery','recovery','doctor','hospital','pain','pregnant'],
      poems:['灯可照路，却不能替人问医。','身如一舟，风浪之时更要看清水势。','春意可以盼，药石仍需循证。','愿可安人心，判断仍应交给专业。','慢一些照顾自己，也是一种向前。','身体的信号，不该只交给吉凶解释。'],
      guidance:['这类愿望不适合用判词预测结果。把这支当成提醒：优先获得可靠的医疗评估，并按专业建议行动。','愿望可以给你力量，但不能替代检查、诊断或治疗。如果有持续或加重的不适，应及时就医。','这里不做健康吉凶判断。更实际的方向是记录症状、准备问题，并与合格的医疗专业人士沟通。','如果你正在等待检查或治疗结果，焦虑很正常，但结论应以医疗结果和医生意见为准。'],
      omens:['晨光渐稳','灯火守夜','静水养舟','春意未远'],
      prices:['需要专业判断','需要及时就医','需要规律照顾','需要耐心恢复']
    },
    general:{
      zh:'心愿', en:'wish', keys:[], enKeys:[],
      poems:['风从远处来，也要经过眼前这一程。','柳枝不替人走路，只替人指出风向。','夜深不是无路，只是路暂时看不全。','月缺时不问圆，先把今夜走完。','有些门不是不开，只是还差一次敲门。','愿望若有根，时间会替它长出枝叶。','水到桥边未必直，心定之后路自清。','问天之前，先问自己愿意走多远。'],
      guidance:['这件事仍有可推动的空间，但结果更依赖你下一步做什么，而不是等待一个外部信号。','现在最重要的是把愿望从“想要”变成具体行动。越具体，越容易看到真实变化。','局面并非完全清晰，适合先观察再推进。不要因为一次好或坏的信号就下最终结论。','你真正需要的可能不是一个答案，而是一个选择。把不可控的部分放下，先处理可控的。','这支提醒你：愿望不是终点，行动和反馈才会让方向逐渐清楚。'],
      omens:['雾气渐散','月光入林','风铃轻响','枝头见芽','水面开纹','远灯未灭'],
      prices:['需要行动','需要等待','需要做出选择','需要放下执念','需要接受变化','需要相信过程']
    }
  };

  const OUTCOMES={
    zh:[
      {label:'大吉',text:'整体势头偏强，若现实条件允许，可以积极推进，但仍要保留判断。'},
      {label:'吉',text:'方向较顺，机会比阻力更明显，关键在于把握节奏。'},
      {label:'渐吉',text:'不是立刻见效的类型，但随着条件改善，结果有转好的空间。'},
      {label:'平',text:'当前信息相互抵消，宜观察、验证，不宜仅凭一次信号下注结论。'},
      {label:'迟成',text:'结果可能比期待更晚出现，耐心和持续行动比催促更重要。'},
      {label:'阻滞',text:'眼下存在真实阻力，先处理卡点，比继续用力更有效。'},
      {label:'缘薄',text:'这件事与当前条件的匹配度偏弱，强求容易消耗更多。'},
      {label:'宜止',text:'这支更偏向提醒你重新评估成本与执念，停止也可能是一种前进。'}
    ],
    en:[
      {label:'Very Favorable',text:'Momentum is strong. Move forward if the real-world conditions support it, while keeping your judgment.'},
      {label:'Favorable',text:'The path is relatively open. Timing and consistency matter more than force.'},
      {label:'Gradually Favorable',text:'This is unlikely to resolve instantly, but the situation can improve as conditions change.'},
      {label:'Neutral',text:'Signals are mixed. Observe and verify rather than treating one sign as a final answer.'},
      {label:'Delayed',text:'The result may arrive later than hoped. Patience and steady action matter.'},
      {label:'Blocked',text:'There is a real obstacle now. Deal with the bottleneck before pushing harder.'},
      {label:'Weak Fit',text:'Current conditions are not strongly aligned. Forcing it may cost more than it returns.'},
      {label:'Release',text:'This points toward reassessing the cost of holding on. Letting go can also be forward movement.'}
    ]
  };

  const EN_POEMS={
    love:['Old rain still falls, yet a new lamp is lit.','If two shores keep a light, the water remembers the way.','A returning bond must meet in a new form.'],
    career:['A closed door may simply mean the key still needs shaping.','Clouds on the mountain do not erase the summit.','Open the sail before waiting for the wind.'],
    money:['A steady stream can fill what sudden rain cannot.','Before chasing speed, ask what the speed costs.','The moon can light silver, but it cannot guard it.'],
    study:['One more page under the lamp can become one more point on the list.','The mountain of books only asks that your steps continue.','Steady hands reveal doors in hard questions.'],
    family:['A home grows warmer when someone chooses the first gentle word.','Some knots loosen one sentence at a time.','The distance in a family can be only one unsaid sentence.'],
    health:['A wish can steady the heart, but it cannot replace medical judgment.','Hope may light the road; evidence should guide the treatment.','Listen to the body, and bring its signals to qualified care.'],
    general:['The branch cannot walk for you; it can only show the wind.','Night does not mean there is no road, only that not all of it is visible.','Ask the sky if you must, but first ask how far you are willing to walk.']
  };

  function h32(s){let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24)}return Math.abs(h>>>0)}
  function detect(w){const lower=w.toLowerCase();for(const [k,t] of Object.entries(TOPICS)){if(k==='general')continue;if(t.keys.some(x=>w.includes(x))||t.enKeys.some(x=>lower.includes(x)))return k}return 'general'}
  function pick(a,h,salt){return a[Math.floor(h/(salt||1))%a.length]}
  function snippet(w){const s=w.replace(/\s+/g,' ').trim();return s.length>28?s.slice(0,28)+'…':s}

  window.verdict=function(w){
    const language=(typeof lang!=='undefined'&&lang==='en')?'en':'zh';
    const topicKey=detect(w), topic=TOPICS[topicKey], h=h32(language+'|'+w+'|rich-v2');
    const outcome=OUTCOMES[language][h%OUTCOMES[language].length];
    let poem,guide,omen,price,body;
    if(language==='zh'){
      poem=pick(topic.poems,h,3); guide=pick(topic.guidance,h,7); omen=pick(topic.omens,h,11); price=pick(topic.prices,h,17);
      body=`【${outcome.label} · ${topic.zh}】「${poem}」你问的是“${snippet(w)}”。${outcome.text}${guide}`;
    }else{
      poem=pick(EN_POEMS[topicKey]||EN_POEMS.general,h,3); guide=pick(topic.guidance||TOPICS.general.guidance,h,7);
      if(topicKey==='health') guide='This result does not predict medical outcomes. Use it only as a reflective prompt and rely on qualified medical advice for health decisions.';
      omen=pick(topic.omens,h,11); price=pick(topic.prices,h,17);
      body=`【${outcome.label} · ${topic.en}】“${poem}” You asked: “${snippet(w)}”. ${outcome.text} ${guide}`;
    }
    return{body,omen,price};
  };
})();
