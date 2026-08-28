// Command dashboard: constants + sample data + small utils (plain script, no imports)
(function(){
  const KJV_TOTAL_CHAPTERS = 1189;
  const BIBLE_CATEGORIES = [
    {key:'ot', label:'Old Testament', target:929},
    {key:'nt', label:'New Testament', target:260},
    {key:'psalms', label:'Psalms', target:150},
    {key:'proverbs', label:'Proverbs', target:31}
  ];
  const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const FOCUS_MAP = { Sun:'Bible', Wed:'Bible', Mon:'STEM', Thu:'STEM', Tue:'Civilizational Studies', Fri:'Civilizational Studies', Sat:null };
  const CHUNK_NAMES = ['Wake Up','Morning','Afternoon','Evening','Night'];
  const WORKOUT_DAYS = ['Mon','Tue','Wed','Thu','Fri'];

  function pad(n){ return n<10 ? '0'+n : ''+n; }
  function dateKey(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
  function todayKey(){
    const now = new Date();
    // entries before 6am count toward previous day (journal rule; reused generally for "today" logic)
    return dateKey(now);
  }
  function uid(){ return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4); }
  function addDays(key,n){ const d=new Date(key+'T12:00:00'); d.setDate(d.getDate()+n); return dateKey(d); }
  function weekdayOf(key){ return WEEKDAYS[new Date(key+'T12:00:00').getDay()]; }

  function sampleData(){
    const today = todayKey();
    const days = {};
    // 30 days of sample history for heatmaps/graphs
    for(let i=29;i>=0;i--){
      const k = addDays(today, -i);
      const pct = Math.random();
      days[k] = {
        dailyDone: { d1: pct>0.3, d2: pct>0.5, d3: pct>0.7 },
        weeklyDone: {},
        chunkDone: { c1: pct>0.4, c2: pct>0.2, c3: pct>0.6, c4: pct>0.5, c5: pct>0.8 },
        water: Math.round(Math.random()*8),
        calories: 1800+Math.round(Math.random()*800),
        protein: 90+Math.round(Math.random()*60),
        weight: 178 - i*0.05 + (Math.random()-0.5),
        gym: Math.random()>0.4,
        devotion: {
          memoryVerse: pct>0.5 ? 'Philippians 4:13' : '',
          chapters: { ot: pct>0.3?3:0, nt: pct>0.4?2:0, psalms: pct>0.3?3:0, proverbs: pct>0.6?1:0 },
          prayer5: pct>0.4,
          prayerOfDay: '',
          newIdea: '',
          prayerRequests: [],
          thankful: []
        }
      };
    }
    const habitHist = (base, dir, vol) => {
      const h = {};
      let v = base;
      for(let i=29;i>=0;i--){
        v = Math.max(0, v + (Math.random()-0.5)*vol);
        h[addDays(today,-i)] = Math.round(v*10)/10;
      }
      return h;
    };
    return {
      streak: 12,
      dailyRecurring: [
        {id:'d1', text:'Make bed'}, {id:'d2', text:'Stretch 10 min'}, {id:'d3', text:'Review calendar'}
      ],
      adHoc: [
        {id:uid(), text:'Call the dentist', done:false},
        {id:uid(), text:'Return library books', done:false},
        {id:uid(), text:'Renew car registration', done:true}
      ],
      weeklyTasks: [
        {id:'w1', text:'Meal prep', days:['Sun']},
        {id:'w2', text:'Laundry', days:['Tue','Fri']},
        {id:'w3', text:'Deep clean kitchen', days:['Sat']}
      ],
      chunks: {
        'Wake Up': [{id:'c1', text:'Drink water'}, {id:'c1b', text:'No phone first 15 min'}],
        'Morning': [{id:'c2', text:'Devotion'}, {id:'c2b', text:'Check top 3 priorities'}],
        'Afternoon': [{id:'c3', text:'Walk after lunch'}],
        'Evening': [{id:'c4', text:'Plan tomorrow'}],
        'Night': [{id:'c5', text:'Screens off by 10'}, {id:'c5b', text:'Read 10 pages'}]
      },
      habits: [
        {id:'h1', name:'Pushups', direction:'increase', history: habitHist(20,'increase',6)},
        {id:'h2', name:'Screen time (hrs)', direction:'decrease', history: habitHist(4,'decrease',1.2)},
        {id:'h3', name:'Sleep (hrs)', direction:'increase', history: habitHist(6.5,'increase',1)}
      ],
      journal: [
        {id:uid(), dateKey: addDays(today,-2), text:'Good focus today, finished the STEM module ahead of schedule.'},
        {id:uid(), dateKey: addDays(today,-6), text:'Rough morning but recovered by afternoon. Prayer helped.'}
      ],
      reminders: [],
      bookList: [
        {id:uid(), title:'Meditations', author:'Marcus Aurelius', status:'reading'},
        {id:uid(), title:'The Making of the Atomic Bomb', author:'Richard Rhodes', status:'to-read'},
        {id:uid(), title:'Mere Christianity', author:'C.S. Lewis', status:'done'}
      ],
      stickyNotes: {},
      pinnedNotes: {},
      days,
      waterGoal: 8,
      counters: [{id:'water', name:'Water', unit:'glasses', goal:8, decimals:false}],
      weekdayChunks: { Sun:[], Mon:[{id:uid(),text:'Team standup'}], Tue:[], Wed:[], Thu:[], Fri:[{id:uid(),text:'Weekly report due'}], Sat:[] },
      finances: {
        categories: [
          {id:'f1', name:'Groceries', color:'#5980a6'},
          {id:'f2', name:'Rent', color:'#8aa8c4'},
          {id:'f3', name:'Transport', color:'#3d5f80'},
          {id:'f4', name:'Fun', color:'#a9c1d8'}
        ],
        transactions: [
          {id:uid(), catId:'f2', amount:1450, date: today},
          {id:uid(), catId:'f1', amount:340, date: today},
          {id:uid(), catId:'f3', amount:120, date: addDays(today,-3)},
          {id:uid(), catId:'f4', amount:80, date: addDays(today,-10)},
          {id:uid(), catId:'f1', amount:610, date: addDays(today,-20)}
        ],
        incomeStreams: [
          {id:uid(), name:'Drone job', amount:900},
          {id:uid(), name:'Overnight desk', amount:1600},
          {id:uid(), name:'TA job', amount:500}
        ],
        period: 'monthly'
      },
      body: {
        workoutProgram: {
          Mon: [{id:uid(), name:'Bench Press', sets:[{reps:'8',weight:'135'},{reps:'8',weight:'135'},{reps:'6',weight:'145'}]}],
          Tue: [{id:uid(), name:'Deadlift', sets:[{reps:'5',weight:'185'},{reps:'5',weight:'185'}]}],
          Wed: [{id:uid(), name:'Overhead Press', sets:[{reps:'8',weight:'75'}]}],
          Thu: [{id:uid(), name:'Squat', sets:[{reps:'5',weight:'165'},{reps:'5',weight:'175'}]}],
          Fri: [{id:uid(), name:'Pull-ups', sets:[{reps:'8',weight:'BW'}]}]
        },
        prEnabled: true,
        prLog: {
          'Bench Press': [{date: addDays(today,-20), weight:130},{date: addDays(today,-5), weight:135}],
          'Deadlift': [{date: addDays(today,-14), weight:175},{date: addDays(today,-2), weight:185}]
        }
      },
      curricula: {
        stem: [],
        bible: [
          {
            skill_name:'Pancakes', type:'hard',
            why:"A small, fully closed-loop skill — good proof that the system gives real depth even to something this ordinary.",
            intro_paragraph:"Pancakes look trivial but touch real technique: gluten development, leavening chemistry, and heat control. This course takes you from a written recipe to being able to produce a perfect batch from memory, adaptable on demand.",
            goals:["Produce consistently fluffy, evenly browned pancakes from scratch, no recipe needed","Understand the food science behind texture and rise","Adapt the base recipe on the fly for at least 3 variations"],
            mastery_definition:"5 consecutive from-scratch batches, no written recipe, evenly browned and fully risen, plus 3 successful variations.",
            modules:[
              {module_number:1, title:"Foundations & science", description:"History and the chemistry underneath the technique.",
                tree_nodes:[
                  {id:'history', title:'History & cultural variations', prerequisites:[], description:'Where pancakes come from across cultures — crepes, injera, blini — and how they diverged.', done:true},
                  {id:'science', title:'Leavening & gluten science', prerequisites:[], description:'Why overmixing toughens batter, how baking powder actually creates rise.', done:true}
                ],
                lessons:[], daily_drills:[{title:'Cook one batch strictly by the book', description:'Baseline before technique work starts.', resource_link:'', done:true}], projects:[]},
              {module_number:2, title:"Core technique", description:"Batter and heat, the two variables that make or break the result.",
                tree_nodes:[
                  {id:'batter-consistency', title:'Batter consistency & mixing method', prerequisites:['science'], description:'Lumpy-on-purpose mixing, resting time.', done:true},
                  {id:'heat-control', title:'Pan heat control & flip timing', prerequisites:['batter-consistency'], description:'Reading bubbles, edge-set, the flip window.', done:false}
                ],
                lessons:[], daily_drills:[{title:'Cook 3 test pancakes at 3 heat levels, compare', description:'', resource_link:'', done:false}],
                projects:[{title:'Milestone: dialed-in base recipe', description:'5 consecutive fluffy, even batches, no written recipe.', unlocks_after:'module 2 complete', done:false}]},
              {module_number:3, title:"Variation & mastery", description:"Taking the base recipe anywhere it needs to go.",
                tree_nodes:[
                  {id:'flavor-variation', title:'Flavor & mix-in variations', prerequisites:['heat-control'], description:'', done:false},
                  {id:'dietary-adapt', title:'Dietary adaptations', prerequisites:['heat-control'], description:'Gluten-free, vegan, high-altitude adjustments.', done:false}
                ],
                lessons:[], daily_drills:[], projects:[{title:'Capstone: pancake tasting', description:'Serve 3 variations to someone else, get real feedback.', unlocks_after:'module 3 complete', done:false}]}
            ],
            integration_reps:[{title:'Cook breakfast for someone using this skill', description:'Real stakes, real feedback.'}],
            resources:[{title:'Food-science explainer on leavening', url:'', cost:'free', note:'Add link when sourced'},{title:'A well-reviewed base recipe as the module 1 starting point', url:'', cost:'free', note:'Add link when sourced'}],
            progress_metric:'% of module nodes + drills + projects completed across all modules',
            status:'active', startDate: addDays(today,-18), notes:'', resources_links:[], notion_links:[]
          }
        ],
        civ: []
      },
      projects: [
        {id:uid(), type:'folder', name:'Personal', children:[
          {id:uid(), type:'entry', name:'Rebuild garage workbench', description:'Replace the old bench, add pegboard and better lighting.', status:'Future'}
        ]},
        {id:uid(), type:'folder', name:'Finance', children:[
          {id:uid(), type:'entry', name:'Automate monthly budget review', description:'Script or sheet that pulls transactions and flags overspend.', status:'In Progress', notionLink:'https://notion.so/example-budget-review'}
        ]},
        {id:uid(), type:'folder', name:'For others', children:[]}
      ]
    };
  }

  function blankData(){
    return {
      streak: 0, dailyRecurring: [], adHoc: [], weeklyTasks: [],
      chunks: { 'Wake Up': [], 'Morning': [], 'Afternoon': [], 'Evening': [], 'Night': [] },
      habits: [], journal: [], bookList: [], reminders: [],
      stickyNotes: {}, pinnedNotes: {}, days: {}, waterGoal: 8,
      counters: [{id:'water', name:'Water', unit:'glasses', goal:8, decimals:false}],
      weekdayChunks: {Sun:[],Mon:[],Tue:[],Wed:[],Thu:[],Fri:[],Sat:[]},
      finances: { categories: [], transactions: [], incomeStreams: [], period:'monthly', barPeriod:'month' },
      body: { workoutProgram: {Mon:[],Tue:[],Wed:[],Thu:[],Fri:[]}, prEnabled:false, prLog:{} },
      curricula: { stem: [], bible: [], civ: [] },
      projects: [],
      tabContent: { stem:{resources:[],blocks:[],notionLinks:[]}, bible:{resources:[],blocks:[],notionLinks:[]}, civ:{resources:[],blocks:[],notionLinks:[]}, dashboard:{blocks:[]} },
      settings: { darkMode:false }, scratchPad: '', customBlocks: [], customTabs: [], customSections: {}
    };
  }

  window.CommandUtils = { KJV_TOTAL_CHAPTERS, BIBLE_CATEGORIES, WEEKDAYS, FOCUS_MAP, CHUNK_NAMES, WORKOUT_DAYS, pad, dateKey, todayKey, uid, addDays, weekdayOf, sampleData, blankData };
})();
