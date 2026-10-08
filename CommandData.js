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
  const CHUNK_NAMES = ['Wake Up','Morning','Afternoon','Evening','Night'];
  const WORKOUT_DAYS = ['Mon','Tue','Wed','Thu','Fri'];
  // Fixed weekly Anchor/Micro/Daily study pattern, shown as a 3-row strip on the dashboard.
  // Each slot names the label shown and which tab it routes to when clicked; `daily` is a
  // list since weekdays carry two linked activities (German + its retention review).
  const WEEKLY_SCHEDULE_PATTERN = {
    Sun:{ anchor:{label:'Bible (protected)',tab:'bible'}, micro:null, daily:[{label:'German',tab:'german'}] },
    Mon:{ anchor:{label:'STEM',tab:'stem'}, micro:{label:'Bible',tab:'bible'}, daily:[{label:'German',tab:'german'},{label:'retention',tab:'retention'}] },
    Tue:{ anchor:{label:'Civ/Masc',tab:'civ'}, micro:{label:'STEM',tab:'stem'}, daily:[{label:'German',tab:'german'},{label:'retention',tab:'retention'}] },
    Wed:{ anchor:{label:'Bible',tab:'bible'}, micro:{label:'Civ/Masc',tab:'civ'}, daily:[{label:'German',tab:'german'},{label:'retention',tab:'retention'}] },
    Thu:{ anchor:{label:'STEM',tab:'stem'}, micro:{label:'Bible',tab:'bible'}, daily:[{label:'German',tab:'german'},{label:'retention',tab:'retention'}] },
    Fri:{ anchor:{label:'Civ/Masc',tab:'civ'}, micro:{label:'STEM',tab:'stem'}, daily:[{label:'German',tab:'german'},{label:'retention',tab:'retention'}] },
    Sat:{ anchor:{label:'3-domain project',tab:'projects'}, micro:null, daily:[{label:'German',tab:'german'}] }
  };

  function pad(n){ return n<10 ? '0'+n : ''+n; }
  function dateKey(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
  // "Today" rolls over at a configurable hour (default 6am), not midnight — set from
  // data.settings.dayStartHour via setDayStartHour() on load/change. Every todayKey() caller
  // across the app automatically picks this up since it's read at call time, not baked in.
  let dayStartHour = 6;
  function setDayStartHour(h){ dayStartHour = (h===undefined||h===null||isNaN(h)) ? 6 : Number(h); }
  function todayKey(){
    const now = new Date();
    if(now.getHours() < dayStartHour){ const d=new Date(now); d.setDate(d.getDate()-1); return dateKey(d); }
    return dateKey(now);
  }
  function uid(){ return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4); }
  function addDays(key,n){ const d=new Date(key+'T12:00:00'); d.setDate(d.getDate()+n); return dateKey(d); }
  function weekdayOf(key){ return WEEKDAYS[new Date(key+'T12:00:00').getDay()]; }


  function sampleData(){
    return blankData();
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

  window.CommandUtils = { KJV_TOTAL_CHAPTERS, BIBLE_CATEGORIES, WEEKDAYS, CHUNK_NAMES, WORKOUT_DAYS, WEEKLY_SCHEDULE_PATTERN, pad, dateKey, todayKey, uid, addDays, weekdayOf, sampleData, blankData, setDayStartHour };
})();
