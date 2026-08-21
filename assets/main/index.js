System.register("chunks:///_virtual/AchievementConfig.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"a91c0gIpBNF0qzgJD4cO0PA","AchievementConfig",void 0);var r=function(e,t,r,n){return void 0===n&&(n="bronze"),{id:e,name:t,description:"达成「"+t+"」人生节点。",icon:"◆",condition:r,rarity:n}};e("ACHIEVEMENTS",[r("scholar-985","学霸","flags.education-985","gold"),r("career-core","核心人物","career.level==core","gold"),r("wealth-first","第一桶金","stats.funds>=50","silver"),r("wealth-million","百万富翁","assets.total>=100","gold"),r("invest-first","初次尝鲜","flags.investment-practice"),r("industry-first","行业投资者","flags.industry-invested-online-retail-fulfillment","silver"),r("startup-founder","创业者","startup.stage==launch","silver"),r("unicorn","独角兽","startup.stage==expansion","gold"),r("home-owner","买房","assets.total>=1","silver"),r("warm-family","成家","relationships.partner>=70","silver"),r("time-traveler","时间旅行者","stats.informationValue>=90","gold"),r("all-rounder","全能者","skills.technology>=60","gold")].concat(Array.from({length:28},(function(e,t){return r("growth-"+(t+1),"成长里程碑 "+(t+1),"stats.knowledge>="+(20+2*t),t>20?"gold":t>10?"silver":"bronze")}))));t._RF.pop()}}}));

System.register("chunks:///_virtual/AchievementSystem.ts",["cc","./AchievementConfig.ts","./ConditionEvaluator.ts"],(function(n){var t,e,i;return{setters:[function(n){t=n.cclegacy},function(n){e=n.ACHIEVEMENTS},function(n){i=n.ConditionEvaluator}],execute:function(){t._RF.push({},"343c7AUpSlA97KtLGsLFXkg","AchievementSystem",void 0);n("AchievementSystem",function(){function n(){this.conditions=new i}return n.prototype.check=function(n){var t=this,i=e.filter((function(e){return!n.unlockedAchievementIds.includes(e.id)&&t.conditions.matches(n,e.condition)}));return i.forEach((function(t){n.unlockedAchievementIds.push(t.id)})),i},n}());t._RF.pop()}}}));

System.register("chunks:///_virtual/AssetSystem.ts",["cc"],(function(t){var e;return{setters:[function(t){e=t.cclegacy}],execute:function(){e._RF.push({},"9f9a8NEmwJLTY/CkpOWzuWB","AssetSystem",void 0);t("AssetSystem",function(){function t(){}return t.prototype.apply=function(t,e,n){var u=t.find((function(t){return t.type===e}));u?u.value=Math.max(0,u.value+n):t.push({type:e,value:Math.max(0,n)})},t}());e._RF.pop()}}}));

System.register("chunks:///_virtual/CareerPathEvents.ts",["cc"],(function(s){var e;return{setters:[function(s){e=s.cclegacy}],execute:function(){function a(s,e,a,l,t,i,n){return{id:"career-path-"+s+"-"+e,title:a,description:l,yearMin:t,yearMax:i,weight:82,interaction:"life-choice",prerequisites:["career.track=="+s],options:n}}e._RF.push({},"d8e3297k45A2KqAghBCQR2v","CareerPathEvents",void 0);s("CAREER_PATH_EVENTS",[a("technology","architecture","核心系统改造","团队要重写一套高并发系统。它能带来技术壁垒，也会占用大量生活时间。",2015,2028,[{id:"lead",label:"负责核心架构",result:{skills:{technology:8,management:2,information:2},stats:{pressure:7,health:-2},addFlags:["tech-core-system"]}},{id:"steady",label:"负责稳定交付",result:{skills:{technology:4},stats:{pressure:2,happiness:2}}}]),a("technology","transition","技术路线的转型","基础编码被自动化工具重塑，你需要在架构、智能系统和管理之间重新定位。",2029,2052,[{id:"ai",label:"转向智能系统架构",result:{skills:{technology:7,information:6},stats:{pressure:5},addFlags:["tech-ai-architect"]}},{id:"management",label:"转向技术管理",result:{skills:{management:7,expression:3},stats:{pressure:3},addFlags:["tech-manager"]}}]),a("product","growth","用户增长实验","产品团队需要在补贴拉新与改善留存之间分配预算，你能看到平台业务的真实数据。",2015,2028,[{id:"retention",label:"改善留存与付费",result:{skills:{management:5,business:5,information:4},stats:{pressure:4},addFlags:["product-retention-data"]}},{id:"subsidy",label:"短期补贴拉新",result:{stats:{funds:4,pressure:7},skills:{business:3},addFlags:["product-subsidy-growth"]}}]),a("product","platform","平台规则重构","市场成熟后，平台需要兼顾商户、用户与监管，单纯追求增长已经不够。",2029,2052,[{id:"ecosystem",label:"建立长期生态规则",result:{skills:{management:7,information:5},stats:{pressure:4},addFlags:["product-ecosystem"]}},{id:"revenue",label:"优先提高变现效率",result:{skills:{business:6},stats:{funds:8,pressure:6,happiness:-2}}}]),a("sales","key-account","关键客户订单","一笔大订单需要长期维护、议价和回款管理，收入上限高但波动明显。",2015,2028,[{id:"pursue",label:"投入三个月争取订单",result:{skills:{business:7,expression:4,information:2},stats:{funds:9,pressure:8},addFlags:["sales-key-account"]}},{id:"portfolio",label:"分散维护中小客户",result:{skills:{business:4,management:2},stats:{funds:4,pressure:3}}}]),a("sales","supply-chain","跨区域供应链调整","客户开始重组供应链。你比其他职业更早看到订单、库存和外贸需求变化。",2029,2052,[{id:"new-market",label:"开发新区域市场",result:{skills:{business:6,information:6,expression:3},stats:{pressure:6},addFlags:["sales-supply-signal"]}},{id:"existing",label:"保住现有客户",result:{stats:{funds:6,pressure:2},skills:{management:3}}}]),a("education","curriculum","课程与教学改革","新的课程体系需要一线教师试点，你可以积累研究成果或专注稳定教学。",2015,2028,[{id:"research",label:"参与课程研究",result:{skills:{learning:7,expression:4,information:3},stats:{knowledge:6,pressure:5},addFlags:["education-research"]}},{id:"classroom",label:"深耕课堂教学",result:{skills:{learning:4,expression:5},stats:{happiness:3,pressure:2}}}]),a("education","lifelong","终身学习项目","人口与职业结构变化带来成人再教育需求，你能从学习路径而非市场热词判断方向。",2029,2055,[{id:"build",label:"建设职业再教育课程",result:{skills:{learning:6,management:5,information:4},stats:{knowledge:5,pressure:4},addFlags:["education-lifelong-platform"]}},{id:"mentor",label:"专注个体指导",result:{relationships:{mentor:8},stats:{happiness:5},skills:{expression:4}}}]),a("media","channel","内容渠道迁移","用户注意力从图文转向短内容和直播，创作方式与商业模式同时变化。",2015,2028,[{id:"adapt",label:"建立新内容栏目",result:{skills:{expression:8,information:5,business:2},stats:{pressure:6},addFlags:["media-new-channel"]}},{id:"depth",label:"坚持深度内容",result:{skills:{expression:5,learning:3},stats:{funds:-2,happiness:3},addFlags:["media-depth"]}}]),a("media","synthetic","合成内容冲击","自动生成内容大量出现，可信度、人格化表达和版权变得比产量更重要。",2029,2052,[{id:"brand",label:"建立可信个人品牌",result:{skills:{expression:7,information:6,business:3},stats:{pressure:4},addFlags:["media-trusted-brand"]}},{id:"automation",label:"采用自动化生产",result:{skills:{technology:4,management:4},stats:{funds:5,happiness:-2}}}]),a("public-service","policy","公共项目试点","一项社区公共服务试点需要协调预算、居民需求与执行部门。",2015,2028,[{id:"field",label:"深入社区推动试点",result:{skills:{management:6,information:4,expression:3},stats:{pressure:5,familyBond:2},addFlags:["public-service-pilot"]}},{id:"procedure",label:"完善流程与合规",result:{skills:{management:4,learning:3},stats:{pressure:2}}}]),a("public-service","resilience","城市韧性规划","人口老龄化和极端天气改变了公共投入重点，你能较早接触公开规划信息。",2029,2055,[{id:"planning",label:"参与长期规划",result:{skills:{information:7,management:6,learning:2},stats:{pressure:4},addFlags:["public-resilience-plan"]}},{id:"operations",label:"保障日常服务",result:{skills:{management:4},stats:{happiness:3,pressure:1}}}])]);e._RF.pop()}}}));

System.register("chunks:///_virtual/CareerSystem.ts",["cc"],(function(e){var r;return{setters:[function(e){r=e.cclegacy}],execute:function(){r._RF.push({},"427053bGbhBMawZyp0u/sa2","CareerSystem",void 0);var t=["junior","middle","senior","core"],n={junior:0,middle:45,senior:60,core:75},o={junior:0,middle:2,senior:3,core:4};e("CareerSystem",function(){function e(){}var r=e.prototype;return r.promotionScore=function(e,r,t){var n="technology"===t?"technology":"media"===t?"expression":"sales"===t?"business":"product"===t?"management":"learning";return.4*e.intelligence+.4*r[n]+.2*e.execution},r.nextLevel=function(e){var r=t.indexOf(e);return r>=0&&r<t.length-1?t[r+1]:void 0},r.requirement=function(e){var r=this.nextLevel(e.career.level);return{next:r,score:this.promotionScore(e.attributes,e.skills,e.career.track),requiredScore:r?n[r]:100,years:e.career.yearsAtLevel,requiredYears:r?o[r]:0}},r.evaluateAnnual=function(e){if("unemployed"!==e.career.track){e.career.yearsAtLevel+=1;var r=this.requirement(e);if(!(!r.next||r.score<r.requiredScore||r.years<r.requiredYears)){e.career.level=r.next,e.career.yearsAtLevel=0,e.career.lastPromotionYear=e.year;var t="auto-promoted-"+r.next;return e.flags.includes(t)||e.flags.push(t),r.next}}},e}());r._RF.pop()}}}));

System.register("chunks:///_virtual/CitySystem.ts",["cc"],(function(t){var i;return{setters:[function(t){i=t.cclegacy}],execute:function(){i._RF.push({},"717d9K2ia1BfItqt2riEV7B","CitySystem",void 0);var o={rural:1.8,county:2.8,city:4.5,metropolis:7.2},r={rural:{transport:.3,deposit:.2,transition:.5},county:{transport:.5,deposit:.5,transition:1},city:{transport:.8,deposit:1,transition:2},metropolis:{transport:1.2,deposit:1.8,transition:4}};t("CitySystem",function(){function t(){}var i=t.prototype;return i.livingCost=function(t,i,r){void 0===i&&(i=2026),void 0===r&&(r=30);var n=i<=2026?Math.pow(.985,2026-i):Math.pow(1.012,i-2026),s=r>=65?2.5:r>=50?.8:0;return Math.round(10*(o[t]*n+s))/10},i.preview=function(t,i){var o=r[i],n={rural:0,county:1,city:2,metropolis:3},s=.25*Math.abs(n[i]-n[t.education.city]),a=Math.round(10*(o.transport+s))/10,e=Math.round(10*(a+o.deposit+o.transition))/10;return{target:i,transport:a,deposit:o.deposit,transition:o.transition,total:e,annualBefore:this.livingCost(t.education.city,t.year,t.age),annualAfter:this.livingCost(i,t.year,t.age)}},i.migrate=function(t,i){if(t.education.city===i)throw new Error("你已经在这类城市生活。");var o=this.preview(t,i);if(t.stats.funds<o.total)throw new Error("迁居共需 ¥"+(1e4*o.total).toLocaleString("zh-CN")+" 流动资金。");t.stats.funds-=o.total,t.education.city=i,t.stats.pressure=Math.min(100,t.stats.pressure+("metropolis"===i?5:2)),t.skills.information=Math.min(100,t.skills.information+("metropolis"===i?8:"city"===i?4:0)),"metropolis"!==i||t.flags.includes("metropolis-move")||t.flags.push("metropolis-move")},t}());i._RF.pop()}}}));

System.register("chunks:///_virtual/ConditionEvaluator.ts",["cc","./WealthSystem.ts"],(function(t){var e,r;return{setters:[function(t){e=t.cclegacy},function(t){r=t.totalAssetValue}],execute:function(){e._RF.push({},"9a337OPUlFNFoNma4+c+SMo","ConditionEvaluator",void 0);t("ConditionEvaluator",function(){function t(){}var e=t.prototype;return e.matchesAll=function(t,e){var r=this;return void 0===e&&(e=[]),e.every((function(e){return r.matches(t,e)}))},e.matches=function(t,e){if(e.startsWith("flags."))return t.flags.includes(e.slice(6));var u=e.match(/^(attributes|skills|stats|relationships|career|startup|assets|opportunities)\.([a-zA-Z]+)\s*(>=|<=|==|>|<)\s*(-?\d+|[a-z-]+)$/);if(!u)return!1;var n=u[1],s=u[2],a=u[3],i=u[4],o="assets"===n&&"total"===s?r(t):"opportunities"===n&&"entered"===s?t.opportunities.filter((function(t){return t.entered})).length:t[n][s],c=Number.isNaN(Number(i))?i:Number(i),l=o;switch(a){case">=":return Number(l)>=Number(c);case"<=":return Number(l)<=Number(c);case"==":return l===c;case">":return Number(l)>Number(c);case"<":return Number(l)<Number(c);default:return!1}},t}());e._RF.pop()}}}));

System.register("chunks:///_virtual/DelayedEventQueue.ts",["cc"],(function(e){var n;return{setters:[function(e){n=e.cclegacy}],execute:function(){n._RF.push({},"f4f0bM0SztNu5icy2E31XgB","DelayedEventQueue",void 0);e("DelayedEventQueue",function(){function e(){}var n=e.prototype;return n.schedule=function(e,n,t){e.delayedEvents.some((function(e){return e.eventId===n}))||e.delayedEvents.push({eventId:n,dueYear:t})},n.takeDue=function(e){var n=e.delayedEvents.findIndex((function(n){return n.dueYear<=e.year}));return n>=0?e.delayedEvents.splice(n,1)[0]:void 0},e}());n._RF.pop()}}}));

System.register("chunks:///_virtual/EducationEvents.ts",["cc","./EventTemplates.ts"],(function(e){var s,i,t;return{setters:[function(e){s=e.cclegacy},function(e){i=e.buildTemplateEvents,t=e.seedSeries}],execute:function(){s._RF.push({},"954baSOpeRBHq6AEiYjJVJy","EducationEvents",void 0);e("EDUCATION_EVENTS",[{id:"growth-study-routine",title:"第一次制定学习计划",description:"老师建议你把每天的时间分成学习、休息和兴趣三部分。",yearMin:2001,yearMax:2004,weight:75,options:[{id:"routine",label:"坚持执行学习计划",result:{education:{studyHabit:12,academicScore:4},skills:{learning:5},attributes:{execution:2},stats:{knowledge:7,pressure:6,happiness:-5},addFlags:["study-routine"]}},{id:"interest",label:"留出更多时间发展兴趣",result:{skills:{expression:3},attributes:{charm:2},stats:{knowledge:1,happiness:5,pressure:-2}}}]},{id:"growth-school-transfer",title:"转去更远的学校",description:"家人有机会让你去资源更好的学校，但也意味着离开熟悉的朋友。",yearMin:2004,yearMax:2006,weight:70,options:[{id:"transfer",label:"去新的学校",result:{education:{city:"city",academicScore:6},skills:{information:3},stats:{familyResources:-3,knowledge:4,pressure:3,happiness:-2},addFlags:["better-school"]}},{id:"stay",label:"留在现在的学校",result:{stats:{happiness:4,familyBond:2,pressure:-1},skills:{expression:2}}}]},{id:"education-middle-school",title:"初中的新开始",description:"小学毕业后进入初中，课程突然变难，你需要决定如何适应新的学习节奏。",yearMin:2004,yearMax:2004,weight:120,forced:!0,options:[{id:"focus-academic",label:"把重心放在学习上",result:{education:{level:"middle",studyHabit:8,academicScore:8},skills:{learning:6},stats:{knowledge:8,pressure:4,happiness:-2},addFlags:["middle-school"]}},{id:"balanced",label:"兼顾学习和活动",result:{education:{level:"middle",academicScore:3},skills:{expression:3,management:2},stats:{knowledge:3,pressure:-1,happiness:4},addFlags:["middle-school"]}}]},{id:"education-first-competition",title:"一次校外比赛",description:"学校推荐你参加一项比赛，可以是学科、演讲或电脑相关方向。",yearMin:2006,yearMax:2009,weight:70,prerequisites:["flags.middle-school"],options:[{id:"science",label:"报名学科与科技比赛",result:{skills:{learning:4,technology:4},education:{academicScore:4},stats:{knowledge:5,pressure:4,happiness:-2},addFlags:["science-competition"]}},{id:"speech",label:"报名演讲与社团比赛",result:{skills:{expression:5},attributes:{charm:3},stats:{knowledge:2,happiness:3,pressure:-1},addFlags:["speech-competition"]}}]},{id:"education-subject-direction",title:"中考与高中录取",description:"中考评估以平时成绩为主，也会计算学习技能、习惯、知识、智力与多年持续投入。",yearMin:2008,yearMax:2010,weight:100,forced:!0,options:[{id:"exam-result",label:"查看中考录取结果",result:{addFlags:["middle-school","high-school-placement"]}}]},{id:"education-part-time-work",title:"第一次兼职",description:"假期里，你可以尝试做一份短期工作，或者继续补足学习短板。",yearMin:2009,yearMax:2011,weight:65,options:[{id:"work",label:"做一份兼职",result:{stats:{funds:.3},skills:{business:3,expression:2},attributes:{execution:2},addFlags:["part-time-experience"]}},{id:"study",label:"集中准备升学",result:{education:{academicScore:7,studyHabit:3},skills:{learning:4},stats:{knowledge:7,pressure:6,happiness:-4}}}]},{id:"education-entrance-exam",title:"高考与大学录取",description:"高考沿用此前全部学习积累；高中轨道只改变学习环境，不会永久封死继续升学的可能。",yearMin:2010,yearMax:2012,weight:110,forced:!0,prerequisites:["flags.middle-school"],options:[{id:"admission-result",label:"查看大学录取结果",result:{stats:{pressure:3},addFlags:["college-admission"]}}]},{id:"education-major",title:"专业与方向",description:"专业会影响你的第一份工作，也会改变你看到的机会。",yearMin:2011,yearMax:2013,weight:100,forced:!0,prerequisites:["flags.university-entry"],options:[{id:"engineering",label:"计算机与工程",result:{education:{major:"engineering"},skills:{technology:8},addFlags:["major-engineering"]}},{id:"business",label:"商业与经济",result:{education:{major:"business"},skills:{business:7,information:2},addFlags:["major-business"]}},{id:"media",label:"人文与传媒",result:{education:{major:"media"},skills:{expression:7,information:2},addFlags:["major-media"]}}]},{id:"education-city-choice",title:"离开还是留下",description:"更大的城市有更多机会，也意味着更高成本和更陌生的生活。",yearMin:2011,yearMax:2014,weight:70,options:[{id:"metropolis",label:"去大城市发展",result:{education:{city:"metropolis"},skills:{information:4},stats:{pressure:4,familyResources:-3},addFlags:["metropolis-move"]}},{id:"local",label:"留在熟悉的城市",result:{education:{city:"city"},stats:{familyBond:4,happiness:2},addFlags:["local-development"]}}]},{id:"education-internship",title:"第一段实习",description:"一份实习机会出现，你可以优先考虑能力积累或稳定收入。",yearMin:2012,yearMax:2014,weight:90,options:[{id:"skill",label:"进入成长更快的团队",result:{skills:{technology:4,management:3},stats:{pressure:4},addFlags:["growth-internship"]}},{id:"income",label:"选择收入更稳定的岗位",result:{stats:{funds:12},skills:{business:3},addFlags:["stable-internship"]}}]}]),e("EDUCATION_CONTENT_EVENTS",i("education",[].concat(t("exam",2007,5,3),t("campus",2008,8,5),t("exam",2009,6,4),t("campus",2010,6,4),t("social",2010,3,4),t("skill",2010,8,4),t("intern",2011,4,3))));s._RF.pop()}}}));

System.register("chunks:///_virtual/EducationProgressionSystem.ts",["./EducationSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var EducationSystem_1, HIGH_SCHOOL_THRESHOLDS, UNIVERSITY_THRESHOLDS, EducationProgressionSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EducationSystem_1_1) {
                EducationSystem_1 = EducationSystem_1_1;
            }
        ],
        execute: function () {
            HIGH_SCHOOL_THRESHOLDS = { general: 45, key: 65 };
            UNIVERSITY_THRESHOLDS = { undergraduate: 48, 'first-tier': 60, '211': 70, '985': 76 };
            /** Converts childhood choices into transparent school placement and later salary potential. */
            EducationProgressionSystem = class EducationProgressionSystem {
                constructor() {
                    this.rules = new EducationSystem_1.EducationSystem();
                }
                /**
                 * Repairs saves created before school milestones became mandatory.
                 * New games still present the milestone events normally; this only prevents
                 * an older character from remaining in primary school after the proper age.
                 */
                repairMilestones(state) {
                    if (state.age >= 12 && state.education.level === 'primary') {
                        state.education.level = 'middle';
                        this.addFlag(state, 'middle-school');
                    }
                }
                learningIndex(state) {
                    return state.education.highSchoolTrack ? this.universityScore(state) : this.highSchoolScore(state);
                }
                resolveHighSchool(state) {
                    const score = this.highSchoolScore(state);
                    const track = score >= HIGH_SCHOOL_THRESHOLDS.key ? 'key' : score >= HIGH_SCHOOL_THRESHOLDS.general ? 'general' : 'vocational';
                    state.education.highSchoolTrack = track;
                    state.education.level = track === 'vocational' ? 'vocational' : 'high';
                    this.addFlag(state, `high-school-${track}`);
                    return track;
                }
                resolveUniversity(state) {
                    const score = this.universityScore(state);
                    const level = this.qualifiesFor985(state, score) ? '985'
                        : score >= UNIVERSITY_THRESHOLDS['211'] ? '211'
                            : score >= UNIVERSITY_THRESHOLDS['first-tier'] ? 'first-tier'
                                : score >= UNIVERSITY_THRESHOLDS.undergraduate ? 'undergraduate'
                                    : 'college';
                    state.education.level = level;
                    this.addFlag(state, 'university-entry');
                    this.addFlag(state, `education-${level}`);
                    return level;
                }
                highSchoolPreview(state) {
                    const score = this.highSchoolScore(state);
                    const result = score >= HIGH_SCHOOL_THRESHOLDS.key ? '重点高中' : score >= HIGH_SCHOOL_THRESHOLDS.general ? '普通高中' : '中专';
                    return `当前评估 ${score} 分 · 已投入学习 ${state.education.studyYears} 年 · 预计录取：${result}\n分数线：普高 ${HIGH_SCHOOL_THRESHOLDS.general} / 重点高中 ${HIGH_SCHOOL_THRESHOLDS.key}`;
                }
                universityPreview(state) {
                    const score = this.universityScore(state);
                    const result = this.qualifiesFor985(state, score) ? '985'
                        : score >= UNIVERSITY_THRESHOLDS['211'] ? '211'
                            : score >= UNIVERSITY_THRESHOLDS['first-tier'] ? '一本'
                                : score >= UNIVERSITY_THRESHOLDS.undergraduate ? '本科'
                                    : '专科';
                    const environment = this.highSchoolModifier(state) >= 0 ? `+${this.highSchoolModifier(state)}` : `${this.highSchoolModifier(state)}`;
                    return `当前评估 ${score} 分 · 高中环境修正 ${environment} · 预计录取：${result}\n分数线：本科 48 / 一本 60 / 211 70 / 985 76（需重点高中、学业成绩 ≥55、学习能力 ≥55）`;
                }
                highSchoolScore(state) {
                    return this.clampScore(this.baseAcademicScore(state) + this.commitmentBonus(state, 8));
                }
                universityScore(state) {
                    return this.clampScore(this.baseAcademicScore(state) + this.commitmentBonus(state, 10) + this.highSchoolModifier(state));
                }
                /** Academic performance leads; trainable qualities outweigh fixed intelligence. */
                baseAcademicScore(state) {
                    return this.rules.admissionScore(state.attributes, state.skills, state.education, state.stats.knowledge);
                }
                /** Long-term player intent matters, but cannot replace all academic preparation by itself. */
                commitmentBonus(state, expectedYears) {
                    return Math.min(12, Math.max(0, state.education.studyYears) / expectedYears * 12);
                }
                /** School track is an environment advantage/disadvantage, not an irreversible ceiling. */
                highSchoolModifier(state) {
                    return state.education.highSchoolTrack === 'key' ? 4 : state.education.highSchoolTrack === 'vocational' ? -6 : 0;
                }
                /** 985 requires both an exceptional exam result and a consistently strong academic record. */
                qualifiesFor985(state, score) {
                    return score >= UNIVERSITY_THRESHOLDS['985']
                        && state.education.highSchoolTrack === 'key'
                        && state.education.academicScore >= 55
                        && state.skills.learning >= 55;
                }
                clampScore(value) {
                    return Math.max(0, Math.min(100, Math.round(value)));
                }
                annualSalary(state) {
                    if (state.career.track === 'unemployed')
                        return 0;
                    // Unit: ten thousand RMB per year. Education improves the starting point, but does not
                    // turn a new graduate into a high-income earner before career progression has happened.
                    const base = {
                        primary: 3.6, middle: 4.2, vocational: 5.2, high: 4.8, college: 6,
                        undergraduate: 6.8, 'first-tier': 7.8, '211': 9, '985': 10.5, graduate: 9.8,
                    };
                    const trackMultiplier = state.career.track === 'technology' ? 1.1
                        : state.career.track === 'media' ? .88
                            : state.career.track === 'sales' ? .95
                                : state.career.track === 'education' ? .9 : 1;
                    const levelMultiplier = state.career.level === 'core' ? 2.5 : state.career.level === 'senior' ? 1.8 : state.career.level === 'middle' ? 1.35 : 1;
                    return Math.round(base[state.education.level] * trackMultiplier * levelMultiplier * 10) / 10;
                }
                applyGraduateSchool(state) {
                    if (state.education.level === 'graduate')
                        throw new Error('你已经完成研究生阶段。');
                    if (state.stats.funds < 8)
                        throw new Error('考研准备与学费至少需要 ¥80,000。');
                    state.stats.funds -= 8;
                    state.education.level = 'graduate';
                    state.stats.pressure = Math.min(100, state.stats.pressure + 7);
                    state.skills.learning = Math.min(100, state.skills.learning + 5);
                    this.addFlag(state, 'graduate-school');
                }
                applyCertificate(state, skill) {
                    if (state.stats.funds < 1.5)
                        throw new Error('考证报名与培训需要 ¥15,000。');
                    state.stats.funds -= 1.5;
                    state.skills[skill] = Math.min(100, state.skills[skill] + 5);
                    state.stats.pressure = Math.min(100, state.stats.pressure + 3);
                }
                applySelfStudy(state, skill) { state.skills[skill] = Math.min(100, state.skills[skill] + 3); state.stats.knowledge = Math.min(100, state.stats.knowledge + 2); state.stats.pressure = Math.min(100, state.stats.pressure + 2); }
                addFlag(state, flag) { if (!state.flags.includes(flag))
                    state.flags.push(flag); }
            };
            exports_1("EducationProgressionSystem", EducationProgressionSystem);
        }
    };
});

System.register("chunks:///_virtual/EducationSystem.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"21dc8IRn0FGX6xjynI4fDP3","EducationSystem",void 0);var n={primary:1,middle:2,high:3,vocational:3,college:4,undergraduate:5,"first-tier":6,211:7,985:8,graduate:9};e("EducationSystem",function(){function e(){}var t=e.prototype;return t.admissionScore=function(e,t,n,c){return void 0===c&&(c=0),.32*n.academicScore+.16*t.learning+.12*n.studyHabit+.12*c+.08*e.intelligence},t.canAdvance=function(e,t){return n[t]>=n[e.level]},e}());t._RF.pop()}}}));

System.register("chunks:///_virtual/EndingConfig.ts",["cc"],(function(e){var n;return{setters:[function(e){n=e.cclegacy}],execute:function(){n._RF.push({},"419b75ia/BHbZVkrHyLRCsB","EndingConfig",void 0);var s=function(e,n,s,t,i,a){return void 0===i&&(i="common"),void 0===a&&(a=0),{id:e,title:n,description:"你的人生最终呈现为「"+n+"」。每一次取舍都留下了无法替代的痕迹。",priority:s,conditions:t,scoreBonus:a,rarity:i,shareText:"这一局，我成为了"+n+"。"}};e("ENDINGS",[s("ending-happiness-collapse","被耗尽的心",110,["flags.happiness-collapse"],"common",-18),s("ending-cashflow-collapse","现金流断裂",99,["flags.cashflow-collapse"],"common",-15),s("ending-time-traveler","时间旅行者",100,["stats.informationValue>=90","stats.worldShift>=30"],"legendary",18),s("ending-investment-master","投资大师",95,["assets.total>=200","skills.information>=70"],"rare",16),s("ending-startup-legend","创业传奇",90,["startup.stage==expansion","assets.total>=300"],"rare",16),s("ending-health-collapse","被透支的身体",85,["stats.health<=20"],"common",-12),s("ending-warm-home","被爱包围的人生",80,["relationships.partner>=70","stats.happiness>=70"],"common",12),s("ending-career-peak","行业里的重要角色",75,["career.level==core"],"common",10),s("ending-financial-freedom","财务自由",70,["assets.total>=200","stats.health>=50"],"common",10),s("ending-family-anchor","家人的依靠",34,["stats.familyBond>=75"],"common",8),s("ending-tech-pioneer","技术先锋",60,["skills.technology>=70"],"common",8),s("ending-content-creator","内容创作者",55,["skills.expression>=60","flags.content-entry"],"common",6),s("ending-lonely-peak","高处不胜寒",50,["career.level==core","relationships.partner<30","stats.happiness<40"],"rare",2),s("ending-cashflow-master","稳健的积累者",45,["assets.total>=120"],"common",5),s("ending-healthy-longlife","从容的长跑者",44,["stats.health>=80","stats.happiness>=65"]),s("ending-lifelong-learner","终身学习者",42,["stats.knowledge>=85"]),s("ending-city-builder","城市新居民",41,["flags.metropolis-move","skills.information>=55"]),s("ending-family-business","家业的新篇",40,["flags.family-business-experience","skills.business>=60"]),s("ending-resilient","愈挫愈勇",39,["flags.venture-loss","stats.happiness>=55"]),s("ending-opportunity-hunter","时代的捕手",38,["opportunities.entered>=3"]),s("ending-second-act","人生下半场",37,["stats.worldShift>=20","skills.management>=60"],"rare"),s("ending-community-mentor","照亮后来者的人",36,["relationships.mentor>=60"]),s("ending-balanced-life","平衡的生活家",35,["stats.health>=60","stats.happiness>=60","stats.familyBond>=60"]),s("ending-regret","遗憾的人生",25,["stats.happiness<30","stats.health<40"]),s("ending-drifter","随波逐流",20,["opportunities.entered==0","skills.information<25"]),s("ending-ordinary-brave","认真生活的人",0,[])]);n._RF.pop()}}}));

System.register("chunks:///_virtual/EndingResolver.ts",["cc","./EndingConfig.ts","./ConditionEvaluator.ts","./WealthSystem.ts"],(function(t){var n,e,i,r;return{setters:[function(t){n=t.cclegacy},function(t){e=t.ENDINGS},function(t){i=t.ConditionEvaluator},function(t){r=t.totalAssetValue}],execute:function(){n._RF.push({},"6e1c0o+RaVM3p6J4PzT//Kw","EndingResolver",void 0);t("EndingResolver",function(){function t(){this.conditions=new i}return t.prototype.resolve=function(t){var n,i=this,o=null!=(n=[].concat(e).sort((function(t,n){return n.priority-t.priority})).find((function(n){return i.conditions.matchesAll(t,n.conditions)})))?n:e[e.length-1],s=r(t),a="core"===t.career.level?90:"senior"===t.career.level?75:"middle"===t.career.level?60:40,c=Math.max(0,Math.min(100,Math.round(.12*Math.min(100,t.stats.funds+s)+.12*a+.15*t.stats.health+.18*t.stats.happiness+.13*t.stats.familyBond+.08*Math.max(t.relationships.partner,t.relationships.friend)+.07*t.stats.informationValue+Math.min(20,3*t.opportunities.filter((function(t){return t.entered})).length)+Math.min(10,.1*t.stats.knowledge)+o.scoreBonus)));return{id:o.id,title:o.title,description:o.description,score:c,rarity:o.rarity,shareText:o.shareText}},t}());n._RF.pop()}}}));

System.register("chunks:///_virtual/EventMatcher.ts",["./rollupPluginModLoBabelHelpers.js","cc","./ConditionEvaluator.ts"],(function(e){var t,n,r;return{setters:[function(e){t=e.createForOfIteratorHelperLoose},function(e){n=e.cclegacy},function(e){r=e.ConditionEvaluator}],execute:function(){n._RF.push({},"0e507DzKfZGB5yQmgdUXZs1","EventMatcher",void 0);e("EventMatcher",function(){function e(e){void 0===e&&(e=new r),this.conditions=e}var n=e.prototype;return n.pick=function(e,n,r){var i=this,o=n.filter((function(t){return i.isEligible(e,t)}));if(0!==o.length){var u=o.find((function(e){return e.forced}));if(u)return u;for(var c,a=o.reduce((function(e,t){return e+t.weight}),0),s=r.next()*a,l=t(o);!(c=l()).done;){var f=c.value;if((s-=f.weight)<=0)return f}return o[o.length-1]}},n.isEligible=function(e,t){return(t.repeatable||!e.triggeredEventIds.includes(t.id))&&e.year>=t.yearMin&&e.year<=t.yearMax&&this.conditions.matchesAll(e,t.prerequisites)},e}());n._RF.pop()}}}));

System.register("chunks:///_virtual/EventTemplates.ts",["cc"],(function(s){var e;return{setters:[function(s){e=s.cclegacy}],execute:function(){s({buildTemplateEvents:function(s,e){var t=new Map;return e.map((function(e){var a,l,r=(null!=(a=t.get(e.theme+"-"+e.year))?a:0)+1;t.set(e.theme+"-"+e.year,r);var i={computer:[{label:"投入时间研究",result:{skills:{technology:4,information:3},stats:{knowledge:4,pressure:3,happiness:-2},addFlags:["computer-intro"]}},{label:"把时间留给朋友",result:{relationships:{friend:3},stats:{happiness:4,pressure:-2}}}],reading:[{label:"坚持深度学习",result:{skills:{learning:4},education:{academicScore:3,studyHabit:2},stats:{knowledge:5,pressure:3,happiness:-2},addFlags:["reading-habit"]}},{label:"按自己的节奏来",result:{attributes:{charm:2},stats:{happiness:4,pressure:-2}}}],family:[{label:"承担家庭责任",result:{skills:{business:3,expression:2},stats:{familyBond:4,pressure:3,happiness:-1},addFlags:["family-business-experience"]}},{label:"守住自己的安排",result:{skills:{learning:3},stats:{knowledge:3,pressure:2,happiness:-1}}}],social:[{label:"和朋友共度时间",result:{relationships:{friend:4},stats:{happiness:3,pressure:-1},skills:{expression:2},addFlags:["social-circle"]}},{label:"优先独处成长",result:{skills:{learning:3,information:2},stats:{knowledge:3,pressure:2,happiness:-1}}}],hobby:[{label:"系统训练特长",result:{skills:{expression:4},attributes:{execution:2},stats:{happiness:2,pressure:3},addFlags:["childhood-specialty"]}},{label:"保持轻松爱好",result:{attributes:{constitution:2,charm:2},stats:{happiness:4,pressure:-2}}}],era:[{label:"记录时代变化",result:{skills:{information:4},stats:{informationValue:3,knowledge:2,pressure:2},addFlags:["era-observer"]}},{label:"不被消息打扰",result:{stats:{happiness:3,pressure:-2}}}],health:[{label:"建立运动习惯",result:{attributes:{constitution:3},stats:{health:4,pressure:-2,happiness:1},addFlags:["health-routine"]}},{label:"把精力放在别处",result:{skills:{learning:3},stats:{knowledge:3,pressure:2,health:-1}}}],exam:[{label:"高强度备考",result:{education:{academicScore:5,studyHabit:2},skills:{learning:3},stats:{knowledge:4,pressure:5,happiness:-3}}},{label:"维持稳定节奏",result:{education:{academicScore:2},stats:{health:2,happiness:3,pressure:-2}}}],campus:[{label:"争取更多舞台",result:{skills:{expression:3,management:2},stats:{pressure:3,happiness:1}}},{label:"专注课程基础",result:{skills:{learning:4},stats:{knowledge:4,pressure:3,happiness:-1}}}],skill:[{label:"专项强化训练",result:{skills:{technology:3,information:2},stats:{knowledge:4,pressure:3,happiness:-2},addFlags:["skill-builder"]}},{label:"保留生活空间",result:{attributes:{charm:2},stats:{happiness:4,pressure:-2}}}],intern:[{label:"选择成长更快的岗位",result:{skills:{technology:3,management:2},stats:{pressure:4,happiness:-2},addFlags:["internship-experience"]}},{label:"选择稳定收入",result:{stats:{funds:3,pressure:1},skills:{business:2}}}],career:[{label:"接受挑战",result:{skills:{management:3},attributes:{execution:2},stats:{funds:5,pressure:5,health:-1}}},{label:"维持可持续节奏",result:{stats:{health:2,happiness:3,pressure:-3},skills:{information:1}}}],startup:[{label:"投入项目试错",result:{stats:{funds:-10,pressure:6},skills:{business:4,management:2},addFlags:["startup-experience"]}},{label:"继续积累筹码",result:{stats:{funds:4,pressure:-1},skills:{information:2}}}],investment:[{label:"研究后小额配置",result:{stats:{funds:-6,pressure:2},skills:{business:3,information:3},addFlags:["investment-practice"]}},{label:"保留流动现金",result:{stats:{funds:2,happiness:1,pressure:-1}}}],housing:[{label:"为长期居住投入",result:{stats:{funds:-12,pressure:4,happiness:2},assetChanges:[{type:"housing",amount:12}],addFlags:["housing-planner"]}},{label:"保留迁移弹性",result:{stats:{funds:3,happiness:2,pressure:-1}}}],relationship:[{label:"认真经营关系",result:{relationships:{partner:4},stats:{funds:-2,happiness:4,pressure:-1},addFlags:["relationship-invested"]}},{label:"把重心留给事业",result:{skills:{management:2},stats:{pressure:2}}}],care:[{label:"投入照护时间",result:{relationships:{father:3,mother:3},stats:{familyBond:4,happiness:2,funds:-3,pressure:-1}}},{label:"提供资源支持",result:{stats:{familyBond:2,funds:-6,pressure:2}}}],reflection:[{label:"重新调整优先级",result:{stats:{happiness:3,pressure:-3,health:2},skills:{information:2}}},{label:"继续追逐目标",result:{stats:{funds:4,pressure:4,health:-1},attributes:{execution:2}}}],opportunity:[{label:"提前布局",result:{skills:{information:4,business:2},stats:{informationValue:3,pressure:3},addFlags:["opportunity-scout"]}},{label:"暂时观望",result:{stats:{happiness:2,pressure:-1},skills:{information:1}}}]}[e.theme],n=i[0],u=i[1];return{id:s+"-"+e.theme+"-"+e.year+"-"+String(r).padStart(2,"0"),title:e.title,description:e.description,yearMin:e.year,yearMax:e.year+1,weight:null!=(l=e.weight)?l:70,prerequisites:e.prerequisites,repeatable:e.repeatable,options:[{id:"focus",label:n.label,result:n.result},{id:"balance",label:u.label,result:u.result}]}}))},seedSeries:function(s,e,a,l,r,i){void 0===i&&(i=!1);var n=t[s],u=n[0],p=n[1];return Array.from({length:a},(function(t,a){return{theme:s,year:e+a%l,title:u+" · "+(a+1),description:p,prerequisites:r,weight:50+a%6*10,repeatable:i}}))}}),e._RF.push({},"0877bxUFJlAQaigNb6/bYMh","EventTemplates",void 0);var t={computer:["电脑前的新问题","一项新工具来到身边。投入探索会得到能力，也会占用原本轻松的时间。"],reading:["书页里的岔路","阅读、练习和玩耍都在争夺你有限的课后时间。"],family:["家庭小店的周末排班","家人正在协调周末小店的人手。帮忙会获得零用钱和商业经验，留在学校则能继续学习。"],social:["同学间的邀请","关系需要主动维护，但每一次投入都有机会成本。"],hobby:["兴趣的坚持","特长训练带来舞台，也意味着更少的自由时间。"],era:["时代的新消息","观察变化可能积累信息优势，也可能让你感到焦虑。"],health:["身体的提醒","健康习惯不会立刻带来回报，却会改变之后的承受力。"],exam:["考试前的选择","冲刺能换来分数，稳定节奏则保留了身心状态。"],campus:["校园里的机会","社团和课程都能塑造未来，但无法同时做到最好。"],skill:["能力补强计划","专门训练会带来能力，也会增加压力。"],intern:["实习岗位的取舍","成长速度与眼前收入之间，需要你做一次选择。"],career:["职业路径的分岔","承担更大责任会更快成长，也会让生活变得更紧绷。"],startup:["创业念头浮现","项目需要资金与精力，稳定积累同样是一条可走的路。"],investment:["资产配置的讨论","投资需要承担波动，保留现金则意味着放弃一部分可能。"],housing:["居住安排重估","房子提供确定性，也可能限制你之后的迁移自由。"],relationship:["关系的考验","认真投入能收获陪伴，也可能推迟其他人生目标。"],care:["照护与责任","家人需要你的时间或资源，两种支持都有代价。"],reflection:["人生阶段复盘","放慢脚步能找回自己，坚持目标也可能带来新的高度。"],opportunity:["一条具体的行业线索","线索会给出行业、窗口期、所需本金与风险；只有在时机合适时投入才可能形成回报。"]};e._RF.pop()}}}));

System.register("chunks:///_virtual/ExplorationConfig.ts",["cc"],(function(i){var e;return{setters:[function(i){e=i.cclegacy}],execute:function(){e._RF.push({},"206c35N1pRNTY+bglt6bxYr","ExplorationConfig",void 0);i("EXPLORATION_ACTIONS",[{id:"market",domain:"market",name:"交易所",description:"研究公开行情、线索与持仓，主动进行买卖。",prerequisites:[]},{id:"industry",domain:"industry",name:"行业项目",description:"查看已经投入的具体行业、当前估值与退出结果。",prerequisites:["stats.funds>=5"]},{id:"startup",domain:"startup",name:"创业孵化器",description:"组建具体项目，并承担持续经营成本。",prerequisites:["skills.business>=20","attributes.execution>=20"]},{id:"education",domain:"education",name:"教育与进修",description:"未来用于选择学校、专业、证书与研究机会。",prerequisites:["skills.learning>=15"]},{id:"city",domain:"city",name:"城市迁移",description:"未来用于迁居、寻找城市红利与承受生活成本。",prerequisites:["stats.funds>=10"]},{id:"housing",domain:"housing",name:"房产市场",description:"未来用于租住、购房与持有周期决策。",prerequisites:["stats.funds>=25"]}]);e._RF.pop()}}}));

System.register("chunks:///_virtual/FamilyOpportunityEvents.ts",["cc"],(function(e){var i;return{setters:[function(e){i=e.cclegacy}],execute:function(){i._RF.push({},"ad9c7Fu1HBCOot5jCefwx9t","FamilyOpportunityEvents",void 0);e("FAMILY_OPPORTUNITY_EVENTS",[{id:"family-info-rural-network",title:"同乡带来的城市消息",description:"外出务工的亲戚说，沿海工厂、建筑和物流岗位正在增加。工资更高，但迁移、住宿和技能门槛同样真实。",yearMin:2001,yearMax:2003,weight:100,forced:!0,informational:!0,prerequisites:["flags.family-rural"],options:[{id:"ack",label:"记下这条信息",result:{signalIds:["signal-city-resource"],skills:{information:2},addFlags:["family-signal-labor-migration"]}}]},{id:"family-info-small-town",title:"县城正在慢慢变化",description:"新学校、连锁门店和生活服务陆续进入县城。机会比大城市少，却更容易从熟人和本地需求中看清。",yearMin:2002,yearMax:2004,weight:100,forced:!0,informational:!0,prerequisites:["flags.family-small-town"],options:[{id:"ack",label:"记下这条信息",result:{signalIds:["signal-city-resource"],skills:{information:2},addFlags:["family-signal-local-service"]}}]},{id:"family-info-county-shop",title:"小店账本里的变化",description:"父母发现顾客开始询问外地商品，进货渠道和运输速度正在影响生意。稳定货源可能比门面大小更重要。",yearMin:2002,yearMax:2004,weight:100,forced:!0,informational:!0,prerequisites:["flags.family-county-business"],options:[{id:"ack",label:"一起看看账本",result:{signalIds:["signal-ecommerce-orders"],skills:{business:2,information:2},addFlags:["family-signal-shop-supply"]}}]},{id:"family-info-metro-office",title:"父母单位里的新岗位",description:"办公电脑和企业网站逐渐普及，单位开始需要懂软件、网络和运营的人。城市里的岗位变化比新闻更早来到身边。",yearMin:2001,yearMax:2003,weight:100,forced:!0,informational:!0,prerequisites:["flags.family-metro-salaried"],options:[{id:"ack",label:"记下岗位变化",result:{signalIds:["signal-pc-home"],skills:{technology:2,information:3},addFlags:["family-signal-corporate-tech"]}}]},{id:"family-info-scholar-table",title:"书桌上的产业讨论",description:"父母和朋友谈到计算机、通信和高校专业的变化。技术方向尚未成熟，但相关人才会越来越重要。",yearMin:2001,yearMax:2003,weight:100,forced:!0,informational:!0,prerequisites:["flags.family-scholar"],options:[{id:"ack",label:"把讨论写进笔记",result:{signalIds:["signal-pc-home"],skills:{learning:2,information:3},stats:{knowledge:2},addFlags:["family-signal-academic-tech"]}}]},{id:"family-info-wealthy-supply",title:"饭桌上的供应链消息",description:"父母的客户正在寻找新的销售渠道，也有人准备扩大仓储和运输。你比多数同龄人更早听见了生意变化。",yearMin:2001,yearMax:2003,weight:100,forced:!0,informational:!0,prerequisites:["flags.family-wealthy-business"],options:[{id:"ack",label:"整理客户与渠道信息",result:{signalIds:["signal-ecommerce-orders"],skills:{business:3,information:3},addFlags:["family-signal-supply-chain"]}}]},{id:"family-route-rural-skill",title:"同乡介绍的技能岗位",description:"亲戚可以帮你了解城市里的技术岗位，但家庭只能承担有限的培训和迁移成本。",yearMin:2006,yearMax:2009,weight:120,forced:!0,prerequisites:["flags.family-rural"],options:[{id:"train",label:"争取技能培训与迁移准备",result:{stats:{familyResources:-3,pressure:3},skills:{technology:5,information:3},attributes:{execution:2},opportunity:{chainId:"urban-development",stage:"growth",entered:!0},addFlags:["family-route-skilled-migration"]}},{id:"stay",label:"暂时留在本地完成学业",result:{skills:{learning:4},stats:{familyBond:3,happiness:2},opportunity:{chainId:"urban-development",stage:"growth",entered:!1}}}]},{id:"family-route-small-town-choice",title:"本地发展还是准备离开",description:"县城服务业正在增加，重点学校和大城市教育也提供另一条路。家庭可以支持一次明确选择。",yearMin:2006,yearMax:2009,weight:120,forced:!0,prerequisites:["flags.family-small-town"],options:[{id:"education",label:"把资源投入教育和升学",result:{stats:{familyResources:-3,pressure:2},education:{studyHabit:5,academicScore:5},skills:{learning:4},addFlags:["family-route-education-mobility"]}},{id:"local",label:"了解本地门店与生活服务",result:{skills:{business:4,expression:3,information:2},stats:{familyBond:2},opportunity:{chainId:"urban-development",stage:"growth",entered:!0},addFlags:["family-route-local-service"]}}]},{id:"family-route-county-online",title:"给家庭小店增加线上渠道",description:"现有货源可以降低试错成本，但拍摄、客服、包装和配送都需要重新学习。",yearMin:2006,yearMax:2009,weight:120,forced:!0,prerequisites:["flags.family-county-business","stats.familyResources>=5"],options:[{id:"trial",label:"拿出部分家庭资源试卖",result:{stats:{familyResources:-5,pressure:3},skills:{business:6,management:3,information:3},opportunity:{chainId:"ecommerce",stage:"growth",entered:!0},addFlags:["family-business-online-trial","family-business-experience"]}},{id:"supply",label:"先整理库存和供应商",result:{skills:{business:4,management:3},stats:{familyBond:3},opportunity:{chainId:"ecommerce",stage:"emergence",entered:!1}}}]},{id:"family-route-metro-internship",title:"城市企业的体验岗位",description:"父母的同事可以介绍一次正规的企业体验。它不会直接带来财富，却能让你更早理解技术和产品岗位。",yearMin:2006,yearMax:2009,weight:120,forced:!0,prerequisites:["flags.family-metro-salaried"],options:[{id:"join",label:"参加企业体验",result:{skills:{technology:4,information:5,expression:2},stats:{pressure:2},opportunity:{chainId:"pc-internet",stage:"growth",entered:!0},addFlags:["family-corporate-internship"]}},{id:"study",label:"把时间留给升学准备",result:{education:{studyHabit:4,academicScore:5},skills:{learning:4},opportunity:{chainId:"pc-internet",stage:"growth",entered:!1}}}]},{id:"family-route-scholar-lab",title:"高校实验室的开放日",description:"父母可以带你接触高校教师和实验室。你能更早看见专业方向，但成果转化仍需要漫长积累。",yearMin:2006,yearMax:2009,weight:120,forced:!0,prerequisites:["flags.family-scholar"],options:[{id:"research",label:"跟随老师做一次小课题",result:{skills:{learning:5,technology:4,information:3},stats:{knowledge:5,pressure:3},relationships:{mentor:8},opportunity:{chainId:"education-life",stage:"growth",entered:!0},addFlags:["family-academic-mentor"]}},{id:"broad",label:"先保持广泛阅读",result:{skills:{learning:4,expression:2},stats:{knowledge:4,happiness:2},opportunity:{chainId:"education-life",stage:"growth",entered:!1}}}]},{id:"family-route-wealthy-channel",title:"家族企业准备试验新渠道",description:"家庭可以承担一次明显高于普通家庭的试验，并直接提供供应商、仓储和客户资源。你的建议仍需要父母认可。",yearMin:2006,yearMax:2009,weight:120,forced:!0,prerequisites:["flags.family-wealthy-business","stats.familyResources>=8"],options:[{id:"launch",label:"推动线上渠道试点",result:{stats:{familyResources:-8,pressure:2},skills:{business:7,management:5,information:5},opportunity:{chainId:"ecommerce",stage:"growth",entered:!0},addFlags:["family-enterprise-channel","family-business-experience"]}},{id:"research",label:"先请团队做市场调查",result:{stats:{familyResources:-2},skills:{information:6,business:3},opportunity:{chainId:"ecommerce",stage:"emergence",entered:!1}}},{id:"decline",label:"不动用家庭企业",result:{stats:{familyBond:2,happiness:2}}}]}]);i._RF.pop()}}}));

System.register("chunks:///_virtual/FamilyUnlockManager.ts",["cc","./IdentityConfig.ts","./WealthSystem.ts"],(function(e){var n,t,r,i;return{setters:[function(e){n=e.cclegacy,t=e.sys},function(e){r=e.IDENTITIES},function(e){i=e.totalAssetValue}],execute:function(){n._RF.push({},"5bb425WjT5LYqW1kSNHMoMf","FamilyUnlockManager",void 0);var a="restart-life.family-unlocks.v1",o={junior:0,middle:1,senior:2,core:3};e("FamilyUnlockManager",function(){function e(){}var n=e.prototype;return n.unlockedIds=function(){var e=["migrant-rural","small-town"],n=t.localStorage.getItem(a);if(!n)return e;try{var i=JSON.parse(n);return[].concat(new Set([].concat(e,i.filter((function(e){return r.some((function(n){return n.id===e}))})))))}catch(n){return e}},n.isUnlocked=function(e){return this.unlockedIds().includes(e)},n.statuses=function(){var e=new Set(this.unlockedIds());return r.map((function(n){return{identity:n,unlocked:e.has(n.id),requirement:n.unlockDescription}}))},n.evaluate=function(e){var n,r=new Set(this.unlockedIds()),u=new Set(r),c=i(e),l=e.opportunities.filter((function(e){return e.entered})).length+e.industryProjects.filter((function(e){return"failed"!==e.status})).length,s=o[e.career.level];e.skills.business>=45&&c>=30&&u.add("county-business"),"metropolis"===e.education.city&&s>=o.senior&&u.add("metro-salaried"),("985"===e.education.level||"graduate"===e.education.level||e.stats.knowledge>=85&&e.skills.learning>=70)&&u.add("scholar-family"),("ending-startup-legend"===(null==(n=e.ending)?void 0:n.id)||e.skills.business>=70&&c>=200&&l>=3&&e.finance.loanBalance<=20)&&u.add("wealthy-business");var d=[].concat(u).filter((function(e){return!r.has(e)}));return d.length>0&&t.localStorage.setItem(a,JSON.stringify([].concat(u))),d},e}());n._RF.pop()}}}));

System.register("chunks:///_virtual/FinanceSystem.ts",["./EducationProgressionSystem.ts", "./CitySystem.ts"], function (exports_1, context_1) {
    "use strict";
    var EducationProgressionSystem_1, CitySystem_1, FinanceSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EducationProgressionSystem_1_1) {
                EducationProgressionSystem_1 = EducationProgressionSystem_1_1;
            },
            function (CitySystem_1_1) {
                CitySystem_1 = CitySystem_1_1;
            }
        ],
        execute: function () {
            /** Annual cashflow, non-negative cash, and loans backed by sustainable income. */
            FinanceSystem = class FinanceSystem {
                constructor() {
                    this.education = new EducationProgressionSystem_1.EducationProgressionSystem();
                    this.cities = new CitySystem_1.CitySystem();
                }
                refresh(state) {
                    const baseSalary = this.education.annualSalary(state);
                    // Poor health reduces attendance, stamina and performance, making pressure a real financial risk.
                    const healthMultiplier = state.stats.health >= 80 ? 1 : state.stats.health >= 60 ? .9 : state.stats.health >= 40 ? .7 : state.stats.health >= 20 ? .45 : .2;
                    const focusMultiplier = state.career.track === 'unemployed' ? 1 : this.focusIncomeMultiplier(state.lifeFocus);
                    const intensityMultiplier = { relaxed: .9, normal: 1, hard: 1.12 }[state.career.workIntensity];
                    const skillIncome = this.skillIncomeBonus(state);
                    const retirementMultiplier = state.age < 65 ? 1
                        : state.flags.includes('second-career-consulting') || state.flags.includes('second-career-teaching') ? .65
                            : state.flags.includes('retirement-active') ? .55 : .4;
                    state.finance.salaryAnnual = Math.round((baseSalary * healthMultiplier * focusMultiplier * intensityMultiplier + skillIncome) * retirementMultiplier * 10) / 10;
                    state.finance.livingCostAnnual = state.age < 18 ? 0 : this.cities.livingCost(state.education.city, state.year, state.age);
                    state.finance.loanLimit = this.hasHealthyCashflow(state) ? state.finance.salaryAnnual * 2 : 0;
                }
                settleYear(state) {
                    this.refresh(state);
                    const openingCash = state.stats.funds;
                    const focusIncome = this.sideIncomeAnnual(state);
                    const focusExpense = this.focusExpenseAnnual(state);
                    if (state.age < 18) {
                        const otherIncome = state.finance.familyAllowanceAnnual + focusIncome;
                        state.stats.funds = Math.max(0, state.stats.funds + otherIncome - focusExpense);
                        state.finance.lastCashflow = otherIncome - focusExpense;
                        this.record(state, openingCash, 0, otherIncome, focusExpense, 0);
                        return;
                    }
                    // Before formal employment, university living costs are borne by the family.
                    // The original family allowance remains the student's personal disposable money.
                    if (state.career.track === 'unemployed' && state.age < 23) {
                        const otherIncome = state.finance.familyAllowanceAnnual + focusIncome;
                        state.stats.funds = Math.max(0, state.stats.funds + otherIncome - focusExpense);
                        state.finance.lastCashflow = otherIncome - focusExpense;
                        this.record(state, openingCash, 0, otherIncome, focusExpense, 0);
                        return;
                    }
                    const interest = Math.ceil(state.finance.loanBalance * 0.05 * 10) / 10;
                    const cashflow = state.finance.salaryAnnual + focusIncome - state.finance.livingCostAnnual - focusExpense - interest;
                    state.stats.funds = Math.max(0, state.stats.funds + cashflow);
                    state.finance.lastCashflow = cashflow;
                    this.record(state, openingCash, state.finance.salaryAnnual, focusIncome, state.finance.livingCostAnnual + focusExpense, interest);
                }
                takeLoan(state, amount) {
                    this.refresh(state);
                    if (!this.hasHealthyCashflow(state))
                        throw new Error('当前现金流不稳定，暂不具备贷款条件。');
                    if (!Number.isInteger(amount) || amount <= 0 || state.finance.loanBalance + amount > state.finance.loanLimit)
                        throw new Error('超过可用贷款额度。');
                    state.finance.loanBalance += amount;
                    state.stats.funds += amount;
                }
                repayLoan(state, amount) {
                    if (!Number.isInteger(amount) || amount <= 0 || amount > state.finance.loanBalance)
                        throw new Error('还款金额无效。');
                    if (state.stats.funds < amount)
                        throw new Error('现金不足，无法还款。');
                    state.stats.funds -= amount;
                    state.finance.loanBalance -= amount;
                    this.refresh(state);
                }
                hasHealthyCashflow(state) { return state.finance.salaryAnnual > state.finance.livingCostAnnual * 1.25; }
                focusIncomeMultiplier(focus) {
                    // Annual focus changes bonuses and attendance, not the employee's entire pay grade.
                    return { study: .92, work: 1.1, rest: .82, social: .9 }[focus];
                }
                /** Part-time/practical work is settled as income so it remains visible in the annual cashflow ledger. */
                sideIncomeAnnual(state) {
                    if (state.lifeFocus !== 'work' || state.career.track !== 'unemployed')
                        return 0;
                    return state.age < 18 ? .15 : 1.2;
                }
                focusExpenseAnnual(state) {
                    return state.age >= 18 && state.lifeFocus === 'social' ? .4 : 0;
                }
                /** Each career turns a different skill combination into income, so routes no longer feel interchangeable. */
                skillIncomeBonus(state) {
                    // Skill creates a visible premium, but the cap prevents two bonuses from exceeding the
                    // junior employee's base salary before promotion.
                    if (state.career.track === 'sales')
                        return Math.min(3, Math.max(0, (state.skills.business + state.skills.expression - 45) * .035));
                    if (state.career.track === 'media')
                        return Math.min(2, Math.max(0, (state.skills.expression + state.skills.information - 55) * .022));
                    if (state.career.track === 'product')
                        return Math.min(2.5, Math.max(0, (state.skills.management + state.skills.business - 60) * .025));
                    if (state.career.track === 'technology')
                        return Math.min(3, Math.max(0, (state.skills.technology - 45) * .03));
                    if (state.career.track === 'education')
                        return Math.min(1.5, Math.max(0, (state.skills.learning - 55) * .018));
                    return 0;
                }
                static initial(familyAllowanceAnnual) {
                    return { familyAllowanceAnnual, salaryAnnual: 0, livingCostAnnual: 0, loanBalance: 0, loanLimit: 0, lastCashflow: 0, history: [] };
                }
                record(state, openingCash, salaryIncome, otherIncome, livingExpense, interestExpense) {
                    const netCashflow = Math.round((state.stats.funds - openingCash) * 10) / 10;
                    state.finance.history = state.finance.history.filter((item) => item.year !== state.year);
                    state.finance.history.push({ year: state.year, openingCash, salaryIncome, otherIncome, livingExpense, housingExpense: 0, interestExpense, netCashflow, closingCash: state.stats.funds });
                }
            };
            exports_1("FinanceSystem", FinanceSystem);
        }
    };
});

System.register("chunks:///_virtual/FutureTransitionEvents.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"1bb75W6CGdEr6QQLgXa51ed","FutureTransitionEvents",void 0);e("FUTURE_TRANSITION_EVENTS",[{id:"timeline-2026-unknown-future",title:"已知的过去利用好了吗？",description:"接下来的是未知的未来。此后，人生机遇会从随机池中浮现，交易所也可能出现从未见过的新股票；没有人知道下一次机会会在哪一年到来。",yearMin:2026,yearMax:2026,weight:1,forced:!0,options:[{id:"step-into-unknown",label:"走进未知的未来",result:{skills:{information:3},stats:{happiness:2},addFlags:["future-timeline-unlocked"]}}]}]);t._RF.pop()}}}));

System.register("chunks:///_virtual/GameBootstrap.ts",["cc", "./IdentityConfig.ts.ts", "./StartupConfig.ts.ts", "./GameSession.ts.ts", "./ExplorationConfig.ts.ts", "./OpportunitySystem.ts.ts", "./OpenOpportunitySystem.ts.ts", "./StatChangeAnimator.ts", "./Motion.ts", "./UITheme.ts"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var cc_1, IdentityConfig_1, StartupConfig_1, GameSession_1, ExplorationConfig_1, OpportunitySystem_1, OpenOpportunitySystem_1, StatChangeAnimator_1, Motion_1, UITheme_1, ccclass, GameBootstrap;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (IdentityConfig_1_1) {
                IdentityConfig_1 = IdentityConfig_1_1;
            },
            function (StartupConfig_1_1) {
                StartupConfig_1 = StartupConfig_1_1;
            },
            function (GameSession_1_1) {
                GameSession_1 = GameSession_1_1;
            },
            function (ExplorationConfig_1_1) {
                ExplorationConfig_1 = ExplorationConfig_1_1;
            },
            function (OpportunitySystem_1_1) {
                OpportunitySystem_1 = OpportunitySystem_1_1;
            },
            function (OpenOpportunitySystem_1_1) {
                OpenOpportunitySystem_1 = OpenOpportunitySystem_1_1;
            },
            function (StatChangeAnimator_1_1) {
                StatChangeAnimator_1 = StatChangeAnimator_1_1;
            },
            function (Motion_1_1) {
                Motion_1 = Motion_1_1;
            },
            function (UITheme_1_1) {
                UITheme_1 = UITheme_1_1;
            }
        ],
        execute: function () {
            cc_1.cclegacy._RF.push({}, "0d86a6jClRO66SLf+UnVpcB", "GameBootstrap", undefined);
            ccclass = cc_1._decorator.ccclass;
            GameBootstrap = class GameBootstrap extends cc_1.Component {
                constructor() {
                    super(...arguments);
                    this.session = new GameSession_1.GameSession();
                    this.opportunitySystem = new OpportunitySystem_1.OpportunitySystem();
                    this.openOpportunities = new OpenOpportunitySystem_1.OpenOpportunitySystem();
                    this.uiRoot = new cc_1.Node('RestartLifeUI');
                    this.designSize = new cc_1.Vec3(1280, 720, 1);
                    this.talentRefreshesRemaining = 3;
                    this.marketPage = 0;
                    this.industryPage = 0;
                }
                onLoad() {
                    this.node.addChild(this.uiRoot);
                    this.uiRoot.addComponent(cc_1.UITransform).setContentSize(1280, 720);
                    this.updateResponsiveScale();
                    cc_1.view.on('canvas-resize', this.updateResponsiveScale, this);
                    this.statAnimator = new StatChangeAnimator_1.StatChangeAnimator(this.uiRoot);
                    this.showHome();
                }
                onDestroy() { cc_1.view.off('canvas-resize', this.updateResponsiveScale, this); }
                /** Keep the complete 16:9 game board inside phones and desktop windows without cropping. */
                updateResponsiveScale() {
                    const transform = this.node.getComponent(cc_1.UITransform);
                    if (!transform)
                        return;
                    const scale = Math.min(transform.width / this.designSize.x, transform.height / this.designSize.y);
                    this.uiRoot.setScale(Math.max(.25, scale), Math.max(.25, scale), 1);
                }
                showHome() {
                    this.clearScreen();
                    this.createText('编年', new cc_1.Vec3(0, 245), 18, UITheme_1.UITheme.gold, 'center');
                    this.createText('重新活一次', new cc_1.Vec3(0, 180), 58, UITheme_1.UITheme.text, 'center');
                    this.createText('如果人生可以重启，你会如何书写下一页？', new cc_1.Vec3(0, 112), 21, UITheme_1.UITheme.muted, 'center');
                    this.createButton('开始重来', new cc_1.Vec3(0, 35), new cc_1.Vec3(380, 70), () => {
                        this.selectedIdentity = undefined;
                        this.selectedTalent = undefined;
                        this.revealedDefect = undefined;
                        this.talentRefreshesRemaining = 3;
                        this.showIdentitySelection();
                    }, 'primary', false);
                    if (this.session.hasContinuableSave())
                        this.createButton('继续人生', new cc_1.Vec3(0, -48), new cc_1.Vec3(380, 56), () => this.restoreLife(), 'secondary', false);
                    if (this.session.hasArchive())
                        this.createTextButton('人生档案', new cc_1.Vec3(-82, -126), () => this.showArchive());
                    this.createTextButton('设置', new cc_1.Vec3(this.session.hasArchive() ? 82 : 0, -126), () => this.showToast('设置将在后续版本中开放。'));
                    this.createText('每一次选择，都会在多年后留下回声。', new cc_1.Vec3(0, -225), 15, UITheme_1.UITheme.quiet, 'center');
                }
                showIdentitySelection() {
                    this.clearScreen();
                    this.createText('选择初始家庭身份', new cc_1.Vec3(0, 270), 39, UITheme_1.UITheme.text, 'center');
                    this.createText('首局固定开放农村务工家庭与小城普通家庭；完成迁移、教育或商业成就，可以解锁其他起点。', new cc_1.Vec3(0, 218), 17, UITheme_1.UITheme.muted, 'center', 1080);
                    const statuses = this.session.familyUnlockStatuses();
                    statuses.forEach(({ identity, unlocked, requirement }, index) => {
                        const x = index % 2 === 0 ? -250 : 250;
                        const y = 120 - Math.floor(index / 2) * 130;
                        const cardText = unlocked
                            ? `${identity.name} · ${identity.difficulty}\n${this.identitySummary(identity)}`
                            : `🔒 ${identity.name} · ${identity.difficulty}\n${requirement !== null && requirement !== void 0 ? requirement : '完成对应人生目标后解锁'}`;
                        this.createButton(cardText, new cc_1.Vec3(x, y), new cc_1.Vec3(440, 110), () => {
                            if (!unlocked) {
                                this.showActionMessage('家庭尚未解锁', requirement !== null && requirement !== void 0 ? requirement : '请先完成对应的人生目标。', () => this.showIdentitySelection());
                                return;
                            }
                            this.selectedIdentity = identity;
                            this.showAttributeGuide();
                        }, unlocked ? 'secondary' : 'ghost');
                    });
                    this.createTextButton('返回', new cc_1.Vec3(-520, 285), () => this.showHome());
                }
                showAttributeGuide() {
                    this.clearScreen();
                    this.createText('属性会怎样改变人生？', new cc_1.Vec3(0, 270), 38, UITheme_1.UITheme.text, 'center');
                    this.createPanel(new cc_1.Vec3(-285, 48), new cc_1.Vec3(520, 300), UITheme_1.UITheme.surface);
                    this.createPanel(new cc_1.Vec3(285, 48), new cc_1.Vec3(520, 300), UITheme_1.UITheme.surface);
                    this.createText('基础属性', new cc_1.Vec3(-500, 150), 22, UITheme_1.UITheme.goldSoft, 'left', 200);
                    this.createText('智力：升学、复杂职业与判断\n情商：关系、沟通和冲突处理\n体质：健康损耗与恢复能力\n执行力：工作、创业与行动成功率\n魅力：社交、表达和重要关系\n运气：高风险事件的额外波动', new cc_1.Vec3(-500, 35), 17, UITheme_1.UITheme.text, 'left', 430, 225);
                    this.createText('成长能力', new cc_1.Vec3(70, 150), 22, UITheme_1.UITheme.info, 'left', 200);
                    this.createText('学习：升学与持续成长\n技术：技术职业、软件与智能行业\n商业：收入、交易、销售和创业\n表达：内容行业、沟通与影响力\n管理：晋升、团队和项目扩张\n信息：发现机会、研究风险与判断趋势', new cc_1.Vec3(70, 35), 17, UITheme_1.UITheme.text, 'left', 430, 225);
                    this.createText('品质越高，天赋的净收益越强；普通天赋更容易伴随轻度短板。', new cc_1.Vec3(0, -155), 16, UITheme_1.UITheme.muted, 'center', 1000);
                    this.createButton('我了解了，选择天赋', new cc_1.Vec3(0, -220), new cc_1.Vec3(320, 58), () => {
                        this.showTalentSelection(this.rollTalentOffers());
                    }, 'primary', false);
                    this.createTextButton('返回', new cc_1.Vec3(-520, 285), () => this.showIdentitySelection());
                }
                showTalentSelection(offers) {
                    this.clearScreen();
                    this.createText('选择一项天赋', new cc_1.Vec3(0, 260), 39, UITheme_1.UITheme.text, 'center');
                    this.createText('普通 65% · 稀有 28% · 传奇 7%；刷新可以重新抽取全部候选。', new cc_1.Vec3(0, 205), 17, UITheme_1.UITheme.muted, 'center');
                    this.createText('轻度短板概率：普通 55% · 稀有 18% · 传奇 0%', new cc_1.Vec3(0, 168), 15, UITheme_1.UITheme.quiet, 'center');
                    offers.forEach(({ talent, defect }, index) => {
                        const x = (index - 1) * 350;
                        const defectText = defect.id === StartupConfig_1.NO_DEFECT.id ? '' : `\n\n伴生短板：${defect.name}\n影响：${this.effectSummary(defect.result)}`;
                        this.createTalentButton(`${talent.name} · ${this.rarityName(talent.rarity)}\n${talent.description}\n\n天赋优势：${this.effectSummary(talent.result)}${defectText}`, new cc_1.Vec3(x, 10), new cc_1.Vec3(316, 220), talent.rarity, () => {
                            this.selectedTalent = talent;
                            this.revealedDefect = defect;
                            this.showMemorySelection(this.session.pickDistinct(StartupConfig_1.MEMORIES, 3));
                        });
                    });
                    const refreshText = this.talentRefreshesRemaining > 0
                        ? `免费刷新天赋（剩余 ${this.talentRefreshesRemaining}/3）`
                        : '免费刷新次数已用完';
                    this.createButton(refreshText, new cc_1.Vec3(0, -155), new cc_1.Vec3(290, 48), () => {
                        if (this.talentRefreshesRemaining <= 0) {
                            this.showToast('本局的 3 次免费刷新已经用完。');
                            return;
                        }
                        this.talentRefreshesRemaining -= 1;
                        this.showTalentSelection(this.rollTalentOffers());
                    }, this.talentRefreshesRemaining > 0 ? 'secondary' : 'ghost', false);
                    this.createText('刷新只更换候选天赋，不消耗任何属性、金钱或记忆碎片。', new cc_1.Vec3(0, -210), 14, UITheme_1.UITheme.quiet, 'center', 800);
                    this.createTextButton('返回属性说明', new cc_1.Vec3(-500, 285), () => this.showAttributeGuide());
                }
                /** Each slot rolls independently, making rerolls meaningful without hiding the published odds. */
                rollTalentOffers() {
                    const usedTalentIds = new Set();
                    return Array.from({ length: 3 }, () => {
                        const rarityRoll = this.session.rollPercentage();
                        const rarity = rarityRoll < 7 ? 'legendary' : rarityRoll < 35 ? 'rare' : 'common';
                        const talentPool = StartupConfig_1.TALENTS.filter((item) => item.rarity === rarity && !usedTalentIds.has(item.id));
                        const talent = this.session.pickDistinct(talentPool, 1)[0];
                        usedTalentIds.add(talent.id);
                        const defectChance = rarity === 'common' ? 55 : rarity === 'rare' ? 18 : 0;
                        let defect = StartupConfig_1.NO_DEFECT;
                        if (this.session.rollPercentage() < defectChance) {
                            const baseDefect = this.session.pickDistinct(StartupConfig_1.DEFECTS.filter((item) => item.id !== StartupConfig_1.NO_DEFECT.id), 1)[0];
                            defect = this.balanceDefect(baseDefect, rarity === 'common' ? .5 : .25);
                        }
                        return { talent: this.balanceTalent(talent), defect };
                    });
                }
                /** Low-quality drawbacks remain readable and directional, but never erase the talent itself. */
                balanceDefect(defect, multiplier) {
                    const scale = (values) => {
                        if (!values)
                            return undefined;
                        const scaled = {};
                        Object.entries(values).forEach(([key, value]) => { scaled[key] = Math.round(value * multiplier); });
                        return scaled;
                    };
                    return Object.assign(Object.assign({}, defect), { result: Object.assign(Object.assign({}, defect.result), { attributes: scale(defect.result.attributes), skills: scale(defect.result.skills), stats: scale(defect.result.stats) }) });
                }
                /** Higher rarity always means higher net value; legendary talents also keep their unique flag. */
                balanceTalent(talent) {
                    var _a;
                    const multiplier = talent.rarity === 'legendary' ? 1.75 : talent.rarity === 'rare' ? 1.35 : 1;
                    const scale = (values) => {
                        if (!values)
                            return undefined;
                        const scaled = {};
                        Object.entries(values).forEach(([key, value]) => { scaled[key] = Math.round(value * multiplier); });
                        return scaled;
                    };
                    const result = Object.assign(Object.assign({}, talent.result), { attributes: scale(talent.result.attributes), skills: scale(talent.result.skills), stats: scale(talent.result.stats) });
                    if (talent.id === 'second-choice') {
                        result.attributes = Object.assign(Object.assign({}, ((_a = result.attributes) !== null && _a !== void 0 ? _a : {})), { luck: 10, execution: 6 });
                    }
                    return Object.assign(Object.assign({}, talent), { result });
                }
                showMemorySelection(choices) {
                    this.clearScreen();
                    this.createText('带回一枚记忆碎片', new cc_1.Vec3(0, 260), 39, UITheme_1.UITheme.text, 'center');
                    this.createText('记忆会立刻提供属性、资源或时代信号。卡片中的效果会真实写入本局人生。', new cc_1.Vec3(0, 205), 18, UITheme_1.UITheme.muted, 'center', 1000);
                    choices.forEach((memory, index) => {
                        const x = (index - 1) * 350;
                        this.createButton(`${memory.text}\n${this.accuracyName(memory.accuracy)}\n效果：${memory.effectText}`, new cc_1.Vec3(x, 30), new cc_1.Vec3(310, 180), () => this.beginLife(memory));
                    });
                }
                beginLife(memory) {
                    if (!this.selectedIdentity || !this.selectedTalent || !this.revealedDefect)
                        return;
                    this.session.start(this.selectedIdentity.id, 'original', Date.now());
                    const state = this.session.applyStartup(this.selectedTalent, this.revealedDefect, memory);
                    this.showEvent(state, this.session.getCurrentEvent());
                }
                restoreLife() {
                    const state = this.session.tryRestore();
                    if (!state) {
                        this.showToast('暂无可继续的人生。');
                        return;
                    }
                    this.selectedIdentity = IdentityConfig_1.IDENTITIES.find((item) => item.id === state.identityId);
                    this.selectedTalent = StartupConfig_1.TALENTS.find((item) => item.id === state.talentId);
                    this.revealedDefect = StartupConfig_1.DEFECTS.find((item) => item.id === state.defectId);
                    this.showEvent(state, this.session.getCurrentEvent());
                }
                showArchive() {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    const state = this.session.loadArchive();
                    const report = this.session.getReport();
                    if (!state || !report) {
                        this.showToast('还没有可读取的人生记录。');
                        return;
                    }
                    this.selectedIdentity = IdentityConfig_1.IDENTITIES.find((item) => item.id === state.identityId);
                    this.selectedTalent = StartupConfig_1.TALENTS.find((item) => item.id === state.talentId);
                    this.revealedDefect = StartupConfig_1.DEFECTS.find((item) => item.id === state.defectId);
                    this.clearScreen();
                    this.createPageHeader('人生档案', `${state.year} 年 · ${state.age} 岁 · ${state.completed ? '本局已结算' : '本局进行中'}`, () => this.showHome());
                    this.createPanel(new cc_1.Vec3(-300, 70), new cc_1.Vec3(500, 245), UITheme_1.UITheme.surface);
                    this.createPanel(new cc_1.Vec3(300, 70), new cc_1.Vec3(500, 245), UITheme_1.UITheme.surface);
                    this.createText(`出身：${(_b = (_a = this.selectedIdentity) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '未记录'}\n天赋：${(_d = (_c = this.selectedTalent) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '未记录'}\n缺陷：${(_f = (_e = this.revealedDefect) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : '未记录'}\n记忆：${(_h = (_g = StartupConfig_1.MEMORIES.find((item) => item.id === state.memoryId)) === null || _g === void 0 ? void 0 : _g.text) !== null && _h !== void 0 ? _h : '未记录'}\n学历：${this.educationName(state.education.level)}\n职业：${this.careerName(state.career.track)} · ${this.careerLevelName(state.career.level)}`, new cc_1.Vec3(-520, 70), 17, UITheme_1.UITheme.text, 'left', 440, 215);
                    this.createText(`现金：${this.money(state.stats.funds)}\n总资产：${this.money(this.session.totalAssetValue())}\n健康 / 幸福：${state.stats.health} / ${state.stats.happiness}\n最强维度：${report.strongestDimension}\n最大取舍：${report.greatestSacrifice}\n人生关键词：${report.lifeKeywords.join(' · ')}`, new cc_1.Vec3(80, 70), 17, UITheme_1.UITheme.text, 'left', 440, 215);
                    const timeline = report.timeline.slice(-5).map((item) => `${item.year}｜${item.event}：${item.choice}`).join('\n') || '尚未留下关键事件记录。';
                    this.createText('最近的重要选择', new cc_1.Vec3(-500, -82), 20, UITheme_1.UITheme.goldSoft, 'left', 300);
                    this.createText(timeline, new cc_1.Vec3(-500, -170), 15, UITheme_1.UITheme.muted, 'left', 1000, 150);
                    if (!state.completed)
                        this.createButton('继续这段人生', new cc_1.Vec3(0, -270), new cc_1.Vec3(260, 48), () => this.showEvent(state, this.session.getCurrentEvent()), 'primary', false);
                }
                showEvent(state, event) {
                    var _a, _b;
                    if (state.completed) {
                        this.showEnding(state);
                        return;
                    }
                    this.clearScreen();
                    this.createLifeDashboard(state, event);
                    if (!event) {
                        const yearInfo = this.session.getYearInfo();
                        this.createText('这一年，你想把时间交给什么？', new cc_1.Vec3(0, 78), 28, UITheme_1.UITheme.text, 'center');
                        this.createText(`${(_a = yearInfo === null || yearInfo === void 0 ? void 0 : yearInfo.headline) !== null && _a !== void 0 ? _a : '人生继续'} · ${(_b = yearInfo === null || yearInfo === void 0 ? void 0 : yearInfo.summary) !== null && _b !== void 0 ? _b : '新的机会正在靠近。'}`, new cc_1.Vec3(0, 35), 16, UITheme_1.UITheme.muted, 'center', 970);
                        const advice = state.year >= 2026 ? `未来建议：${this.focusAdvice(state)}` : `当前重心：${this.focusName(state.lifeFocus)}`;
                        const sideIncome = state.lifeFocus === 'work' && state.career.track === 'unemployed' ? (state.age < 18 ? .15 : 1.2) : 0;
                        const focusExpense = state.age >= 18 && state.lifeFocus === 'social' ? .4 : 0;
                        const cashflow = state.age < 18
                            ? `预计年收入 ${this.money(state.finance.familyAllowanceAnnual + sideIncome)} · 年开支 ¥0`
                            : `预计年收入 ${this.money(state.finance.salaryAnnual + sideIncome)} · 预计年开支 ${this.money(state.finance.livingCostAnnual + focusExpense)}`;
                        this.createText(`${advice}  ·  ${cashflow}`, new cc_1.Vec3(0, 0), 16, state.finance.salaryAnnual < state.finance.livingCostAnnual ? UITheme_1.UITheme.loss : UITheme_1.UITheme.info, 'center', 1080);
                        this.createButton(this.focusButtonLabel(state, 'study'), new cc_1.Vec3(-360, -75), new cc_1.Vec3(210, 82), () => this.setFocus('study'), state.lifeFocus === 'study' ? 'primary' : 'secondary');
                        this.createButton(this.focusButtonLabel(state, 'work'), new cc_1.Vec3(-120, -75), new cc_1.Vec3(210, 82), () => this.setFocus('work'), state.lifeFocus === 'work' ? 'primary' : 'secondary');
                        this.createButton(this.focusButtonLabel(state, 'rest'), new cc_1.Vec3(120, -75), new cc_1.Vec3(210, 82), () => this.setFocus('rest'), state.lifeFocus === 'rest' ? 'primary' : 'secondary');
                        this.createButton(this.focusButtonLabel(state, 'social'), new cc_1.Vec3(360, -75), new cc_1.Vec3(210, 82), () => this.setFocus('social'), state.lifeFocus === 'social' ? 'primary' : 'secondary');
                        if (state.age < 80) {
                            this.createText('手动推进时间；遇到升学、毕业或重要事件会自动停下', new cc_1.Vec3(0, -137), 15, UITheme_1.UITheme.quiet, 'center');
                            [1, 2, 3].forEach((years, index) => this.createButton(`度过 ${years} 年`, new cc_1.Vec3((index - 1) * 185, -190), new cc_1.Vec3(158, 50), () => this.advanceTime(years), index === 0 ? 'primary' : 'secondary'));
                        }
                        else
                            this.createButton('返回主页', new cc_1.Vec3(0, -190), new cc_1.Vec3(300, 52), () => this.showHome(), 'primary', false);
                        return;
                    }
                    this.createEventModal(state, event);
                }
                /** The life dashboard remains visible under an opportunity modal, so every choice has context. */
                createLifeDashboard(state, event) {
                    this.createText(`${state.year} 年 · ${state.age} 岁`, new cc_1.Vec3(-510, 282), 30, UITheme_1.UITheme.gold, 'left', 300);
                    this.createText(state.year >= 2026 ? '未知未来' : '历史时期', new cc_1.Vec3(-250, 282), 15, UITheme_1.UITheme.muted, 'left', 130);
                    this.createButton('详情', new cc_1.Vec3(330, 282), new cc_1.Vec3(92, 38), () => this.showLifePanel(state, event), 'ghost', false);
                    this.createButton('探索', new cc_1.Vec3(435, 282), new cc_1.Vec3(92, 38), () => this.showExploration(state, event), 'ghost', false);
                    this.createButton('恢复', new cc_1.Vec3(540, 282), new cc_1.Vec3(92, 38), () => this.showWellbeing(state, event), 'ghost', false);
                    this.createPanel(new cc_1.Vec3(0, 220), new cc_1.Vec3(1090, 58), UITheme_1.UITheme.surface);
                    this.createText(`可用现金 ${this.money(state.stats.funds)} ｜ 健康 ${Math.round(state.stats.health)} ｜ 压力 ${Math.round(state.stats.pressure)} ｜ 幸福 ${Math.round(state.stats.happiness)}\n现金用于消费和投资；健康影响生存与收入；压力过高会损耗；幸福过低会结束人生`, new cc_1.Vec3(0, 220), 14, UITheme_1.UITheme.text, 'center', 1050, 50);
                    this.showWarnings(state);
                }
                createEventModal(state, event) {
                    const scrim = new cc_1.Node('OpportunityScrim');
                    scrim.addComponent(cc_1.UITransform).setContentSize(1280, 720);
                    this.drawRoundedRect(scrim, 1280, 720, 0, new cc_1.Color(8, 7, 12, 210));
                    scrim.addComponent(cc_1.BlockInputEvents);
                    this.uiRoot.addChild(scrim);
                    const modal = this.createPanel(new cc_1.Vec3(0, -15), new cc_1.Vec3(1060, 550), UITheme_1.UITheme.surfaceRaised, 'OpportunityModal');
                    modal.addComponent(cc_1.UIOpacity).opacity = 255;
                    const eventKind = event.interaction === 'opportunity' ? '限时机遇 · 错过后不再停留'
                        : event.interaction === 'milestone' || event.forced ? '人生节点 · 需要回应'
                            : event.interaction === 'information' || event.informational ? '信息更新' : '生活选择';
                    this.createTextOn(modal, eventKind, new cc_1.Vec3(0, 225), 16, event.informational ? UITheme_1.UITheme.info : event.forced ? UITheme_1.UITheme.gold : UITheme_1.UITheme.info, 'center');
                    if (event.declineAllowed)
                        this.createButtonOn(modal, '暂不进入', new cc_1.Vec3(455, 225), new cc_1.Vec3(110, 36), () => this.tryDecline(event), 'ghost');
                    this.createTextOn(modal, event.title, new cc_1.Vec3(110, 165), 34, UITheme_1.UITheme.text, 'center', 620, 52);
                    const admissionPreview = this.session.educationAdmissionPreview(event.id);
                    this.createTextOn(modal, admissionPreview ? `${event.description}\n${admissionPreview}` : event.description, new cc_1.Vec3(110, 100), 18, UITheme_1.UITheme.muted, 'center', 620, admissionPreview ? 104 : 72);
                    this.createTextOn(modal, `现金 ${this.money(state.stats.funds)}\n现金流 ${this.money(state.finance.lastCashflow)}\n健康 ${state.stats.health} · 压力 ${state.stats.pressure}\n幸福 ${state.stats.happiness} · 知识 ${state.stats.knowledge}\n\n技术 ${state.skills.technology} · 商业 ${state.skills.business}\n信息 ${state.skills.information}\n\n${this.pressureRule(state.stats.pressure)}`, new cc_1.Vec3(-380, 15), 16, UITheme_1.UITheme.text, 'left', 250, 330);
                    const compact = event.options.length >= 5;
                    const optionGap = compact ? 58 : event.options.length >= 3 ? 78 : 88;
                    const optionStart = compact ? 65 : event.options.length >= 3 ? 20 : 5;
                    event.options.forEach((option, index) => {
                        const impact = this.optionImpact(option.result);
                        const label = impact ? `${option.label}\n${impact}` : option.label;
                        this.createButtonOn(modal, label, new cc_1.Vec3(110, optionStart - index * optionGap), new cc_1.Vec3(620, compact ? 50 : 62), () => this.tryChoose(option.id, event), index === 0 ? 'primary' : 'secondary');
                    });
                    if (event.declineAllowed)
                        this.createTextOn(modal, '选择“暂不进入”后，本次机会会结束，时间线才可继续推进。', new cc_1.Vec3(110, -225), 14, UITheme_1.UITheme.quiet, 'center', 620, 32);
                    Motion_1.Motion.modalEnter(modal);
                }
                showExploration(state, activeEvent) {
                    this.clearScreen();
                    this.createText('主动探索', new cc_1.Vec3(-500, 280), 38, UITheme_1.UITheme.text, 'left', 400);
                    this.createText('有些信息不会主动出现，需要前往对应场所了解。', new cc_1.Vec3(-500, 225), 17, UITheme_1.UITheme.muted, 'left', 820);
                    ExplorationConfig_1.EXPLORATION_ACTIONS.forEach((action, index) => {
                        const available = this.openOpportunities.isAvailable(state, action);
                        const x = index % 2 === 0 ? -270 : 270;
                        const y = 125 - Math.floor(index / 2) * 126;
                        const requirement = this.openOpportunities.requirementText(action);
                        const detail = available
                            ? `${action.description}\n解锁条件：${requirement}`
                            : `尚未解锁：${requirement}`;
                        this.createPanel(new cc_1.Vec3(x, y), new cc_1.Vec3(500, 108), available ? UITheme_1.UITheme.surface : UITheme_1.UITheme.ink850);
                        this.createText(action.name, new cc_1.Vec3(x - 215, y + 27), 21, available ? UITheme_1.UITheme.goldSoft : UITheme_1.UITheme.quiet, 'left', 260);
                        this.createText(detail, new cc_1.Vec3(x - 215, y - 18), 14, available ? UITheme_1.UITheme.muted : UITheme_1.UITheme.quiet, 'left', 330, 48);
                        this.createButton(available ? '进入' : '暂未解锁', new cc_1.Vec3(x + 184, y), new cc_1.Vec3(106, 42), () => {
                            if (!available)
                                return;
                            if (action.domain === 'market') {
                                this.showMarket(this.session.snapshot(), activeEvent);
                            }
                            else if (action.domain === 'industry')
                                this.showIndustryProjects(this.session.snapshot(), activeEvent);
                            else if (action.domain === 'startup')
                                this.showStartup(this.session.snapshot(), activeEvent);
                            else if (action.domain === 'city')
                                this.showCity(this.session.snapshot(), activeEvent);
                            else if (action.domain === 'housing')
                                this.showHousing(this.session.snapshot(), activeEvent);
                            else if (action.domain === 'education')
                                this.showEducationAdvance(this.session.snapshot(), activeEvent);
                        }, available ? 'primary' : 'ghost', false);
                    });
                    this.createTextButton('返回', new cc_1.Vec3(0, -265), () => this.showEvent(this.session.snapshot(), activeEvent));
                }
                showDomainArchitecture(name, description, state, activeEvent) {
                    this.clearScreen();
                    this.createText(name, new cc_1.Vec3(0, 190), 40, new cc_1.Color(252, 214, 108), 'center');
                    this.createText(description, new cc_1.Vec3(0, 125), 20, new cc_1.Color(220, 226, 240), 'center');
                    this.createText('该模块已接入开放机遇架构。', new cc_1.Vec3(0, 50), 25, new cc_1.Color(252, 214, 108), 'center');
                    this.createText('后续会在这里展开专属行动、条件校验、结果结算与长期资产或关系影响。', new cc_1.Vec3(0, 5), 18, new cc_1.Color(220, 226, 240), 'center', 960);
                    this.createText('当前阶段保留入口与解锁规则，避免未完成的内容伪装成可操作功能。', new cc_1.Vec3(0, -35), 16, new cc_1.Color(150, 205, 255), 'center', 960);
                    this.createButton('返回开放机遇', new cc_1.Vec3(0, -150), new cc_1.Vec3(280, 60), () => this.showExploration(state, activeEvent), 'secondary', false);
                }
                showStartup(state, activeEvent) {
                    var _a, _b, _c;
                    this.clearScreen();
                    this.createPageHeader('创业孵化器', state.startup.active ? '推进成功会提高项目估值；失败会降低估值并增加压力。退出时按估值的 70% 变现。' : '先看懂行业、投入、适配能力和收益路径，再选择项目。', () => this.showExploration(this.session.snapshot(), activeEvent));
                    if (!state.startup.active) {
                        ['ecommerce', 'local-service', 'content', 'software', 'emerging'].forEach((type, index) => {
                            const preview = this.session.startupPreview(type);
                            const x = (index % 3 - 1) * 300;
                            const y = 83 - Math.floor(index / 3) * 155;
                            this.createButton(`${preview.name} · ${preview.industry}\n投入 ${this.money(preview.cost)} · ${preview.risk}风险\n适配：${preview.suitedSkill} · 当前成功率 ${this.session.startupChance(type)}%\n${preview.returnPath}`, new cc_1.Vec3(x, y), new cc_1.Vec3(278, 132), () => this.tryExplorer(() => this.session.startProject(type), () => this.showStartup(this.session.snapshot(), activeEvent)));
                        });
                    }
                    else {
                        this.createPanel(new cc_1.Vec3(0, 70), new cc_1.Vec3(720, 120), UITheme_1.UITheme.surface);
                        const holding = (_b = (_a = state.assets.find((asset) => asset.type === 'startup')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
                        this.createText(`项目：${this.startupName((_c = state.startup.project) !== null && _c !== void 0 ? _c : '')}  ·  阶段：${this.startupStageName(state.startup.stage)}\n当前估值 ${this.money(holding)} · 推进成功率 ${this.session.startupSuccessRate()}% · 现在退出可回收约 ${this.money(holding * .7)}`, new cc_1.Vec3(0, 70), 18, UITheme_1.UITheme.text, 'center', 660, 82);
                        this.createButton('继续推进 · 每年一次', new cc_1.Vec3(-145, -35), new cc_1.Vec3(250, 58), () => this.tryExplorer(() => this.session.advanceStartup(), () => this.showStartup(this.session.snapshot(), activeEvent)), 'primary');
                        this.createButton('退出项目', new cc_1.Vec3(145, -35), new cc_1.Vec3(250, 58), () => this.tryExplorer(() => this.session.exitStartup(), () => this.showStartup(this.session.snapshot(), activeEvent)));
                    }
                }
                showCity(state, activeEvent) {
                    this.clearScreen();
                    this.createPageHeader('城市迁移', `当前：${this.cityName(state.education.city)} · 每一笔迁移成本和迁移后的年度开支都在下方列明。`, () => this.showExploration(this.session.snapshot(), activeEvent));
                    ['rural', 'county', 'city', 'metropolis'].forEach((city, index) => {
                        const preview = this.session.migrationPreview(city);
                        const current = city === state.education.city;
                        const label = current
                            ? `${this.cityName(city)} · 当前居住\n年度生活费 ${this.money(preview.annualAfter)}`
                            : `${this.cityName(city)}\n迁移共 ${this.money(preview.total)}\n交通 ${this.money(preview.transport)} · 押金 ${this.money(preview.deposit)} · 过渡 ${this.money(preview.transition)}\n年度生活费 ${this.money(preview.annualAfter)}`;
                        this.createButton(label, new cc_1.Vec3((index - 1.5) * 275, 25), new cc_1.Vec3(250, 132), () => {
                            if (current)
                                return;
                            this.tryExplorer(() => this.session.migrateCity(city), () => this.showCity(this.session.snapshot(), activeEvent));
                        }, current ? 'primary' : 'secondary');
                    });
                    this.createText('迁移成本会立即从现金扣除；年度生活费从下一次年度结算开始影响现金流。', new cc_1.Vec3(0, -100), 16, UITheme_1.UITheme.info, 'center', 1000);
                }
                showHousing(state, activeEvent) {
                    var _a, _b;
                    const value = (_b = (_a = state.assets.find((asset) => asset.type === 'housing')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
                    this.clearScreen();
                    this.createPageHeader('房产市场', `${this.cityName(state.education.city)} · 持有 ${state.housingHoldings.length} 套 · 现有估值 ${this.money(value)} · 买卖税费均为房价的 3%`, () => this.showExploration(this.session.snapshot(), activeEvent));
                    this.session.housingProducts().forEach((product, index) => {
                        const price = this.session.housingPrice(product.id);
                        const total = Math.round(price * 1.03 * 10) / 10;
                        this.createButton(`${product.name}\n房价 ${this.money(price)} · 含税共 ${this.money(total)}\n${product.description}`, new cc_1.Vec3((index - 1) * 360, 75), new cc_1.Vec3(330, 122), () => this.tryExplorer(() => this.session.buyHousing(product.id), () => this.showHousing(this.session.snapshot(), activeEvent)), index === 0 ? 'primary' : 'secondary');
                    });
                    this.createText('我的住房（出售到账 = 当前估值 × 97%）', new cc_1.Vec3(-520, -38), 18, UITheme_1.UITheme.goldSoft, 'left', 500);
                    if (state.housingHoldings.length === 0)
                        this.createText('暂无住房资产。购房款会转为房产持仓，不会从资产面板消失。', new cc_1.Vec3(0, -115), 17, UITheme_1.UITheme.muted, 'center', 1000);
                    state.housingHoldings.slice(0, 3).forEach((holding, index) => {
                        this.createButton(`${holding.name}\n${holding.purchaseYear}年购入 ${this.money(holding.purchasePrice)}\n现值 ${this.money(holding.currentValue)} · 出售`, new cc_1.Vec3((index - 1) * 360, -135), new cc_1.Vec3(330, 90), () => this.tryExplorer(() => this.session.sellHousing(holding.id), () => this.showHousing(this.session.snapshot(), activeEvent)), 'ghost');
                    });
                }
                showIndustryProjects(state, activeEvent) {
                    this.clearScreen();
                    const holdings = state.industryProjects;
                    const active = holdings.filter((holding) => holding.status === 'active');
                    const invested = holdings.reduce((sum, holding) => sum + holding.investedPrincipal, 0);
                    const activeValue = active.reduce((sum, holding) => sum + holding.currentValue, 0);
                    const realized = holdings.filter((holding) => holding.status !== 'active').reduce((sum, holding) => sum + holding.realizedReturn, 0);
                    const unrealized = active.reduce((sum, holding) => sum + holding.currentValue - holding.investedPrincipal, 0);
                    const net = Math.round((realized + unrealized) * 10) / 10;
                    this.createPageHeader('行业项目 · 投资账本', `历史投入 ${this.money(invested)} · 在投市值 ${this.money(activeValue)} · 累计盈亏 ${net >= 0 ? '+' : ''}${this.money(net)}`, () => this.showExploration(this.session.snapshot(), activeEvent));
                    if (holdings.length === 0) {
                        const available = this.session.industryProjectConfigs().slice(0, 4).map((item) => `${item.name}（${item.industry}，最低 ${this.money(item.minimumInvestment)}）`).join(' · ');
                        this.createText(`尚无投资记录。\n当前年份可关注：${available || '暂无开放行业窗口'}`, new cc_1.Vec3(0, 55), 18, UITheme_1.UITheme.muted, 'center', 1000, 100);
                        this.createText('行业机会会作为限时事件出现；早期进入、成熟期持有、拥挤期退出构成完整的收益路径。', new cc_1.Vec3(0, -55), 16, UITheme_1.UITheme.info, 'center', 1000);
                        return;
                    }
                    this.createText(`持有中 ${active.length} · 已结束 ${holdings.length - active.length}；已退出或失败的项目会永久保留，便于复盘。`, new cc_1.Vec3(0, 174), 15, UITheme_1.UITheme.muted, 'center', 1050);
                    const pageCount = Math.max(1, Math.ceil(holdings.length / 6));
                    this.industryPage = Math.min(this.industryPage, pageCount - 1);
                    holdings.slice(this.industryPage * 6, this.industryPage * 6 + 6).forEach((holding, index) => {
                        const activeProfit = Math.round((holding.currentValue - holding.investedPrincipal) * 10) / 10;
                        const profit = holding.status === 'active' ? activeProfit : holding.realizedReturn;
                        const status = holding.status === 'active' ? '持有中' : holding.status === 'exited' ? '已退出' : '项目失败';
                        const valueLine = holding.status === 'active'
                            ? `现值 ${this.money(holding.currentValue)} · 浮动${profit >= 0 ? '+' : ''}${this.money(profit)}`
                            : holding.status === 'exited'
                                ? `退出回款 ${this.money(holding.investedPrincipal + holding.realizedReturn)} · 已实现${profit >= 0 ? '+' : ''}${this.money(profit)}`
                                : `回收 ¥0 · 已实现${this.money(profit)}`;
                        const text = `${holding.name} · ${holding.industry}\n${holding.startYear}年投入 ${this.money(holding.investedPrincipal)} · ${status}\n${valueLine}${holding.status === 'active' ? '\n再次点击退出（扣2%）' : '\n记录已归档，不会消失'}`;
                        const position = new cc_1.Vec3((index % 3 - 1) * 360, 82 - Math.floor(index / 3) * 150);
                        if (holding.status === 'active') {
                            this.createButton(text, position, new cc_1.Vec3(330, 126), () => this.tryExplorer(() => this.session.exitIndustryProject(holding.id), () => this.showIndustryProjects(this.session.snapshot(), activeEvent)), profit >= 0 ? 'primary' : 'secondary');
                        }
                        else {
                            const panel = this.createPanel(position, new cc_1.Vec3(330, 126), UITheme_1.UITheme.surfaceRaised, 'ArchivedInvestment');
                            this.createTextOn(panel, text, cc_1.Vec3.ZERO, 16, profit >= 0 ? UITheme_1.UITheme.gain : UITheme_1.UITheme.loss, 'center', 306, 110);
                        }
                    });
                    if (pageCount > 1) {
                        this.createButton('上一页', new cc_1.Vec3(-78, -248), new cc_1.Vec3(120, 42), () => { this.industryPage = (this.industryPage - 1 + pageCount) % pageCount; this.showIndustryProjects(this.session.snapshot(), activeEvent); }, 'ghost', false);
                        this.createText(`${this.industryPage + 1} / ${pageCount}`, new cc_1.Vec3(0, -248), 15, UITheme_1.UITheme.muted, 'center', 60);
                        this.createButton('下一页', new cc_1.Vec3(78, -248), new cc_1.Vec3(120, 42), () => { this.industryPage = (this.industryPage + 1) % pageCount; this.showIndustryProjects(this.session.snapshot(), activeEvent); }, 'ghost', false);
                    }
                }
                showEducationAdvance(state, activeEvent) {
                    this.clearScreen();
                    this.createPageHeader('教育与进修', `学历：${this.educationName(state.education.level)} · 知识：${state.stats.knowledge} · 每年限一项进修`, () => this.showExploration(this.session.snapshot(), activeEvent));
                    this.createButton('自学技术', new cc_1.Vec3(-280, 20), new cc_1.Vec3(200, 70), () => this.tryExplorer(() => this.session.selfStudy('technology'), () => this.showEducationAdvance(this.session.snapshot(), activeEvent)));
                    this.createButton('商业考证\n¥1.5 万', new cc_1.Vec3(0, 20), new cc_1.Vec3(220, 70), () => this.tryExplorer(() => this.session.certificate('business'), () => this.showEducationAdvance(this.session.snapshot(), activeEvent)));
                    this.createButton('考研深造\n¥8 万', new cc_1.Vec3(280, 20), new cc_1.Vec3(220, 70), () => this.tryExplorer(() => this.session.graduateSchool(), () => this.showEducationAdvance(this.session.snapshot(), activeEvent)));
                }
                showWellbeing(state, activeEvent) {
                    this.clearScreen();
                    this.createPageHeader('恢复状态', `压力 ${state.stats.pressure} · 幸福 ${state.stats.happiness} · 健康 ${state.stats.health}`, () => this.showEvent(this.session.snapshot(), activeEvent));
                    this.createText(state.lastWellbeingYear === state.year ? '今年已经恢复过一次。' : '每年可安排一次恢复行动。', new cc_1.Vec3(0, 135), 17, UITheme_1.UITheme.info, 'center', 900);
                    this.createButton('留出空白\n压力↓ · 幸福、健康↑', new cc_1.Vec3(-310, 15), new cc_1.Vec3(260, 100), () => this.tryWellbeing('pause', activeEvent));
                    this.createButton('身心照护\n¥1.5万 · 压力↓健康↑', new cc_1.Vec3(0, 15), new cc_1.Vec3(260, 100), () => this.tryWellbeing('care', activeEvent));
                    this.createButton('陪伴重要的人\n¥8千 · 幸福↑压力↓', new cc_1.Vec3(310, 15), new cc_1.Vec3(260, 100), () => this.tryWellbeing('connection', activeEvent));
                }
                tryWellbeing(kind, activeEvent) {
                    var _a;
                    const before = this.session.snapshot();
                    try {
                        const after = this.session.recoverWellbeing(kind);
                        this.showWellbeing(after, activeEvent);
                        (_a = this.statAnimator) === null || _a === void 0 ? void 0 : _a.playAnimation(before, after);
                    }
                    catch (error) {
                        this.showActionMessage('恢复安排', error instanceof Error ? error.message : '当前无法完成恢复安排。', () => this.showWellbeing(this.session.snapshot(), activeEvent));
                    }
                }
                tryExplorer(action, refresh) { try {
                    action();
                    refresh();
                }
                catch (error) {
                    this.showActionMessage('操作提示', error instanceof Error ? error.message : '当前无法完成操作。', refresh);
                } }
                showMarket(state, activeEvent) {
                    this.clearScreen();
                    this.createText('交易所', new cc_1.Vec3(-500, 280), 38, UITheme_1.UITheme.text, 'left', 300);
                    const tradeStatus = state.age < 18 ? '未成年：只能查看和研究，18岁开放交易' : this.session.canTradeMarket() ? '交易账户已开通' : '尚未确认风险：暂不能买卖';
                    this.createText(`${state.year} · ${tradeStatus}`, new cc_1.Vec3(-500, 230), 16, this.session.canTradeMarket() ? UITheme_1.UITheme.info : UITheme_1.UITheme.loss, 'left', 780);
                    if (state.age >= 18 && !this.session.canTradeMarket())
                        this.createButton('阅读风险并开通', new cc_1.Vec3(465, 245), new cc_1.Vec3(190, 42), () => this.tryMarketAction(() => this.session.acceptMarketRisk(), activeEvent), 'primary');
                    this.createChip(`可用资金 ${this.money(state.stats.funds)}`, new cc_1.Vec3(-330, 185), 300, UITheme_1.UITheme.goldSoft);
                    this.createChip(`持仓市值 ${this.money(this.session.marketValue())}`, new cc_1.Vec3(0, 185), 270, UITheme_1.UITheme.info);
                    this.createChip(`已实现盈亏 ${this.money(state.market.realizedProfit)}`, new cc_1.Vec3(300, 185), 290, state.market.realizedProfit >= 0 ? UITheme_1.UITheme.gain : UITheme_1.UITheme.loss);
                    this.createText(`投资规律：${this.session.marketInsightNames().join(' · ') || '尚未形成'}`, new cc_1.Vec3(0, 145), 16, UITheme_1.UITheme.info, 'center', 1040, 30);
                    this.createText(`行情已锁定在 ${state.year} 年：买卖只改变现金和持仓，不改变价格；推进年份后才统一更新。`, new cc_1.Vec3(0, 112), 15, UITheme_1.UITheme.quiet, 'center', 1040, 30);
                    const listed = this.session.marketInstruments();
                    if (listed.length === 0)
                        this.createText('当前年份尚无公开交易品种。继续生活，留意时代变化。', new cc_1.Vec3(0, 20), 22, UITheme_1.UITheme.muted, 'center');
                    const pageCount = Math.max(1, Math.ceil(listed.length / 4));
                    this.marketPage = Math.min(this.marketPage, pageCount - 1);
                    listed.slice(this.marketPage * 4, this.marketPage * 4 + 4).forEach((instrument, index) => this.createMarketCard(instrument, index, activeEvent));
                    this.createButton('贷款 ¥10万', new cc_1.Vec3(-450, -250), new cc_1.Vec3(150, 42), () => this.tryMarketAction(() => this.session.takeLoan(10), activeEvent), 'ghost');
                    this.createButton('还款 ¥10万', new cc_1.Vec3(-280, -250), new cc_1.Vec3(150, 42), () => this.tryMarketAction(() => this.session.repayLoan(10), activeEvent), 'ghost');
                    if (pageCount > 1) {
                        this.createButton('上一页', new cc_1.Vec3(-80, -250), new cc_1.Vec3(110, 42), () => { this.marketPage = (this.marketPage - 1 + pageCount) % pageCount; this.showMarket(this.session.snapshot(), activeEvent); }, 'ghost', false);
                        this.createText(`${this.marketPage + 1} / ${pageCount}`, new cc_1.Vec3(0, -250), 15, UITheme_1.UITheme.muted, 'center', 70);
                        this.createButton('下一页', new cc_1.Vec3(80, -250), new cc_1.Vec3(110, 42), () => { this.marketPage = (this.marketPage + 1) % pageCount; this.showMarket(this.session.snapshot(), activeEvent); }, 'ghost', false);
                    }
                    this.createButton('返回探索', new cc_1.Vec3(350, -250), new cc_1.Vec3(140, 42), () => this.showExploration(this.session.snapshot(), activeEvent), 'ghost', false);
                    this.createButton(activeEvent ? '返回事件' : '返回人生', new cc_1.Vec3(515, -250), new cc_1.Vec3(150, 42), () => this.showEvent(this.session.snapshot(), activeEvent), 'primary', false);
                }
                createMarketCard(instrument, index, activeEvent) {
                    var _a, _b, _c;
                    const state = this.session.snapshot();
                    const position = state.market.positions.find((item) => item.instrumentId === instrument.id);
                    const researched = state.market.discoveredInstrumentIds.includes(instrument.id);
                    const researchable = this.session.canResearchMarket(instrument.id);
                    const change = this.session.marketChange(instrument.id);
                    const trend = this.sparkline(this.session.marketHistory(instrument.id, 6).map((item) => item.price));
                    const fromYear = Math.max(instrument.publicFromYear, state.year - 1);
                    const movement = fromYear === state.year ? '上市首年，无年度涨跌' : `${fromYear}→${state.year} ${change.amount >= 0 ? '▲' : '▼'} ${change.percent >= 0 ? '+' : ''}${change.percent}%`;
                    const x = index % 2 === 0 ? -285 : 285;
                    const y = 30 - Math.floor(index / 2) * 135;
                    const card = this.createPanel(new cc_1.Vec3(x, y), new cc_1.Vec3(540, 118), UITheme_1.UITheme.surface);
                    this.createTextOn(card, `${instrument.name} · ${(_a = instrument.sector) !== null && _a !== void 0 ? _a : this.marketKindName(instrument.kind)} · ${(_b = instrument.risk) !== null && _b !== void 0 ? _b : '中'}风险`, new cc_1.Vec3(-245, 40), 18, UITheme_1.UITheme.goldSoft, 'left', 390, 26);
                    this.createTextOn(card, `${state.year}年价 ${this.money(this.session.marketPrice(instrument.id))} · ${movement}`, new cc_1.Vec3(-245, 14), 13, change.amount >= 0 ? UITheme_1.UITheme.gain : UITheme_1.UITheme.loss, 'left', 400, 22);
                    this.createTextOn(card, `近年趋势 ${trend} · 持有 ${(_c = position === null || position === void 0 ? void 0 : position.quantity) !== null && _c !== void 0 ? _c : 0}份${position ? ` · 成本 ${this.money(position.averageCost)}` : ''}\n${researched ? instrument.description : `研究条件：${this.marketRequirements(instrument)}`}`, new cc_1.Vec3(-245, -27), 13, UITheme_1.UITheme.quiet, 'left', 390, 50);
                    if (!researched) {
                        this.createButton(researchable ? '研究' : '条件不足', new cc_1.Vec3(x + 210, y), new cc_1.Vec3(100, 44), () => {
                            if (researchable)
                                this.tryMarketAction(() => this.session.researchMarket(instrument.id), activeEvent);
                        }, researchable ? 'primary' : 'ghost');
                        return;
                    }
                    this.createButton(this.session.canTradeMarket() ? '买入1份' : '未开通', new cc_1.Vec3(x + 160, y), new cc_1.Vec3(92, 44), () => {
                        if (this.session.canTradeMarket())
                            this.tryMarketAction(() => this.session.buyMarket(instrument.id, 1), activeEvent);
                    }, this.session.canTradeMarket() ? 'primary' : 'ghost');
                    this.createButton('卖出1份', new cc_1.Vec3(x + 258, y), new cc_1.Vec3(92, 44), () => this.tryMarketAction(() => this.session.sellMarket(instrument.id, 1), activeEvent), 'secondary');
                }
                tryMarketAction(action, activeEvent) {
                    try {
                        action();
                        this.showMarket(this.session.snapshot(), activeEvent);
                    }
                    catch (error) {
                        this.showMarketMessage(error instanceof Error ? error.message : '操作失败。', activeEvent);
                    }
                }
                tryChoose(optionId, event) {
                    var _a;
                    const before = this.session.snapshot();
                    try {
                        const after = this.session.choose(optionId);
                        this.showEvent(after, this.session.getCurrentEvent());
                        (_a = this.statAnimator) === null || _a === void 0 ? void 0 : _a.playAnimation(before, after);
                    }
                    catch (error) {
                        this.clearScreen();
                        this.createText('资金提示', new cc_1.Vec3(0, 100), 36, new cc_1.Color(252, 214, 108), 'center');
                        this.createText(error instanceof Error ? error.message : '当前无法完成选择。', new cc_1.Vec3(0, 35), 20, new cc_1.Color(220, 226, 240), 'center', 950);
                        this.createButton('返回当前事件', new cc_1.Vec3(0, -80), new cc_1.Vec3(280, 60), () => this.showEvent(this.session.snapshot(), event), 'secondary', false);
                    }
                }
                tryDecline(event) {
                    var _a;
                    const before = this.session.snapshot();
                    try {
                        const after = this.session.declineCurrentEvent();
                        this.showEvent(after, this.session.getCurrentEvent());
                        (_a = this.statAnimator) === null || _a === void 0 ? void 0 : _a.playAnimation(before, after);
                    }
                    catch (error) {
                        this.showActionMessage('事件提示', error instanceof Error ? error.message : '当前无法结束该事件。', () => this.showEvent(this.session.snapshot(), event));
                    }
                }
                advanceTime(years) { var _a; const before = this.session.snapshot(); const after = this.session.continueYears(years); this.showEvent(after, this.session.getCurrentEvent()); (_a = this.statAnimator) === null || _a === void 0 ? void 0 : _a.playAnimation(before, after); }
                showWarnings(state) {
                    const warnings = [];
                    if (state.stats.health <= 40)
                        warnings.push('⚠ 健康状况堪忧');
                    if (state.stats.pressure >= 60)
                        warnings.push('⚠ 压力持续偏高，健康与幸福正在受损');
                    if (state.finance.lastCashflow < 0)
                        warnings.push('⚠ 现金流为负');
                    if (warnings.length)
                        this.createText(warnings.join('  '), new cc_1.Vec3(0, 174), 14, UITheme_1.UITheme.loss, 'center', 1000, 24);
                }
                setFocus(focus) {
                    try {
                        const state = this.session.setLifeFocus(focus);
                        this.showEvent(state, this.session.getCurrentEvent());
                    }
                    catch (error) {
                        this.showActionMessage('人生安排提示', error instanceof Error ? error.message : '当前无法设置这一年度重心。', () => this.showEvent(this.session.snapshot(), this.session.getCurrentEvent()));
                    }
                }
                showMarketMessage(message, activeEvent) {
                    this.clearScreen();
                    this.createText('交易提示', new cc_1.Vec3(0, 100), 36, new cc_1.Color(252, 214, 108), 'center');
                    this.createText(message, new cc_1.Vec3(0, 35), 20, new cc_1.Color(220, 226, 240), 'center');
                    this.createButton('返回市场', new cc_1.Vec3(0, -80), new cc_1.Vec3(250, 60), () => this.showMarket(this.session.snapshot(), activeEvent), 'secondary', false);
                }
                showCareer(state, activeEvent) {
                    var _a, _b, _c;
                    this.clearScreen();
                    this.createPageHeader('职业发展', `${this.careerName(state.career.track)} · ${this.careerLevelName(state.career.level)}`, () => this.showLifePanel(this.session.snapshot(), activeEvent));
                    this.createPanel(new cc_1.Vec3(0, 55), new cc_1.Vec3(820, 210), UITheme_1.UITheme.surface);
                    const requirement = this.session.promotionRequirement();
                    const next = (requirement === null || requirement === void 0 ? void 0 : requirement.next) ? this.careerLevelName(requirement.next) : '已到最高级别';
                    this.createText(`当前行业：${state.career.industry || '尚未确定'}\n年工资：${this.money(state.finance.salaryAnnual)}\n晋升评分：${Math.round(this.session.promotionScore())} / ${(_a = requirement === null || requirement === void 0 ? void 0 : requirement.requiredScore) !== null && _a !== void 0 ? _a : '-'}\n本级任职：${(_b = requirement === null || requirement === void 0 ? void 0 : requirement.years) !== null && _b !== void 0 ? _b : 0} / ${(_c = requirement === null || requirement === void 0 ? void 0 : requirement.requiredYears) !== null && _c !== void 0 ? _c : 0} 年\n下一职级：${next}`, new cc_1.Vec3(0, 65), 19, UITheme_1.UITheme.text, 'center', 740, 165);
                    this.createText('晋升在每年结算时自动评估，无需申请。评分由职业技能 40%＋智力 40%＋执行力 20% 构成。', new cc_1.Vec3(0, -95), 16, UITheme_1.UITheme.info, 'center', 940, 48);
                }
                showActionMessage(title, message, back) {
                    this.clearScreen();
                    this.createPanel(new cc_1.Vec3(0, 20), new cc_1.Vec3(720, 300), UITheme_1.UITheme.surface);
                    this.createText(title, new cc_1.Vec3(0, 90), 32, UITheme_1.UITheme.gold, 'center', 640);
                    this.createText(message, new cc_1.Vec3(0, 25), 18, UITheme_1.UITheme.muted, 'center', 620, 76);
                    this.createButton('返回', new cc_1.Vec3(0, -78), new cc_1.Vec3(230, 52), back, 'primary', false);
                }
                showLifePanel(state, activeEvent) {
                    this.clearScreen();
                    this.createPageHeader('人生面板', `${state.year} 年 · ${state.age} 岁`, () => this.showEvent(state, activeEvent));
                    this.createPanel(new cc_1.Vec3(-290, 65), new cc_1.Vec3(520, 250), UITheme_1.UITheme.surface);
                    this.createPanel(new cc_1.Vec3(290, 65), new cc_1.Vec3(520, 250), UITheme_1.UITheme.surface);
                    const expectedNet = state.finance.salaryAnnual - state.finance.livingCostAnnual - state.finance.loanBalance * .05;
                    this.createText(`成长与升学\n学历  ${this.educationName(state.education.level)} · ${this.highSchoolName(state.education.highSchoolTrack)}\n升学评估  ${this.session.learningIndex()} · 学习投入 ${state.education.studyYears} 年\n知识 ${state.stats.knowledge}：升学与复杂判断\n学习 ${state.skills.learning}：考试与继续教育\n信息 ${state.skills.information}：发现机遇与研究市场\n所在城市  ${this.cityName(state.education.city)}`, new cc_1.Vec3(-500, 65), 16, UITheme_1.UITheme.text, 'left', 440, 225);
                    this.createText(`职业与财务\n职业  ${this.careerName(state.career.track)} · ${this.careerLevelName(state.career.level)}\n年工资  ${this.money(state.finance.salaryAnnual)}\n基本生活开支（吃住行）  ${this.money(state.finance.livingCostAnnual)}\n预计年度净现金流  ${expectedNet >= 0 ? '+' : ''}${this.money(expectedNet)}\n贷款  ${this.money(state.finance.loanBalance)} / ${this.money(state.finance.loanLimit)}\n总资产  ${this.money(this.session.totalAssetValue())}`, new cc_1.Vec3(40, 65), 16, UITheme_1.UITheme.text, 'left', 470, 225);
                    this.createText(`能力用途：技术→技术职业/科技项目 ｜ 商业→销售/创业/投资 ｜ 表达→传媒与沟通 ｜ 管理→晋升与项目`, new cc_1.Vec3(0, -92), 15, UITheme_1.UITheme.muted, 'center', 1040, 32);
                    const signals = state.discoveredSignalIds.map((id) => this.opportunitySystem.signalText(id)).join(' · ') || '暂未发现';
                    const opportunities = state.opportunities.map((item) => `${this.opportunitySystem.chainName(item.chainId)}（${item.entered ? '已进入' : '已观察'}）`).join(' · ') || '暂未进入';
                    this.createText(`时代信号：${signals}\n机遇进展：${opportunities}`, new cc_1.Vec3(0, -145), 15, UITheme_1.UITheme.info, 'center', 1040, 64);
                    this.createButton('职业发展', new cc_1.Vec3(-130, -225), new cc_1.Vec3(220, 50), () => this.showCareer(this.session.snapshot(), activeEvent), 'secondary', false);
                    this.createButton('年度现金流', new cc_1.Vec3(130, -225), new cc_1.Vec3(220, 50), () => this.showFinanceHistory(this.session.snapshot(), activeEvent), 'secondary', false);
                }
                showFinanceHistory(state, activeEvent) {
                    this.clearScreen();
                    this.createPageHeader('年度现金流', '每一年度分别记录收入、生活开支、贷款利息、净现金流与年末现金。', () => this.showLifePanel(this.session.snapshot(), activeEvent));
                    const rows = state.finance.history.slice(-12).reverse();
                    if (rows.length === 0) {
                        this.createText('尚未完成第一个年度结算。', new cc_1.Vec3(0, 40), 20, UITheme_1.UITheme.muted, 'center');
                        return;
                    }
                    rows.forEach((row, index) => {
                        const x = index < 6 ? -300 : 300;
                        const y = 145 - (index % 6) * 68;
                        const expenses = row.livingExpense + row.housingExpense + row.interestExpense;
                        this.createPanel(new cc_1.Vec3(x, y), new cc_1.Vec3(540, 56), UITheme_1.UITheme.surface);
                        this.createText(`${row.year}｜收入 ${this.money(row.salaryIncome + row.otherIncome)} · 开支 ${this.money(expenses)} · 净额 ${row.netCashflow >= 0 ? '+' : ''}${this.money(row.netCashflow)} · 年末 ${this.money(row.closingCash)}`, new cc_1.Vec3(x, y), 14, row.netCashflow >= 0 ? UITheme_1.UITheme.gain : UITheme_1.UITheme.loss, 'center', 510, 42);
                    });
                }
                showEnding(state) {
                    const ending = state.ending;
                    const report = this.session.getReport();
                    if (!ending || !report) {
                        this.showHome();
                        return;
                    }
                    this.clearScreen();
                    this.createText('人生结算', new cc_1.Vec3(0, 290), 17, UITheme_1.UITheme.gold, 'center');
                    this.createText(`${ending.score}`, new cc_1.Vec3(0, 225), 66, UITheme_1.UITheme.goldSoft, 'center');
                    this.createText('综合评分', new cc_1.Vec3(0, 160), 15, UITheme_1.UITheme.quiet, 'center');
                    this.createText(ending.title, new cc_1.Vec3(0, 115), 34, UITheme_1.UITheme.text, 'center');
                    this.createText(ending.description, new cc_1.Vec3(0, 75), 18, UITheme_1.UITheme.muted, 'center', 1000);
                    this.createPanel(new cc_1.Vec3(0, 0), new cc_1.Vec3(980, 105), UITheme_1.UITheme.surface);
                    const newFamilies = this.session.newlyUnlockedFamilyNames();
                    const unlockText = newFamilies.length > 0 ? `\n新家庭已解锁：${newFamilies.join('、')}` : '';
                    this.createText(`${report.summary}\n最强维度：${report.strongestDimension} · 最大取舍：${report.greatestSacrifice}\n抓住的机遇：${report.opportunities.join('、') || '暂无'}${unlockText}`, new cc_1.Vec3(0, 0), 16, newFamilies.length > 0 ? UITheme_1.UITheme.goldSoft : UITheme_1.UITheme.info, 'center', 920, 86);
                    this.createText('选择一项重来传承', new cc_1.Vec3(0, -73), 21, UITheme_1.UITheme.gold, 'center');
                    this.session.getInheritanceChoices().forEach((reward, index) => {
                        this.createButton(`${reward.name}\n${reward.description}`, new cc_1.Vec3((index - 1) * 340, -165), new cc_1.Vec3(300, 88), () => this.selectInheritance(reward), index === 1 ? 'primary' : 'secondary');
                    });
                }
                selectInheritance(reward) {
                    this.session.chooseInheritance(reward);
                    this.clearScreen();
                    this.createText(`已选择：${reward.name}`, new cc_1.Vec3(0, 60), 30, cc_1.Color.WHITE, 'center');
                    const unlocked = this.session.newlyUnlockedFamilyNames();
                    this.createText(unlocked.length > 0 ? `它会在下一次重来时与你同行。\n已永久解锁家庭：${unlocked.join('、')}` : '它会在下一次重来时与你同行。', new cc_1.Vec3(0, 10), 20, new cc_1.Color(220, 226, 240), 'center');
                    this.createButton('再次重来', new cc_1.Vec3(0, -100), new cc_1.Vec3(280, 70), () => this.showHome(), 'secondary', false);
                }
                showToast(message) {
                    this.clearScreen();
                    this.createText(message, new cc_1.Vec3(0, 30), 26, cc_1.Color.WHITE, 'center');
                    this.createButton('返回主页', new cc_1.Vec3(0, -90), new cc_1.Vec3(260, 70), () => this.showHome(), 'secondary', false);
                }
                /** Shared alignment grid for every secondary page. */
                createPageHeader(title, subtitle, back) {
                    this.createText(title, new cc_1.Vec3(-500, 276), 36, UITheme_1.UITheme.text, 'left', 520, 54);
                    this.createText(subtitle, new cc_1.Vec3(-500, 228), 16, UITheme_1.UITheme.muted, 'left', 820, 42);
                    this.createButton('返回', new cc_1.Vec3(515, 270), new cc_1.Vec3(120, 42), back, 'ghost', false);
                    this.createPanel(new cc_1.Vec3(0, 198), new cc_1.Vec3(1080, 2), UITheme_1.UITheme.line);
                }
                clearScreen() {
                    this.resetPendingChoice();
                    this.uiRoot.removeAllChildren();
                    const background = new cc_1.Node('InkBackground');
                    background.addComponent(cc_1.UITransform).setContentSize(1280, 720);
                    this.drawRoundedRect(background, 1280, 720, 0, UITheme_1.UITheme.ink900);
                    // A quiet second layer prevents the backdrop from collapsing into featureless black.
                    const inner = new cc_1.Node('InkSurface');
                    inner.addComponent(cc_1.UITransform).setContentSize(1218, 658);
                    inner.setPosition(0, 0);
                    this.drawRoundedRect(inner, 1218, 658, 22, UITheme_1.UITheme.ink850, UITheme_1.UITheme.line);
                    background.addChild(inner);
                    this.uiRoot.addChild(background);
                }
                createPanel(position, size, color = UITheme_1.UITheme.surface, name = 'Panel') {
                    const node = new cc_1.Node(name);
                    node.addComponent(cc_1.UITransform).setContentSize(size.x, size.y);
                    node.setPosition(position);
                    this.drawRoundedRect(node, size.x, size.y, size.y <= 38 ? 12 : 16, color, UITheme_1.UITheme.line);
                    this.uiRoot.addChild(node);
                    return node;
                }
                /** Uses Graphics rather than an empty Sprite: runtime UI therefore has real card surfaces in Creator. */
                drawRoundedRect(node, width, height, radius, fill, stroke) {
                    const graphics = node.addComponent(cc_1.Graphics);
                    graphics.fillColor = fill;
                    if (radius > 0)
                        graphics.roundRect(-width / 2, -height / 2, width, height, radius);
                    else
                        graphics.rect(-width / 2, -height / 2, width, height);
                    graphics.fill();
                    if (stroke) {
                        graphics.strokeColor = stroke;
                        graphics.lineWidth = 1;
                        if (radius > 0)
                            graphics.roundRect(-width / 2, -height / 2, width, height, radius);
                        else
                            graphics.rect(-width / 2, -height / 2, width, height);
                        graphics.stroke();
                    }
                }
                createChip(text, position, width, color) {
                    const chip = this.createPanel(position, new cc_1.Vec3(width, 34), UITheme_1.UITheme.surface);
                    this.createTextOn(chip, text, cc_1.Vec3.ZERO, 15, color, 'center', width - 16, 28);
                }
                createStatBar(name, value, position, color) {
                    const bar = this.createPanel(position, new cc_1.Vec3(300, 36), UITheme_1.UITheme.surface);
                    const fill = new cc_1.Node('BarFill');
                    fill.addComponent(cc_1.UITransform).setContentSize(Math.max(4, 190 * Math.max(0, Math.min(value, 100)) / 100), 5);
                    fill.setPosition(-52 + (fill.getComponent(cc_1.UITransform).width - 190) / 2, -8);
                    this.drawRoundedRect(fill, fill.getComponent(cc_1.UITransform).width, 5, 3, color);
                    bar.addChild(fill);
                    this.createTextOn(bar, name, new cc_1.Vec3(-122, 7), 14, UITheme_1.UITheme.muted, 'left', 60, 24);
                    this.createTextOn(bar, `${Math.round(value)}`, new cc_1.Vec3(115, 7), 14, color, 'center', 46, 24);
                }
                createText(text, position, fontSize, color, align, width = 0, height = 0) {
                    const node = new cc_1.Node('Text');
                    const textWidth = width || 1100;
                    const textHeight = height || this.measureTextHeight(text, fontSize, textWidth);
                    node.addComponent(cc_1.UITransform).setContentSize(textWidth, textHeight);
                    node.setPosition(this.textPosition(position, textWidth, align));
                    const label = node.addComponent(cc_1.Label);
                    this.configureLabel(label, text, fontSize, color, align, height > 0);
                    this.uiRoot.addChild(node);
                    Motion_1.Motion.screenEnter(node);
                    return node;
                }
                createTextOn(parent, text, position, fontSize, color, align, width = 0, height = 0) {
                    const node = new cc_1.Node('Text');
                    const textWidth = width || 900;
                    const textHeight = height || this.measureTextHeight(text, fontSize, textWidth);
                    node.addComponent(cc_1.UITransform).setContentSize(textWidth, textHeight);
                    node.setPosition(this.textPosition(position, textWidth, align));
                    const label = node.addComponent(cc_1.Label);
                    this.configureLabel(label, text, fontSize, color, align, height > 0);
                    parent.addChild(node);
                    return node;
                }
                /**
                 * Cocos CLAMP cuts wrapped text when the transform still has a single-line height.
                 * Reserve the required number of lines for flowing copy; fixed cards use SHRINK so
                 * dynamic descriptions and large currency values remain completely visible.
                 */
                configureLabel(label, text, fontSize, color, align, constrained) {
                    label.string = text;
                    label.fontSize = fontSize;
                    label.lineHeight = Math.round(fontSize * 1.35);
                    label.color = color;
                    label.fontFamily = fontSize >= 30 ? UITheme_1.UITheme.serif : UITheme_1.UITheme.sans;
                    label.horizontalAlign = align === 'left' ? cc_1.Label.HorizontalAlign.LEFT : cc_1.Label.HorizontalAlign.CENTER;
                    label.verticalAlign = cc_1.Label.VerticalAlign.CENTER;
                    label.overflow = constrained ? cc_1.Label.Overflow.SHRINK : cc_1.Label.Overflow.CLAMP;
                    label.enableWrapText = true;
                }
                /** Estimate wrapped Chinese/Latin line count before Label performs its first layout. */
                measureTextHeight(text, fontSize, width) {
                    const lineHeight = Math.round(fontSize * 1.35);
                    const lineCapacity = Math.max(1, width / fontSize);
                    const lines = text.split('\n').reduce((total, paragraph) => {
                        const units = Array.from(paragraph).reduce((sum, character) => sum + (/[\u0000-\u00ff]/.test(character) ? .55 : 1), 0);
                        return total + Math.max(1, Math.ceil(units / lineCapacity));
                    }, 0);
                    return Math.max(30, lines * lineHeight + 8);
                }
                /** Left-aligned call sites pass the desired left edge, while Cocos positions nodes by their centre anchor. */
                textPosition(position, width, align) {
                    return align === 'left' ? new cc_1.Vec3(position.x + width / 2, position.y, position.z) : position;
                }
                createButton(text, position, size, onClick, kind = 'secondary', confirmOnSecondClick = true) {
                    return this.createButtonInternal(this.uiRoot, text, position, size, onClick, kind, confirmOnSecondClick);
                }
                createButtonOn(parent, text, position, size, onClick, kind = 'secondary', confirmOnSecondClick = true) {
                    return this.createButtonInternal(parent, text, position, size, onClick, kind, confirmOnSecondClick);
                }
                createButtonInternal(parent, text, position, size, onClick, kind, confirmOnSecondClick) {
                    var _a;
                    const node = new cc_1.Node('ChoiceButton');
                    node.addComponent(cc_1.UITransform).setContentSize(size.x, size.y);
                    node.setPosition(position);
                    this.paintButton(node, size, kind, false);
                    const button = node.addComponent(cc_1.Button);
                    button.transition = cc_1.Button.Transition.COLOR;
                    button.target = node;
                    button.normalColor = cc_1.Color.WHITE;
                    button.pressedColor = kind === 'primary' ? UITheme_1.UITheme.goldSoft : UITheme_1.UITheme.line;
                    node.on(cc_1.Node.EventType.TOUCH_END, () => {
                        if (confirmOnSecondClick)
                            this.armChoice(node, () => this.paintButton(node, size, kind, false), () => this.paintButton(node, size, kind, true), onClick);
                        else {
                            this.resetPendingChoice();
                            onClick();
                        }
                    }, this);
                    parent.addChild(node);
                    const buttonLabel = this.createTextOn(node, text, cc_1.Vec3.ZERO, size.y >= 75 ? 17 : 18, kind === 'primary' ? UITheme_1.UITheme.ink900 : UITheme_1.UITheme.text, 'center', size.x - 24);
                    (_a = buttonLabel.getComponent(cc_1.UITransform)) === null || _a === void 0 ? void 0 : _a.setContentSize(size.x - 24, size.y - 14);
                    const label = buttonLabel.getComponent(cc_1.Label);
                    if (label)
                        label.overflow = cc_1.Label.Overflow.SHRINK;
                    if (parent === this.uiRoot)
                        Motion_1.Motion.screenEnter(node, .04);
                    return node;
                }
                /** First click only arms and highlights a choice; a second click on the same node confirms it. */
                armChoice(node, reset, select, confirm) {
                    var _a;
                    if (((_a = this.pendingChoice) === null || _a === void 0 ? void 0 : _a.node) === node) {
                        const pending = this.pendingChoice;
                        this.pendingChoice = undefined;
                        pending.reset();
                        confirm();
                        return;
                    }
                    this.resetPendingChoice();
                    select();
                    this.pendingChoice = { node, reset };
                }
                resetPendingChoice() {
                    var _a;
                    const pending = this.pendingChoice;
                    this.pendingChoice = undefined;
                    if ((_a = pending === null || pending === void 0 ? void 0 : pending.node) === null || _a === void 0 ? void 0 : _a.isValid)
                        pending.reset();
                }
                paintButton(node, size, kind, selected) {
                    var _a;
                    const graphics = (_a = node.getComponent(cc_1.Graphics)) !== null && _a !== void 0 ? _a : node.addComponent(cc_1.Graphics);
                    graphics.clear();
                    const fill = selected
                        ? kind === 'primary' ? new cc_1.Color(255, 210, 128, 255) : new cc_1.Color(65, 77, 99, 255)
                        : kind === 'primary' ? UITheme_1.UITheme.gold : kind === 'ghost' ? UITheme_1.UITheme.ink850 : UITheme_1.UITheme.surfaceRaised;
                    const stroke = selected ? UITheme_1.UITheme.goldSoft : kind === 'primary' ? UITheme_1.UITheme.goldSoft : UITheme_1.UITheme.line;
                    const radius = size.y <= 52 ? 12 : 16;
                    graphics.fillColor = fill;
                    graphics.roundRect(-size.x / 2, -size.y / 2, size.x, size.y, radius);
                    graphics.fill();
                    graphics.strokeColor = stroke;
                    graphics.lineWidth = selected ? 4 : 1;
                    graphics.roundRect(-size.x / 2, -size.y / 2, size.x, size.y, radius);
                    graphics.stroke();
                }
                createTalentButton(text, position, size, rarity, onClick) {
                    const node = new cc_1.Node('TalentButton');
                    node.addComponent(cc_1.UITransform).setContentSize(size.x, size.y);
                    node.setPosition(position);
                    const fill = rarity === 'legendary' ? new cc_1.Color(83, 61, 31) : rarity === 'rare' ? new cc_1.Color(39, 62, 88) : UITheme_1.UITheme.surfaceRaised;
                    const stroke = rarity === 'legendary' ? UITheme_1.UITheme.goldSoft : rarity === 'rare' ? UITheme_1.UITheme.info : UITheme_1.UITheme.line;
                    this.drawRoundedRect(node, size.x, size.y, 16, fill, stroke);
                    const button = node.addComponent(cc_1.Button);
                    button.transition = cc_1.Button.Transition.COLOR;
                    button.target = node;
                    button.normalColor = cc_1.Color.WHITE;
                    button.pressedColor = stroke;
                    node.on(cc_1.Node.EventType.TOUCH_END, () => this.armChoice(node, () => this.paintTalentButton(node, size, fill, stroke, false), () => this.paintTalentButton(node, size, fill, stroke, true), onClick), this);
                    this.uiRoot.addChild(node);
                    const labelNode = this.createTextOn(node, text, cc_1.Vec3.ZERO, 16, UITheme_1.UITheme.text, 'center', size.x - 24, size.y - 18);
                    const label = labelNode.getComponent(cc_1.Label);
                    if (label)
                        label.overflow = cc_1.Label.Overflow.SHRINK;
                    Motion_1.Motion.screenEnter(node, .04);
                    return node;
                }
                paintTalentButton(node, size, fill, stroke, selected) {
                    var _a;
                    const graphics = (_a = node.getComponent(cc_1.Graphics)) !== null && _a !== void 0 ? _a : node.addComponent(cc_1.Graphics);
                    graphics.clear();
                    graphics.fillColor = selected ? new cc_1.Color(Math.min(255, fill.r + 24), Math.min(255, fill.g + 24), Math.min(255, fill.b + 24), 255) : fill;
                    graphics.roundRect(-size.x / 2, -size.y / 2, size.x, size.y, 16);
                    graphics.fill();
                    graphics.strokeColor = selected ? UITheme_1.UITheme.goldSoft : stroke;
                    graphics.lineWidth = selected ? 4 : 1;
                    graphics.roundRect(-size.x / 2, -size.y / 2, size.x, size.y, 16);
                    graphics.stroke();
                }
                createTextButton(text, position, onClick) {
                    const button = this.createText(text, position, 17, UITheme_1.UITheme.info, 'center', 150);
                    button.on(cc_1.Node.EventType.TOUCH_END, onClick, this);
                }
                createTextButtonOn(parent, text, position, onClick) {
                    const button = this.createTextOn(parent, text, position, 16, UITheme_1.UITheme.info, 'center', 380);
                    button.on(cc_1.Node.EventType.TOUCH_END, onClick, this);
                }
                identitySummary(identity) {
                    var _a;
                    const bonuses = [...Object.entries(identity.attributeModifiers), ...Object.entries((_a = identity.skillModifiers) !== null && _a !== void 0 ? _a : {})].map(([key, value]) => `${this.nameOf(key)}+${value}`);
                    const bonusText = bonuses.length ? ` · ${bonuses.join(' · ')}` : '';
                    return `资源 ${this.money(identity.initialFamilyResources)} · 年资助 ${this.money(identity.familyAllowanceAnnual)}${bonusText}\n机会：${identity.opportunityFocus}`;
                }
                effectSummary(result) {
                    var _a, _b, _c;
                    const entries = [...Object.entries((_a = result.attributes) !== null && _a !== void 0 ? _a : {}), ...Object.entries((_b = result.skills) !== null && _b !== void 0 ? _b : {}), ...Object.entries((_c = result.stats) !== null && _c !== void 0 ? _c : {})];
                    const visible = entries.filter(([, value]) => value !== 0).slice(0, 3).map(([key, value]) => `${this.nameOf(key)}${value > 0 ? '+' : ''}${value}`);
                    return visible.join(' · ') || '开启特殊人生路径';
                }
                optionImpact(result) {
                    var _a, _b;
                    const changes = [];
                    const append = (items, kind = 'value') => {
                        Object.entries(items !== null && items !== void 0 ? items : {}).forEach(([key, value]) => {
                            if (value === 0)
                                return;
                            changes.push(`${this.nameOf(key)}${value > 0 ? '+' : ''}${kind === 'money' ? this.money(value) : value}`);
                        });
                    };
                    append(result.attributes);
                    append(result.skills);
                    Object.entries((_a = result.stats) !== null && _a !== void 0 ? _a : {}).forEach(([key, value]) => {
                        if (!value)
                            return;
                        const moneyValue = key === 'funds' || key === 'familyResources';
                        changes.push(`${this.nameOf(key)}${value > 0 ? '+' : ''}${moneyValue ? this.money(value) : value}`);
                    });
                    const relationshipNames = { father: '父亲关系', mother: '母亲关系', friend: '朋友关系', partner: '伴侣关系', mentor: '导师关系' };
                    Object.entries((_b = result.relationships) !== null && _b !== void 0 ? _b : {}).forEach(([key, value]) => { var _a; if (value)
                        changes.push(`${(_a = relationshipNames[key]) !== null && _a !== void 0 ? _a : key}${value > 0 ? '+' : ''}${value}`); });
                    if (result.projectInvestment)
                        changes.unshift(`行业投入-${this.money(result.projectInvestment.amount)}（转为项目资产）`);
                    return changes.join(' · ') || '仅记录信息，不改变数值';
                }
                sparkline(values) {
                    if (values.length === 0)
                        return '暂无';
                    const blocks = '▁▂▃▄▅▆▇█';
                    const min = Math.min(...values);
                    const max = Math.max(...values);
                    if (min === max)
                        return values.map(() => '▄').join('');
                    return values.map((value) => blocks[Math.min(7, Math.floor((value - min) / (max - min) * 7))]).join('');
                }
                marketRequirements(instrument) {
                    var _a;
                    const conditions = (_a = instrument.prerequisites) !== null && _a !== void 0 ? _a : [];
                    if (conditions.length === 0)
                        return '无额外条件';
                    return conditions.map((condition) => {
                        const match = condition.match(/^(attributes|skills|stats)\.([a-zA-Z]+)(>=|<=)(\d+)$/);
                        if (match)
                            return `${this.nameOf(match[2])}${match[3]}${match[4]}`;
                        if (condition.startsWith('flags.'))
                            return condition === 'flags.computer-intro' ? '先接触电脑与互联网信息' : '完成对应前置事件';
                        return condition;
                    }).join('、');
                }
                focusName(focus) {
                    return { study: '学习成长', work: '专注工作', rest: '游玩休息', social: '陪伴生活' }[focus];
                }
                focusButtonLabel(state, focus) {
                    if (state.age < 18)
                        return {
                            study: '学习成长\n升学分+2 · 知识+3',
                            work: '实践劳动\n零用钱+¥1,500 · 执行/商业+1',
                            rest: '游玩休息\n健康+3 · 压力-8 · 幸福+5',
                            social: '陪伴生活\n朋友关系+3 · 幸福+6 · 压力-5',
                        }[focus];
                    if (state.career.track === 'unemployed')
                        return {
                            study: '学习成长\n学习+2 · 信息+1 · 求职准备',
                            work: '兼职实践\n年收入+¥12,000 · 职业能力↑',
                            rest: '游玩休息\n健康+3 · 压力-8 · 幸福+5',
                            social: '陪伴生活\n现金-¥4,000 · 幸福+6 · 压力-5',
                        }[focus];
                    if (focus === 'study')
                        return '学习成长\n工资×0.90 · 学习+2 · 信息+1';
                    if (focus === 'work')
                        return '专注工作\n工资×1.25 · 职业技能↑ · 压力+3';
                    if (focus === 'rest')
                        return '游玩休息\n工资×0.70 · 健康+3 · 幸福+5';
                    return '陪伴生活\n工资×0.85 · 现金-¥4,000 · 幸福+6';
                }
                focusAdvice(state) {
                    if (state.stats.health < 45 || state.stats.pressure >= 70 || state.stats.happiness < 35)
                        return '优先休息，避免健康或幸福崩溃';
                    if (state.career.track === 'unemployed')
                        return '优先学习，提高毕业后的职业选择空间';
                    if (state.finance.lastCashflow < 0 || state.stats.funds < state.finance.livingCostAnnual * 2)
                        return '优先工作，先修复现金流';
                    if (state.skills.information < 35 || state.skills.technology < 35)
                        return '学习能提高未来行业与机会判断';
                    if (state.stats.familyBond < 45 || state.stats.happiness < 50)
                        return '陪伴生活能修复家庭关系与幸福感';
                    return '资源健康，可根据长期目标选择工作、学习或生活平衡';
                }
                pressureRule(pressure) {
                    if (pressure < 40)
                        return '平稳（无额外损耗）';
                    if (pressure < 60)
                        return '紧绷（每年幸福 -1）';
                    if (pressure < 80)
                        return '高压（每年幸福 -4、健康 -4；收入可能下降）';
                    return '濒临崩溃（每年幸福 -8、健康 -9、知识 -2；收入大幅下降）';
                }
                startupName(type) { var _a; return (_a = { ecommerce: '电商店铺', 'local-service': '本地服务', content: '内容工作室', software: '软件工具', emerging: '智能自动化' }[type]) !== null && _a !== void 0 ? _a : '创业项目'; }
                startupStageName(stage) { return stage ? ({ launch: '启动期', stable: '稳定期', expansion: '扩张期' })[stage] : '未启动'; }
                statusSummary(state) {
                    const stats = state.stats;
                    return `现金 ${this.money(stats.funds)}   健康 ${stats.health}   压力 ${stats.pressure}   幸福 ${stats.happiness}   知识 ${stats.knowledge}   信息 ${stats.informationValue}`;
                }
                /** All economy values are stored in ten-thousand-yuan units and shown as RMB. */
                money(amount) { return `¥${Math.round(amount * 10000).toLocaleString('zh-CN')}`; }
                rarityName(rarity) { return { common: '普通', rare: '稀有', legendary: '传奇' }[rarity]; }
                accuracyName(accuracy) { return { clear: '清晰记忆', 'fairly-clear': '较清晰记忆', blurred: '模糊记忆', fragmentary: '残缺记忆' }[accuracy]; }
                educationName(level) { return ({ primary: '小学', middle: '初中', high: '高中', vocational: '中专', college: '专科', undergraduate: '本科', 'first-tier': '一本', '211': '211', '985': '985', graduate: '研究生' })[level]; }
                highSchoolName(track) { return track ? ({ vocational: '中专', general: '普高', key: '重点高中' })[track] : '未录取'; }
                cityName(city) { return ({ rural: '农村', county: '县城', city: '普通城市', metropolis: '大城市' })[city]; }
                majorName(major) { return ({ engineering: '计算机和工程', business: '商业和经济', media: '人文和传媒', research: '教育和研究', 'public-service': '公共管理', general: '综合方向' })[major]; }
                careerName(track) { return ({ technology: '技术研发', product: '产品运营', sales: '销售商务', education: '教育研究', media: '内容传媒', 'public-service': '公共服务', unemployed: '待业/探索' })[track]; }
                careerLevelName(level) { return ({ junior: '初级', middle: '中级', senior: '高级', core: '核心人物' })[level]; }
                assetName(type) { return ({ savings: '储蓄', housing: '住房', emerging: '新兴资产', startup: '创业项目' })[type]; }
                marketKindName(kind) { var _a; return (_a = { stock: '股票', fund: '基金', bond: '债券' }[kind]) !== null && _a !== void 0 ? _a : '投资品种'; }
                nameOf(key) { var _a; return (_a = { intelligence: '智力', emotionalIntelligence: '情商', constitution: '体质', execution: '执行力', charm: '魅力', luck: '运气', learning: '学习', technology: '技术', business: '商业', expression: '表达', management: '管理', information: '信息', funds: '现金', familyResources: '家庭资源', health: '健康', pressure: '压力', happiness: '幸福', knowledge: '知识', informationValue: '信息值', familyBond: '家庭关系', worldShift: '时代认知' }[key]) !== null && _a !== void 0 ? _a : '未分类属性'; }
            };
            exports_1("GameBootstrap", GameBootstrap);
            exports_1("GameBootstrap", GameBootstrap = __decorate([
                ccclass('GameBootstrap')
            ], GameBootstrap));
            cc_1.cclegacy._RF.pop();
        }
    };
});

System.register("chunks:///_virtual/GameEvents.ts",["cc","./EducationEvents.ts","./IndependentLifeEvents.ts","./OpportunityEvents.ts","./StarterEvents.ts","./LaterLifeEvents.ts","./FutureTransitionEvents.ts","./FamilyOpportunityEvents.ts","./IndustryOpportunityEvents.ts","./CareerPathEvents.ts"],(function(t){var n,E,e,s,T,i,u,c,N,o;return{setters:[function(t){n=t.cclegacy},function(t){E=t.EDUCATION_EVENTS},function(t){e=t.INDEPENDENT_LIFE_EVENTS},function(t){s=t.OPPORTUNITY_EVENTS},function(t){T=t.STARTER_EVENTS},function(t){i=t.LATER_LIFE_EVENTS},function(t){u=t.FUTURE_TRANSITION_EVENTS},function(t){c=t.FAMILY_OPPORTUNITY_EVENTS},function(t){N=t.INDUSTRY_OPPORTUNITY_EVENTS},function(t){o=t.CAREER_PATH_EVENTS}],execute:function(){n._RF.push({},"b01b4LRUYhJxqS9Z6q/SNs7","GameEvents",void 0);t("GAME_EVENTS",[].concat(T,E,c,e,o,s,N,u,i));n._RF.pop()}}}));

System.register("chunks:///_virtual/GameSession.ts",["./rollupPluginModLoBabelHelpers.js","cc","./IdentityConfig.ts","./GameEvents.ts","./YearConfig.ts","./InheritanceConfig.ts","./DelayedEventQueue.ts","./EventMatcher.ts","./SaveManager.ts","./EndingResolver.ts","./LegacyManager.ts","./ReportGenerator.ts","./SeededRandom.ts","./GameStateManager.ts","./MarketSystem.ts","./InvestmentMemoryManager.ts","./EducationProgressionSystem.ts","./FinanceSystem.ts","./CareerSystem.ts","./StartupSystem.ts","./CitySystem.ts","./HousingSystem.ts","./FamilyUnlockManager.ts","./IndustryProjectSystem.ts","./WealthSystem.ts"],(function(t){var e,s,i,n,a,r,h,o,u,c,l,f,d,v,p,m,g,y,w,k,E,M,S,I,C;return{setters:[function(t){e=t.createClass},function(t){s=t.cclegacy},function(t){i=t.IDENTITIES},function(t){n=t.GAME_EVENTS},function(t){a=t.getYearConfig},function(t){r=t.INHERITANCE_REWARDS},function(t){h=t.DelayedEventQueue},function(t){o=t.EventMatcher},function(t){u=t.SaveManager},function(t){c=t.EndingResolver},function(t){l=t.LegacyManager},function(t){f=t.ReportGenerator},function(t){d=t.SeededRandom},function(t){v=t.GameStateManager},function(t){p=t.MarketSystem},function(t){m=t.InvestmentMemoryManager},function(t){g=t.EducationProgressionSystem},function(t){y=t.FinanceSystem},function(t){w=t.CareerSystem},function(t){k=t.StartupSystem},function(t){E=t.CitySystem},function(t){M=t.HousingSystem},function(t){S=t.FamilyUnlockManager},function(t){I=t.IndustryProjectSystem},function(t){C=t.totalAssetValue}],execute:function(){s._RF.push({},"80fccRowfBOLIj+dIUkGmhy","GameSession",void 0);t("GameSession",function(){function t(){this.stateManager=new v,this.eventMatcher=new o,this.saves=new u,this.delayedEvents=new h,this.endings=new c,this.reports=new f,this.legacy=new l,this.market=new p,this.investmentMemory=new m,this.education=new g,this.finance=new y,this.careers=new w,this.startups=new k,this.cities=new E,this.housing=new M,this.familyUnlocks=new S,this.industryProjects=new I,this.random=new d(Date.now()),this.currentEvent=void 0,this.latestOutcome=void 0,this.state=void 0,this.newlyUnlockedFamilyIds=[]}var s=t.prototype;return s.start=function(t,e,s){var n;void 0===e&&(e="original"),void 0===s&&(s=Date.now());var a=i.find((function(e){return e.id===t}));if(!a)throw new Error("未找到所选家庭身份。");if(!this.familyUnlocks.isUnlocked(t))throw new Error("该家庭尚未解锁："+(null!=(n=a.unlockDescription)?n:"请先完成人生目标。"));this.newlyUnlockedFamilyIds=[],this.random=new d(s),this.state=this.stateManager.createNewGame(e,a,s),this.state.market.insightIds=this.investmentMemory.load();var r=this.legacy.load();return r&&this.stateManager.applyChange(this.state,r.result),this.matchNextEvent(),this.save(),this.snapshot()},s.getCurrentEvent=function(){return this.currentEvent},s.pickDistinct=function(t,e){var s=this;return[].concat(t).sort((function(){return s.random.next()-.5})).slice(0,e)},s.rollPercentage=function(){return 100*this.random.next()},s.getLatestOutcome=function(){return this.latestOutcome},s.applyStartup=function(t,e,s){if(!this.state)throw new Error("人生尚未开始。");return this.stateManager.applyChange(this.state,t.result),this.stateManager.applyChange(this.state,e.result),this.stateManager.applyChange(this.state,s.result),this.state.talentId=t.id,this.state.defectId=e.id,this.state.memoryId=s.id,this.save(),this.snapshot()},s.choose=function(t){var e,s,i,n,a,r;if(!this.state||!this.currentEvent)throw new Error("当前没有可选择的事件。");var h=this.currentEvent.options.find((function(e){return e.id===t}));if(!h)throw new Error("该选项已经失效，请重新选择。");if(Math.max(0,-(null!=(e=null==(s=h.result.stats)?void 0:s.funds)?e:0))+(null!=(i=null==(n=h.result.projectInvestment)?void 0:n.amount)?i:0)>this.state.stats.funds)throw new Error("现金不足，无法承担这项选择。现金流良好时可先前往交易所申请贷款。");if(Math.max(0,-(null!=(a=null==(r=h.result.stats)?void 0:r.familyResources)?a:0))>this.state.stats.familyResources)throw new Error("家庭资源不足，无法推动这项家庭决策。");return this.resolve(this.currentEvent,h),this.save(),this.snapshot()},s.declineCurrentEvent=function(){if(!this.state||!this.currentEvent)throw new Error("当前没有待处理事件。");var t=this.currentEvent;if(!t.declineAllowed)throw new Error("这不是可以直接错过的商业机会，请选择一种具体处理方式。");return this.resolve(t,{id:"decline-opportunity",label:"不采取行动",result:{}}),this.save(),this.snapshot()},s.continueYear=function(){return this.continueYears(this.random.int(1,3))},s.continueYears=function(t){if(!this.state)throw new Error("人生尚未开始。");if(this.currentEvent)throw new Error("请先处理当前事件。");for(var e=Math.max(1,Math.min(3,Math.floor(t))),s=0;s<e&&!this.state.completed&&(this.finishYear(1),this.matchNextEvent(!0),!this.currentEvent);s+=1);return this.save(),this.snapshot()},s.setLifeFocus=function(t){if(!this.state)throw new Error("人生尚未开始。");if("work"===t&&"unemployed"===this.state.career.track)throw new Error("你还没有正式工作。当前可以优先学习、休息或社交，等待毕业后的职业节点。");return this.state.lifeFocus=t,this.finance.refresh(this.state),this.save(),this.snapshot()},s.recoverWellbeing=function(t){var e,s;if(!this.state)throw new Error("人生尚未开始。");if(this.state.lastWellbeingYear===this.state.year)throw new Error("今年已经安排过一次恢复行动。把下一次留给新的年份。");var i={pause:{stats:{pressure:-14,happiness:8,health:3}},care:{stats:{funds:-1.5,pressure:-20,happiness:6,health:8},addFlags:["wellbeing-care"]},connection:{stats:{funds:-.8,pressure:-10,happiness:12,familyBond:4},relationships:{friend:4,partner:2}}}[t],n=Math.max(0,-(null!=(e=null==(s=i.stats)?void 0:s.funds)?e:0));if(n>this.state.stats.funds)throw new Error("这项恢复安排需要 ¥"+Math.round(1e4*n).toLocaleString("zh-CN")+"。");return this.stateManager.applyChange(this.state,i),this.state.lastWellbeingYear=this.state.year,this.save(),this.snapshot()},s.getYearInfo=function(){return this.state?a(this.state.year):void 0},s.marketInstruments=function(){return this.state?this.market.instruments(this.state):[]},s.canResearchMarket=function(t){return!!this.state&&this.market.canResearch(this.state,this.market.find(t,this.state))},s.canTradeMarket=function(){return!!this.state&&this.market.canTrade(this.state)},s.acceptMarketRisk=function(){if(!this.state)throw new Error("人生尚未开始。");return this.market.acceptRisk(this.state),this.save(),this.snapshot()},s.researchMarket=function(t){if(!this.state)throw new Error("人生尚未开始。");var e=this.market.research(this.state,t),s=this.market.insightIdsFor(e);return this.state.market.insightIds=this.investmentMemory.remember([].concat(this.state.market.insightIds,s)),this.save(),e},s.buyMarket=function(t,e){if(!this.state)throw new Error("人生尚未开始。");return this.market.buy(this.state,t,e),this.save(),this.snapshot()},s.sellMarket=function(t,e){if(!this.state)throw new Error("人生尚未开始。");return this.market.sell(this.state,t,e),this.save(),this.snapshot()},s.marketValue=function(){return this.state?this.market.portfolioValue(this.state):0},s.totalAssetValue=function(){return this.state?C(this.state):0},s.marketChange=function(t){if(!this.state)return{amount:0,percent:0};var e=this.market.find(t,this.state);return this.market.change(e,this.state.year)},s.marketHistory=function(t,e){if(void 0===e&&(e=5),!this.state)return[];var s=this.market.find(t,this.state);return this.market.history(s,this.state.year,e)},s.marketInsightNames=function(){return this.state?this.market.insightNames(this.state.market.insightIds):[]},s.learningIndex=function(){return this.state?this.education.learningIndex(this.state):0},s.educationAdmissionPreview=function(t){if(this.state)return"education-subject-direction"===t?this.education.highSchoolPreview(this.state):"education-entrance-exam"===t?this.education.universityPreview(this.state):void 0},s.takeLoan=function(t){if(!this.state)throw new Error("人生尚未开始。");return this.finance.takeLoan(this.state,t),this.save(),this.snapshot()},s.repayLoan=function(t){if(!this.state)throw new Error("人生尚未开始。");return this.finance.repayLoan(this.state,t),this.save(),this.snapshot()},s.promotionScore=function(){return this.state?this.careers.promotionScore(this.state.attributes,this.state.skills,this.state.career.track):0},s.promotionRequirement=function(){return this.state?this.careers.requirement(this.state):void 0},s.startProject=function(t){if(!this.state)throw new Error("人生尚未开始。");return this.startups.startProject(this.state,t),this.save(),this.snapshot()},s.startupPreview=function(t){return this.startups.preview(t)},s.startupChance=function(t){return this.state?this.startups.successRate(this.state,t):0},s.startupSuccessRate=function(){return this.state?this.startups.successRate(this.state):0},s.advanceStartup=function(){var t=this;return this.useAnnualAction("startup-advance","创业项目每年只能推进一次。",(function(){return t.startups.advanceStage(t.state)}))},s.exitStartup=function(){if(!this.state)throw new Error("人生尚未开始。");return this.startups.exit(this.state),this.save(),this.snapshot()},s.migrateCity=function(t){if(!this.state)throw new Error("人生尚未开始。");return this.cities.migrate(this.state,t),this.finance.refresh(this.state),this.save(),this.snapshot()},s.migrationPreview=function(t){if(!this.state)throw new Error("人生尚未开始。");return this.cities.preview(this.state,t)},s.housingProducts=function(){return this.state?this.housing.products(this.state.education.city):[]},s.housingPrice=function(t){if(!this.state)return 0;var e=this.housing.products(this.state.education.city).find((function(e){return e.id===t}));return e?this.housing.price(e,this.state.year):0},s.buyHousing=function(t){if(!this.state)throw new Error("人生尚未开始。");return this.housing.buy(this.state,t),this.save(),this.snapshot()},s.sellHousing=function(t){if(!this.state)throw new Error("人生尚未开始。");return this.housing.sell(this.state,t),this.save(),this.snapshot()},s.industryProjectConfigs=function(){return this.state?this.industryProjects.available(this.state):[]},s.exitIndustryProject=function(t){if(!this.state)throw new Error("人生尚未开始。");return this.industryProjects.exit(this.state,t),this.save(),this.snapshot()},s.graduateSchool=function(){var t=this;return this.useAnnualAction("education-action","今年已经安排过一次进修。",(function(){t.education.applyGraduateSchool(t.state),t.finance.refresh(t.state)}))},s.certificate=function(t){var e=this;return this.useAnnualAction("education-action","今年已经安排过一次进修。",(function(){return e.education.applyCertificate(e.state,t)}))},s.selfStudy=function(t){var e=this;return this.useAnnualAction("education-action","今年已经安排过一次进修。",(function(){return e.education.applySelfStudy(e.state,t)}))},s.marketPrice=function(t){return this.state?this.market.price(this.market.find(t,this.state),this.state.year):0},s.getReport=function(){return this.state?this.reports.generate(this.state):void 0},s.familyUnlockStatuses=function(){return this.familyUnlocks.statuses()},s.newlyUnlockedFamilyNames=function(){return this.newlyUnlockedFamilyIds.map((function(t){var e;return null==(e=i.find((function(e){return e.id===t})))?void 0:e.name})).filter((function(t){return!!t}))},s.hasArchive=function(){return this.saves.hasSave()},s.hasContinuableSave=function(){return this.saves.hasContinuableSave()},s.loadArchive=function(){return this.tryRestore()},s.getInheritanceChoices=function(){var t=this;return[].concat(r).sort((function(){return t.random.next()-.5})).slice(0,3)},s.chooseInheritance=function(t){this.legacy.save(t)},s.tryRestore=function(){var t=this.saves.load();if(t)return this.state=t,this.education.repairMilestones(this.state),this.state.market.insightIds=this.investmentMemory.remember(this.state.market.insightIds),this.finance.refresh(this.state),this.random=new d(t.seed+t.year+t.triggeredEventIds.length),this.currentEvent=n.find((function(e){return e.id===t.activeEventId})),this.newlyUnlockedFamilyIds=t.completed?this.familyUnlocks.evaluate(t):[],this.currentEvent||t.completed||this.matchNextEvent(),this.save(),this.snapshot()},s.snapshot=function(){if(!this.state)throw new Error("人生尚未开始。");return JSON.parse(JSON.stringify(this.state))},s.resolve=function(t,e){this.state&&(e.result.projectInvestment&&this.industryProjects.invest(this.state,e.result.projectInvestment.projectId,e.result.projectInvestment.amount),this.stateManager.applyChange(this.state,e.result),this.latestOutcome=void 0,"education-subject-direction"===t.id&&this.education.resolveHighSchool(this.state),"education-entrance-exam"===t.id&&this.education.resolveUniversity(this.state),this.finance.refresh(this.state),this.state.triggeredEventIds.includes(t.id)||this.state.triggeredEventIds.push(t.id),this.state.lifeLog.push({year:this.state.year,eventId:t.id,optionId:e.id}),this.currentEvent=void 0,this.state.activeEventId=void 0)},s.finishYear=function(t){if(void 0===t&&(t=this.random.int(1,3)),this.state)if(this.state.age>=80)this.completeLife();else{var e=Math.min(t,80-this.state.age);this.state.year<2026&&this.state.year+e>2026&&(e=2026-this.state.year);var s=this.nextRequiredYear();void 0!==s&&this.state.year<s&&this.state.year+e>s&&(e=s-this.state.year);for(var i=0;i<e;i+=1){if(this.applyLifeFocus(),this.stateManager.advanceYears(this.state,1),this.state.age>=18&&this.state.finance.lastCashflow<0&&this.state.stats.funds<=0){this.state.flags.includes("cashflow-collapse")||this.state.flags.push("cashflow-collapse"),this.completeLife();break}if(this.state.stats.happiness<=0){this.state.flags.includes("happiness-collapse")||this.state.flags.push("happiness-collapse"),this.completeLife();break}}this.state.age>=80&&this.completeLife()}},s.matchNextEvent=function(t){var e;if(void 0===t&&(t=!1),!(!this.state||this.state.age>=80||this.state.completed)){this.market.revealFutureInstrument(this.state,this.random);var s=this.eventMatcher.pick(this.state,n.filter((function(t){return t.forced})),this.random);if(s)this.currentEvent=s;else{var i=this.delayedEvents.takeDue(this.state);if(i)this.currentEvent=n.find((function(t){return t.id===i.eventId}));else if(t&&this.random.next()<this.eventDensity){var a=this.random.next()<.28?this.eventMatcher.pick(this.state,n.filter((function(t){return"opportunity"===t.interaction})),this.random):void 0;this.currentEvent=null!=a?a:this.eventMatcher.pick(this.state,n.filter((function(t){return!t.forced&&"opportunity"!==t.interaction})),this.random)}else this.currentEvent=void 0}this.state.activeEventId=null==(e=this.currentEvent)?void 0:e.id}},s.applyLifeFocus=function(){if(this.state){var t=this.state.lifeFocus;if("study"===t)this.stateManager.applyChange(this.state,this.state.age<18?{education:{studyHabit:2,academicScore:2,studyYears:1},skills:{learning:2},stats:{knowledge:3,pressure:3,happiness:-1}}:{skills:{learning:2,information:1},stats:{knowledge:2,pressure:2,happiness:-1}});else if("work"===t)if("unemployed"===this.state.career.track)this.stateManager.applyChange(this.state,this.state.age<18?{attributes:{execution:1},skills:{business:1},stats:{pressure:2,happiness:-1}}:{skills:{management:1,business:1,information:1},stats:{pressure:3,happiness:-1}});else{var e="technology"===this.state.career.track?{technology:2,information:1}:"product"===this.state.career.track?{management:2,business:1,information:1}:"sales"===this.state.career.track?{business:2,expression:1}:"education"===this.state.career.track?{learning:2,expression:1}:"media"===this.state.career.track?{expression:2,information:1}:{management:1,learning:1,information:1},s="education"===this.state.career.track?2:0;this.stateManager.applyChange(this.state,{skills:e,stats:{pressure:3,happiness:-1,knowledge:s}})}else"rest"===t?this.stateManager.applyChange(this.state,{stats:{health:3,pressure:-8,happiness:5}}):"social"===t&&this.stateManager.applyChange(this.state,{relationships:{friend:3},stats:{happiness:6,pressure:-5},skills:{expression:1}})}},s.save=function(){this.state&&this.saves.save(this.state)},s.useAnnualAction=function(t,e,s){if(!this.state)throw new Error("人生尚未开始。");if(this.state.annualActionYears[t]===this.state.year)throw new Error(e);return s(),this.state.annualActionYears[t]=this.state.year,this.save(),this.snapshot()},s.completeLife=function(){this.state&&!this.state.completed&&(this.state.completed=!0,this.state.ending=this.endings.resolve(this.state),this.newlyUnlockedFamilyIds=this.familyUnlocks.evaluate(this.state),this.currentEvent=void 0,this.state.activeEventId=void 0)},s.nextRequiredYear=function(){if(this.state)return this.state.flags.includes("high-school-placement")?this.state.flags.includes("university-entry")?this.state.flags.includes("career-started")?void 0:2013:2010:2008},e(t,[{key:"eventDensity",get:function(){return this.state?this.state.age<15?.7:this.state.age<22?.9:this.state.age<40?1:.6:0}}]),t}());s._RF.pop()}}}));

System.register("chunks:///_virtual/GameStateManager.ts",["./rollupPluginModLoBabelHelpers.js","cc","./SeededRandom.ts","./AssetSystem.ts","./HealthSystem.ts","./OpportunitySystem.ts","./FinanceSystem.ts","./HousingSystem.ts","./IndustryProjectSystem.ts","./CareerSystem.ts"],(function(e){var t,s,a,i,n,r,o,l,c,u,p,d;return{setters:[function(e){t=e.extends,s=e.objectWithoutPropertiesLoose,a=e.createForOfIteratorHelperLoose},function(e){i=e.cclegacy},function(e){n=e.SeededRandom},function(e){r=e.AssetSystem},function(e){o=e.HealthSystem},function(e){l=e.OpportunitySystem},function(e){c=e.FinanceSystem},function(e){u=e.HousingSystem},function(e){p=e.IndustryProjectSystem},function(e){d=e.CareerSystem}],execute:function(){var h=["studyHabit","academicScore","studyYears"];i._RF.push({},"a7b6eeRNxJAEYpm+JgFgxd3","GameStateManager",void 0);var y={intelligence:50,emotionalIntelligence:50,constitution:50,execution:50,charm:50,luck:50},m={learning:10,technology:10,business:10,expression:10,management:10,information:10},f={funds:0,familyResources:0,health:85,pressure:10,happiness:60,knowledge:10,familyBond:60,romance:0,informationValue:10,worldShift:0};e("GameStateManager",function(){function e(){this.assets=new r,this.health=new o,this.opportunities=new l,this.finance=new c,this.housing=new u,this.industryProjects=new p,this.careers=new d}var i=e.prototype;return i.createNewGame=function(e,s,a){void 0===a&&(a=Date.now());for(var i=new n(a),r=t({},y),o=0,l=Object.keys(r);o<l.length;o++){var u,p=l[o];r[p]=this.clamp(r[p]+(null!=(u=s.attributeModifiers[p])?u:0)+i.int(-5,5))}var d=this.applyRecord(t({},m),s.skillModifiers),h=this.applyRecord(t({},f,{familyResources:s.initialFamilyResources}),s.dynamicModifiers);return{version:1,seed:a,mode:e,year:2e3,age:8,identityId:s.id,attributes:r,skills:d,stats:h,flags:[].concat(s.familyFlags),triggeredEventIds:[],unlockedAchievementIds:[],lastWellbeingYear:-1,annualActionYears:{},delayedEvents:[],education:{level:"primary",city:s.region,studyHabit:20,academicScore:50,studyYears:0},finance:c.initial(s.familyAllowanceAnnual),career:{track:"unemployed",level:"junior",workIntensity:"normal",industry:"",yearsAtLevel:0},lifeFocus:"study",startup:{active:!1},assets:[],housingHoldings:[],industryProjects:[],market:{discoveredInstrumentIds:[],positions:[],realizedProfit:0,insightIds:[],generatedInstruments:[]},relationships:{father:50,mother:50,friend:30,partner:0,mentor:0},discoveredSignalIds:[],opportunities:[],lifeLog:[],completed:!1}},i.applyChange=function(e,t){if(this.applyRecord(e.attributes,t.attributes,0,100),this.applyRecord(e.skills,t.skills,0,100),this.applyDynamicStats(e.stats,t.stats),t.education){var i=t.education,n=i.studyHabit,r=i.academicScore,o=i.studyYears,l=s(i,h);Object.assign(e.education,l),void 0!==n&&(e.education.studyHabit=this.clamp(e.education.studyHabit+n,0,100)),void 0!==r&&(e.education.academicScore=this.clamp(e.education.academicScore+r,0,100)),void 0!==o&&(e.education.studyYears=this.clamp(e.education.studyYears+o,0))}t.career&&Object.assign(e.career,t.career),t.startup&&Object.assign(e.startup,t.startup),this.applyRecord(e.relationships,t.relationships,0,100);for(var c,u=a(null!=(p=t.assetChanges)?p:[]);!(c=u()).done;){var p,d=c.value;this.assets.apply(e.assets,d.type,d.amount)}for(var y,m=a(null!=(f=t.signalIds)?f:[]);!(y=m()).done;){var f,g=y.value;e.discoveredSignalIds.includes(g)||e.discoveredSignalIds.push(g)}t.opportunity&&this.opportunities.applyProgress(e,t.opportunity);for(var v,S=a(null!=(b=t.addFlags)?b:[]);!(v=S()).done;){var b,I=v.value;e.flags.includes(I)||e.flags.push(I)}},i.advanceYear=function(e){this.settleYear(e),e.year+=1,e.age+=1,e.stats.pressure=this.clamp(e.stats.pressure-1)},i.advanceYears=function(e,t){for(var s=0;s<t;s+=1)this.advanceYear(e)},i.settleYear=function(e){this.health.applyYearlyCost(e.stats,e.age),this.finance.settleYear(e),this.housing.appreciate(e),this.industryProjects.settleYear(e),this.careers.evaluateAnnual(e),this.applyChildhoodStudyLoad(e),this.applyPressureConsequences(e),e.stats.happiness>=70&&(e.stats.pressure=this.clamp(e.stats.pressure-2,0,100))},i.applyChildhoodStudyLoad=function(e){if(!(e.age>=18)){var t=e.education.studyHabit>=35?2:e.education.studyHabit>=25?1:0;0!==t&&(e.stats.knowledge=this.clamp(e.stats.knowledge+t,0,100),e.stats.pressure=this.clamp(e.stats.pressure+t,0,100),t>=2&&(e.stats.happiness=this.clamp(e.stats.happiness-1,0,100)))}},i.applyPressureConsequences=function(e){var t=e.stats.pressure;if(!(t<40))if(t<60)e.stats.happiness=this.clamp(e.stats.happiness-1,0,100);else{if(t<80)return e.stats.happiness=this.clamp(e.stats.happiness-4,0,100),void(e.stats.health=this.clamp(e.stats.health-2,0,100));e.stats.happiness=this.clamp(e.stats.happiness-8,0,100),e.stats.health=this.clamp(e.stats.health-5,0,100),e.stats.knowledge=this.clamp(e.stats.knowledge-2,0,100)}},i.applyRecord=function(e,t,s,a){if(!t)return e;for(var i=0,n=Object.entries(t);i<n.length;i++){var r,o=n[i],l=o[0],c=o[1],u=e,p=null!=(r=u[l])?r:0;u[l]=this.clamp(p+Number(null!=c?c:0),s,a)}return e},i.applyDynamicStats=function(e,t){if(t)for(var s=0,a=Object.entries(t);s<a.length;s++){var i=a[s],n=i[0],r=i[1],o=e[n]+r;e[n]="funds"===n?this.clamp(o,0):this.clamp(o,0,100)}},i.clamp=function(e,t,s){return Math.min(null!=s?s:Number.POSITIVE_INFINITY,Math.max(null!=t?t:Number.NEGATIVE_INFINITY,e))},e}());i._RF.pop()}}}));

System.register("chunks:///_virtual/GameTypes.ts",["cc"],(function(){var e;return{setters:[function(t){e=t.cclegacy}],execute:function(){e._RF.push({},"63f8fyY7uVKz77TxKw6Uow0","GameTypes",void 0),e._RF.pop()}}}));

System.register("chunks:///_virtual/HealthSystem.ts",["cc"],(function(t){var e;return{setters:[function(t){e=t.cclegacy}],execute:function(){e._RF.push({},"88467l20CxIaIh0AjUklpSs","HealthSystem",void 0);t("HealthSystem",function(){function t(){}return t.prototype.applyYearlyCost=function(t,e){var n=t.pressure>=80?4:t.pressure>=60?2:0,r=e>=65?2:e>=45?1:0;t.health=Math.max(0,Math.min(100,t.health-n-r))},t}());e._RF.pop()}}}));

System.register("chunks:///_virtual/HousingSystem.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(r){var t,e;return{setters:[function(r){t=r.createForOfIteratorHelperLoose},function(r){e=r.cclegacy}],execute:function(){e._RF.push({},"d9cf55/kzlL1JZzkrVF4dNU","HousingSystem",void 0);var i=r("HOUSING_PRODUCTS",[{id:"rural-entry",city:"rural",name:"乡镇旧居",tier:"entry",basePrice:8,description:"价格低，居住和流动性一般。"},{id:"rural-standard",city:"rural",name:"自建住宅",tier:"standard",basePrice:20,description:"居住空间较大，出售周期较长。"},{id:"rural-improved",city:"rural",name:"改善型乡居",tier:"improved",basePrice:35,description:"居住条件较好，资产增值依赖本地发展。"},{id:"county-entry",city:"county",name:"县城小户型",tier:"entry",basePrice:20,description:"总价较低，适合第一套住房。"},{id:"county-standard",city:"county",name:"县城标准住宅",tier:"standard",basePrice:45,description:"兼顾居住与本地流动性。"},{id:"county-improved",city:"county",name:"县城改善住宅",tier:"improved",basePrice:70,description:"面积较大，但占用现金更多。"},{id:"city-entry",city:"city",name:"城市老旧小户型",tier:"entry",basePrice:45,description:"通勤条件尚可，维护成本较高。"},{id:"city-standard",city:"city",name:"城市标准住宅",tier:"standard",basePrice:85,description:"就业和公共服务较完善。"},{id:"city-improved",city:"city",name:"城市改善住宅",tier:"improved",basePrice:140,description:"居住体验较好，资金占用明显。"},{id:"metropolis-entry",city:"metropolis",name:"大城市老旧小户型",tier:"entry",basePrice:90,description:"总价仍高，但更接近核心就业机会。"},{id:"metropolis-standard",city:"metropolis",name:"大城市标准住宅",tier:"standard",basePrice:180,description:"居住稳定，但资金压力较高。"},{id:"metropolis-improved",city:"metropolis",name:"大城市改善住宅",tier:"improved",basePrice:320,description:"高总价资产，对现金流要求极高。"}]);r("HousingSystem",function(){function r(){}var e=r.prototype;return e.products=function(r){return i.filter((function(t){return t.city===r}))},e.price=function(r,t){for(var e=1,i=2010;i<t;i+=1)e*=1+this.annualRate(r.city,i);for(var n=t;n<2010;n+=1)e/=1+this.annualRate(r.city,n);return Math.max(1,Math.round(r.basePrice*e*10)/10)},e.buy=function(r,t){var e=i.find((function(r){return r.id===t}));if(!e)throw new Error("未找到该住房。");if(e.city!==r.education.city)throw new Error("只能购买当前所在城市的住房。");var n=this.price(e,r.year),a=n+Math.round(.03*n*10)/10;if(r.stats.funds<a)throw new Error("购房及税费共需 ¥"+(1e4*a).toLocaleString("zh-CN")+" 现金。");r.stats.funds-=a;var s={id:t+"-"+r.year+"-"+(r.housingHoldings.length+1),productId:t,city:e.city,name:e.name,purchaseYear:r.year,purchasePrice:n,currentValue:n};return r.housingHoldings.push(s),this.syncLegacyAsset(r),s},e.sell=function(r,t){var e=r.housingHoldings.findIndex((function(r){return r.id===t}));if(e<0)throw new Error("当前没有这套住房。");var i=r.housingHoldings[e],n=Math.round(.03*i.currentValue*10)/10;return r.stats.funds+=Math.max(0,i.currentValue-n),r.housingHoldings.splice(e,1),this.syncLegacyAsset(r),i},e.appreciate=function(r){for(var e,i=t(r.housingHoldings);!(e=i()).done;){var n=e.value;n.currentValue=Math.max(0,Math.round(n.currentValue*(1+this.annualRate(n.city,r.year))*10)/10)}this.syncLegacyAsset(r)},e.annualRate=function(r,t){return t<=2015?{rural:.02,county:.05,city:.08,metropolis:.1}[r]:t<=2020?{rural:.01,county:.025,city:.04,metropolis:.05}[r]:t<=2026?{rural:0,county:-.01,city:-.015,metropolis:-.02}[r]:{rural:.005,county:.01,city:.015,metropolis:.018}[r]},e.syncLegacyAsset=function(r){var t=Math.round(10*r.housingHoldings.reduce((function(r,t){return r+t.currentValue}),0))/10,e=r.assets.find((function(r){return"housing"===r.type}));e?e.value=t:t>0&&r.assets.push({type:"housing",value:t}),r.assets=r.assets.filter((function(r){return"housing"!==r.type||r.value>0}))},r}());e._RF.pop()}}}));

System.register("chunks:///_virtual/IdentityConfig.ts",["cc"],(function(i){var l;return{setters:[function(i){l=i.cclegacy}],execute:function(){i("familyFlagsFor",(function(i){var l,n;return null!=(l=null==(n=a.find((function(l){return l.id===i})))?void 0:n.familyFlags)?l:[]})),l._RF.push({},"5f841To5uBP2pPQszs7tJIp","IdentityConfig",void 0);var a=i("IDENTITIES",[{id:"migrant-rural",name:"农村务工家庭",region:"rural",difficulty:"较难",initiallyUnlocked:!0,opportunityFocus:"同乡、务工、技能培训与城市迁移",familyFlags:["family-rural","family-labor-network","family-capital-low"],initialFamilyResources:5,familyAllowanceAnnual:.03,attributeModifiers:{execution:6},dynamicModifiers:{familyBond:15}},{id:"small-town",name:"小城普通家庭",region:"county",difficulty:"标准",initiallyUnlocked:!0,opportunityFocus:"本地教育、稳定就业与生活服务",familyFlags:["family-small-town","family-local-network","family-capital-low"],initialFamilyResources:10,familyAllowanceAnnual:.1,attributeModifiers:{},dynamicModifiers:{happiness:5,familyBond:10}},{id:"county-business",name:"县城个体家庭",region:"county",difficulty:"标准偏波动",initiallyUnlocked:!1,unlockDescription:"完成一局人生，并达到商业45与总资产30万元。",opportunityFocus:"店铺、货源、渠道、电商与县域物流",familyFlags:["family-county-business","family-commerce","family-capital-middle"],initialFamilyResources:15,familyAllowanceAnnual:.18,attributeModifiers:{},skillModifiers:{business:8},dynamicModifiers:{familyBond:5}},{id:"metro-salaried",name:"大城市工薪家庭",region:"metropolis",difficulty:"优势",initiallyUnlocked:!1,unlockDescription:"在一局人生中迁入大城市，并达到高级或核心职业层级。",opportunityFocus:"城市教育、企业实习、科技岗位与职业跳槽",familyFlags:["family-metro-salaried","family-corporate","family-capital-middle"],initialFamilyResources:15,familyAllowanceAnnual:.2,attributeModifiers:{},skillModifiers:{information:8},dynamicModifiers:{familyBond:0}},{id:"scholar-family",name:"知识分子家庭",region:"city",difficulty:"优势",initiallyUnlocked:!1,unlockDescription:"在一局人生中进入985/研究生阶段，或同时达到知识85与学习70。",opportunityFocus:"重点教育、高校科研、专业人士与成果转化",familyFlags:["family-scholar","family-academic","family-capital-middle"],initialFamilyResources:10,familyAllowanceAnnual:.15,attributeModifiers:{intelligence:8},dynamicModifiers:{familyBond:5}},{id:"wealthy-business",name:"富裕经商家庭",region:"metropolis",difficulty:"高优势",initiallyUnlocked:!1,unlockDescription:"达成创业传奇；或商业70、资产200万且成功进入至少3条机遇。",opportunityFocus:"家族企业、供应链、股权投资与大额项目",familyFlags:["family-wealthy-business","family-commerce","family-capital-high","family-credit-high"],initialFamilyResources:35,familyAllowanceAnnual:1,attributeModifiers:{},skillModifiers:{business:5,information:5}}]);l._RF.pop()}}}));

System.register("chunks:///_virtual/IndependentLifeEvents.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"cd2d60sCSVFhIRy6aNjMUc+","IndependentLifeEvents",void 0);e("INDEPENDENT_LIFE_EVENTS",[{id:"career-first-job",title:"第一份正式工作",description:"毕业后的第一份工作决定初期收入结构、行业信息和可进入的后续路线。",yearMin:2013,yearMax:2015,weight:110,forced:!0,interaction:"milestone",options:[{id:"tech-job",label:"技术研发｜工资较高，技术行业信息",result:{career:{track:"technology",level:"junior",industry:"软件与互联网",workIntensity:"normal",yearsAtLevel:0},skills:{technology:4},addFlags:["career-started"]}},{id:"product-job",label:"产品运营｜项目奖金，用户与流量信息",result:{career:{track:"product",level:"junior",industry:"平台服务",workIntensity:"normal",yearsAtLevel:0},skills:{management:3,business:2},addFlags:["career-started"]}},{id:"sales-job",label:"销售外贸｜底薪较低，订单佣金波动",result:{career:{track:"sales",level:"junior",industry:"销售与外贸",workIntensity:"normal",yearsAtLevel:0},skills:{business:4,expression:2},addFlags:["career-started"]}},{id:"education-job",label:"教育研究｜收入稳定，长期知识积累",result:{career:{track:"education",level:"junior",industry:"教育与科研",workIntensity:"normal",yearsAtLevel:0},skills:{learning:4,expression:2},addFlags:["career-started"]}},{id:"media-job",label:"内容传媒｜项目收入波动，注意力信息",result:{career:{track:"media",level:"junior",industry:"内容传媒",workIntensity:"hard",yearsAtLevel:0},stats:{pressure:3},skills:{expression:5},addFlags:["career-started"]}},{id:"public-job",label:"公共服务｜收入稳定，公开政策视角",result:{career:{track:"public-service",level:"junior",industry:"公共服务",workIntensity:"normal",yearsAtLevel:0},skills:{management:3,learning:2},addFlags:["career-started"]}}]},{id:"career-work-intensity",title:"工作节奏调整",description:"这一年度的投入会改变工资、能力、压力和健康，结果会进入年度现金流。",yearMin:2014,yearMax:2026,weight:75,interaction:"life-choice",prerequisites:["flags.career-started"],options:[{id:"balanced",label:"保持正常节奏",result:{career:{workIntensity:"normal"},stats:{pressure:2},skills:{management:1}}},{id:"hard",label:"全力投入工作",result:{career:{workIntensity:"hard"},stats:{pressure:7,health:-2},attributes:{execution:2}}},{id:"rest",label:"降低强度，保留生活空间",result:{career:{workIntensity:"relaxed"},stats:{pressure:-4,happiness:4,health:1}}}]},{id:"startup-first-project",title:"具体创业方向的选择",description:"你可以组建内容工作室或软件工具团队。投入会形成创业资产，不会凭空消失。",yearMin:2015,yearMax:2026,weight:60,interaction:"opportunity",declineAllowed:!0,prerequisites:["flags.career-started"],options:[{id:"content",label:"内容工作室｜投入15万元",result:{startup:{active:!0,project:"content",stage:"launch"},stats:{funds:-15,pressure:8},skills:{expression:4,business:3},assetChanges:[{type:"startup",amount:15}],addFlags:["startup-attempt"]}},{id:"software",label:"软件工具团队｜投入40万元",result:{startup:{active:!0,project:"software",stage:"launch"},stats:{funds:-40,pressure:12},skills:{technology:6,business:2},assetChanges:[{type:"startup",amount:40}],addFlags:["startup-attempt"]}}]},{id:"relationship-partner",title:"一段重要关系",description:"这不是商业机遇，而是生活选择。投入时间可能改变幸福和未来家庭。",yearMin:2014,yearMax:2028,weight:60,interaction:"life-choice",options:[{id:"invest",label:"认真了解对方",result:{relationships:{partner:18},stats:{happiness:7,funds:-4},addFlags:["relationship-started"]}},{id:"career-first",label:"明确说明现阶段以事业为主",result:{skills:{management:2},stats:{pressure:2,happiness:-1}}}]},{id:"relationship-family",title:"家人需要照顾",description:"家人遇到健康和生活困难。不同方式会消耗不同的时间、现金和情绪。",yearMin:2016,yearMax:2032,weight:70,interaction:"life-choice",options:[{id:"accompany",label:"亲自回家陪伴｜现金-2万",result:{relationships:{father:8,mother:8},stats:{familyBond:8,happiness:5,funds:-2,pressure:-3}}},{id:"care-service",label:"安排照护并定期探望｜现金-6万",result:{relationships:{father:4,mother:4},stats:{familyBond:4,funds:-6,pressure:1}}},{id:"brief",label:"只能短暂探望",result:{stats:{familyBond:1,happiness:-2},skills:{management:1}}}]},{id:"health-burnout",title:"身体发出的信号",description:"连续高压后，你需要在收入和健康之间做出明确安排。",yearMin:2017,yearMax:2045,weight:65,interaction:"life-choice",options:[{id:"exercise",label:"体检并建立运动计划｜现金-5万",result:{stats:{funds:-5,health:7,pressure:-6},attributes:{constitution:2},addFlags:["health-routine"]}},{id:"push-through",label:"继续保持高强度工作",result:{stats:{health:-6,pressure:8},attributes:{execution:2}}}]}]),e("INDEPENDENT_LIFE_CONTENT_EVENTS",[]);t._RF.pop()}}}));

System.register("chunks:///_virtual/IndustryOpportunityEvents.ts",["cc","./IndustryProjectConfig.ts"],(function(t){var e,n;return{setters:[function(t){e=t.cclegacy},function(t){n=t.INDUSTRY_PROJECTS}],execute:function(){e._RF.push({},"5cf13vY8LlFD7Cueyv6pFew","IndustryOpportunityEvents",void 0);t("INDUSTRY_OPPORTUNITY_EVENTS",n.map((function(t){return{id:"industry-opportunity-"+t.id,title:t.industry+"｜"+t.name,description:t.description+" 当前进入年份会直接影响后续估值；越接近拥挤期，回报越不确定。最低投入 ¥"+(1e4*t.minimumInvestment).toLocaleString("zh-CN")+"，风险 "+t.risk+"。",yearMin:t.yearMin,yearMax:t.yearMax,weight:t.yearMin<=2026?72:64,interaction:"opportunity",declineAllowed:!0,options:[{id:"invest",label:"投入 "+t.minimumInvestment+" 万元并建立项目持仓",result:{projectInvestment:{projectId:t.id,amount:t.minimumInvestment},stats:{pressure:"高"===t.risk?4:2},skills:{business:2,information:2},addFlags:["industry-invested-"+t.id]}},{id:"research",label:"暂不投入，记录行业和风险",result:{skills:{information:3},stats:{pressure:-1},addFlags:["industry-researched-"+t.id]}}]}})));e._RF.pop()}}}));

System.register("chunks:///_virtual/IndustryProjectConfig.ts",["cc"],(function(e){var i;return{setters:[function(e){i=e.cclegacy}],execute:function(){e("industryProject",(function(e){var i=t.find((function(i){return i.id===e}));if(!i)throw new Error("未找到对应的行业项目。");return i})),i._RF.push({},"8f7dbTuVUhGx7snqskiyR8R","IndustryProjectConfig",void 0);var t=e("INDUSTRY_PROJECTS",[{id:"online-retail-fulfillment",name:"区域网店仓配中心",industry:"电子商务与物流",description:"为早期网店提供仓储、包装和跨城发货。",yearMin:2010,idealUntil:2013,crowdedFrom:2016,yearMax:2020,minimumInvestment:10,growthRate:.22,matureRate:.07,declineRate:-.08,risk:"中"},{id:"smartphone-app-studio",name:"智能手机应用工作室",industry:"移动互联网",description:"开发工具、生活服务和移动内容应用。",yearMin:2010,idealUntil:2014,crowdedFrom:2017,yearMax:2021,minimumInvestment:15,growthRate:.26,matureRate:.05,declineRate:-.16,risk:"高"},{id:"mobile-payment-service",name:"商户移动支付服务",industry:"金融科技",description:"帮助线下商户接入移动支付和数字化账务。",yearMin:2013,idealUntil:2016,crowdedFrom:2019,yearMax:2023,minimumInvestment:20,growthRate:.2,matureRate:.06,declineRate:-.1,risk:"中"},{id:"local-delivery-platform",name:"本地生活配送平台",industry:"O2O本地服务",description:"依靠补贴和运力连接餐饮商户与消费者。",yearMin:2014,idealUntil:2015,crowdedFrom:2017,yearMax:2020,minimumInvestment:20,growthRate:.3,matureRate:-.02,declineRate:-.28,risk:"高"},{id:"short-video-studio",name:"短视频内容工作室",industry:"内容传媒",description:"通过短视频、广告和直播建立内容品牌。",yearMin:2016,idealUntil:2019,crowdedFrom:2022,yearMax:2028,minimumInvestment:12,growthRate:.24,matureRate:.08,declineRate:-.12,risk:"高"},{id:"battery-materials-line",name:"动力电池材料产线",industry:"新能源",description:"为新能源汽车产业链提供电池材料和回收服务。",yearMin:2017,idealUntil:2021,crowdedFrom:2024,yearMax:2032,minimumInvestment:40,growthRate:.23,matureRate:.04,declineRate:-.18,risk:"高"},{id:"chip-equipment-supplier",name:"半导体设备供应商",industry:"半导体",description:"提供设备零部件、检测和工程服务，研发周期较长。",yearMin:2018,idealUntil:2025,crowdedFrom:2032,yearMax:2040,minimumInvestment:35,growthRate:.18,matureRate:.09,declineRate:-.08,risk:"高"},{id:"remote-collaboration-suite",name:"远程协作软件",industry:"云服务",description:"为企业提供远程办公和在线协作工具。",yearMin:2020,idealUntil:2021,crowdedFrom:2023,yearMax:2027,minimumInvestment:18,growthRate:.28,matureRate:.02,declineRate:-.22,risk:"高"},{id:"vertical-ai-service",name:"垂直行业AI服务",industry:"人工智能",description:"把生成式AI用于企业流程、客服和专业生产。",yearMin:2022,idealUntil:2028,crowdedFrom:2033,yearMax:2042,minimumInvestment:25,growthRate:.22,matureRate:.08,declineRate:-.12,risk:"高"},{id:"low-altitude-operations",name:"低空设备运维服务",industry:"低空经济",description:"提供无人机检测、维修、调度和行业运营。",yearMin:2024,idealUntil:2030,crowdedFrom:2036,yearMax:2045,minimumInvestment:30,growthRate:.17,matureRate:.08,declineRate:-.1,risk:"高"},{id:"industrial-agent-platform",name:"工业智能体平台",industry:"企业智能化",description:"将智能体接入生产、供应链和企业决策。",yearMin:2027,idealUntil:2034,crowdedFrom:2040,yearMax:2048,minimumInvestment:30,growthRate:.18,matureRate:.07,declineRate:-.12,risk:"高"},{id:"distributed-storage-network",name:"分布式储能网络",industry:"能源基础设施",description:"聚合工商业储能并参与电力调度。",yearMin:2029,idealUntil:2037,crowdedFrom:2045,yearMax:2055,minimumInvestment:45,growthRate:.16,matureRate:.08,declineRate:-.07,risk:"中"},{id:"active-aging-service",name:"主动养老服务平台",industry:"银发经济",description:"围绕居住、照护、康复和文化生活提供长期服务。",yearMin:2031,idealUntil:2040,crowdedFrom:2050,yearMax:2062,minimumInvestment:22,growthRate:.14,matureRate:.09,declineRate:-.05,risk:"中"},{id:"robot-maintenance-network",name:"机器人维护网络",industry:"机器人服务",description:"为家庭和企业机器人提供维修、零件和升级。",yearMin:2034,idealUntil:2042,crowdedFrom:2050,yearMax:2060,minimumInvestment:28,growthRate:.17,matureRate:.08,declineRate:-.09,risk:"中"},{id:"bio-manufacturing-materials",name:"生物制造材料项目",industry:"生物制造",description:"利用生物工艺生产新材料，审批和研发风险较高。",yearMin:2037,idealUntil:2045,crowdedFrom:2053,yearMax:2064,minimumInvestment:40,growthRate:.19,matureRate:.07,declineRate:-.15,risk:"高"},{id:"climate-adaptation-engineering",name:"气候适应工程服务",industry:"城市韧性",description:"为城市提供防灾、节水、降温和基础设施改造。",yearMin:2041,idealUntil:2050,crowdedFrom:2058,yearMax:2070,minimumInvestment:35,growthRate:.14,matureRate:.08,declineRate:-.05,risk:"中"},{id:"urban-renewal-services",name:"老城更新综合服务",industry:"城市更新",description:"参与老旧社区改造、适老化和公共设施运营。",yearMin:2046,idealUntil:2055,crowdedFrom:2063,yearMax:2072,minimumInvestment:30,growthRate:.13,matureRate:.07,declineRate:-.04,risk:"中"},{id:"longevity-health-management",name:"长期健康管理网络",industry:"健康服务",description:"围绕慢病管理、康复和个体化健康建立持续服务。",yearMin:2051,idealUntil:2060,crowdedFrom:2068,yearMax:2072,minimumInvestment:25,growthRate:.13,matureRate:.08,declineRate:-.04,risk:"中"},{id:"succession-advisory",name:"家业传承顾问服务",industry:"专业服务",description:"帮助家庭企业完成治理、接班和资产安排。",yearMin:2058,idealUntil:2066,crowdedFrom:2070,yearMax:2072,minimumInvestment:20,growthRate:.12,matureRate:.07,declineRate:-.03,risk:"中"}]);i._RF.pop()}}}));

System.register("chunks:///_virtual/IndustryProjectSystem.ts",["./IndustryProjectConfig.ts"], function (exports_1, context_1) {
    "use strict";
    var IndustryProjectConfig_1, IndustryProjectSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (IndustryProjectConfig_1_1) {
                IndustryProjectConfig_1 = IndustryProjectConfig_1_1;
            }
        ],
        execute: function () {
            IndustryProjectSystem = class IndustryProjectSystem {
                available(state) {
                    return IndustryProjectConfig_1.INDUSTRY_PROJECTS.filter((item) => state.year >= item.yearMin && state.year <= item.yearMax);
                }
                invest(state, projectId, amount) {
                    const project = IndustryProjectConfig_1.industryProject(projectId);
                    if (state.age < 18)
                        throw new Error('年满18岁后才能以本人名义投资行业项目。');
                    if (state.year < project.yearMin || state.year > project.yearMax)
                        throw new Error('该项目当前不在开放窗口。');
                    if (amount < project.minimumInvestment)
                        throw new Error(`最低投入为 ¥${(project.minimumInvestment * 10000).toLocaleString('zh-CN')}。`);
                    if (state.stats.funds < amount)
                        throw new Error('现金不足，无法完成项目投资。');
                    state.stats.funds -= amount;
                    const holding = {
                        id: `${projectId}-${state.year}-${state.industryProjects.length + 1}`,
                        projectId,
                        name: project.name,
                        industry: project.industry,
                        startYear: state.year,
                        investedPrincipal: amount,
                        currentValue: amount,
                        status: 'active',
                        realizedReturn: 0,
                    };
                    state.industryProjects.push(holding);
                    return holding;
                }
                settleYear(state) {
                    for (const holding of state.industryProjects.filter((item) => item.status === 'active')) {
                        const config = IndustryProjectConfig_1.industryProject(holding.projectId);
                        const baseRate = state.year <= config.idealUntil
                            ? config.growthRate
                            : state.year < config.crowdedFrom
                                ? config.matureRate
                                : config.declineRate;
                        const lateEntryPenalty = holding.startYear >= config.crowdedFrom ? -.08 : 0;
                        const variance = this.deterministicVariance(state.seed, holding.projectId, state.year, config.risk);
                        const rate = Math.max(-.65, baseRate + lateEntryPenalty + variance);
                        holding.currentValue = Math.max(0, Math.round(holding.currentValue * (1 + rate) * 10) / 10);
                        if (holding.currentValue <= holding.investedPrincipal * .08) {
                            holding.currentValue = 0;
                            holding.realizedReturn = -holding.investedPrincipal;
                            holding.status = 'failed';
                        }
                    }
                }
                exit(state, holdingId) {
                    const holding = state.industryProjects.find((item) => item.id === holdingId);
                    if (!holding || holding.status !== 'active')
                        throw new Error('该项目当前无法退出。');
                    const exitCost = Math.round(holding.currentValue * .02 * 10) / 10;
                    const proceeds = Math.max(0, holding.currentValue - exitCost);
                    state.stats.funds += proceeds;
                    holding.realizedReturn = Math.round((proceeds - holding.investedPrincipal) * 10) / 10;
                    holding.status = 'exited';
                    return holding;
                }
                deterministicVariance(seed, id, year, risk) {
                    let hash = (seed ^ year) >>> 0;
                    for (const char of id)
                        hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
                    const normalized = (hash % 10001) / 10000 - .5;
                    return normalized * (risk === '高' ? .24 : .12);
                }
            };
            exports_1("IndustryProjectSystem", IndustryProjectSystem);
        }
    };
});
System.register("chunks:///_virtual/InheritanceConfig.ts",["cc"],(function(e){var i;return{setters:[function(e){i=e.cclegacy}],execute:function(){i._RF.push({},"2bd6dC0lYxHdJ+Yjg1UXfPb","InheritanceConfig",void 0);e("INHERITANCE_REWARDS",[{id:"legacy-learning",name:"学习传承",description:"下一局学习能力 +3。",result:{skills:{learning:3}}},{id:"legacy-information",name:"信息传承",description:"下一局信息能力 +3。",result:{skills:{information:3}}},{id:"legacy-health",name:"健康传承",description:"下一局初始健康 +5。",result:{stats:{health:5}}},{id:"legacy-family",name:"家庭传承",description:"下一局初始家庭关系 +5。",result:{stats:{familyBond:5}}},{id:"legacy-execution",name:"行动传承",description:"下一局执行力 +2。",result:{attributes:{execution:2}}},{id:"legacy-funds",name:"资源传承",description:"下一局个人资金 +5。",result:{stats:{funds:5}}}]);i._RF.pop()}}}));

System.register("chunks:///_virtual/InvestmentMemoryManager.ts",["cc"],(function(t){var e,r;return{setters:[function(t){e=t.cclegacy,r=t.sys}],execute:function(){e._RF.push({},"edf86bBn1BPl65GhFIyw71Y","InvestmentMemoryManager",void 0);var n="restart-life.investment-insights.v1";t("InvestmentMemoryManager",function(){function t(){}var e=t.prototype;return e.load=function(){try{var t,e=JSON.parse(null!=(t=r.localStorage.getItem(n))?t:"[]");return Array.isArray(e)?e.filter((function(t){return"string"==typeof t})):[]}catch(t){return[]}},e.remember=function(t){var e=[].concat(new Set([].concat(this.load(),t)));return r.localStorage.setItem(n,JSON.stringify(e)),e},t}());e._RF.pop()}}}));

System.register("chunks:///_virtual/LaterLifeEvents.ts",["cc"],(function(e){var s;return{setters:[function(e){s=e.cclegacy}],execute:function(){s._RF.push({},"66d68rienNAq7vwLQhFhrSV","LaterLifeEvents",void 0);e("LATER_LIFE_EVENTS",[{id:"later-professional-track",title:"专业路线还是管理路线",description:"工作经验已经形成，你需要确定下一阶段主要依靠专业深度还是组织管理。",yearMin:2027,yearMax:2035,weight:80,interaction:"life-choice",prerequisites:["flags.career-started"],options:[{id:"expert",label:"继续深耕专业",result:{skills:{technology:5,learning:3},stats:{pressure:2}}},{id:"manager",label:"转向团队管理",result:{skills:{management:6,expression:2},stats:{pressure:4}}}]},{id:"later-career-transition",title:"行业增长开始放缓",description:"原行业的增长空间收窄。转型需要重新学习，留下则能利用既有经验。",yearMin:2033,yearMax:2042,weight:72,interaction:"life-choice",prerequisites:["flags.career-started"],options:[{id:"reskill",label:"投入一年学习新方向",result:{skills:{learning:5,information:4,technology:3},stats:{pressure:4,happiness:-1}}},{id:"stay",label:"利用经验提高效率",result:{skills:{management:4},stats:{pressure:-2,happiness:2}}}]},{id:"later-parent-care",title:"父母进入长期照护阶段",description:"照护不再是一次探望，而是持续的时间和现金安排。",yearMin:2036,yearMax:2048,weight:76,interaction:"life-choice",options:[{id:"time",label:"减少工作，承担主要照护",result:{stats:{familyBond:10,happiness:4,pressure:-2,funds:-4},relationships:{father:8,mother:8}}},{id:"service",label:"购买长期照护服务｜现金-12万",result:{stats:{familyBond:5,funds:-12,pressure:2},relationships:{father:4,mother:4}}}]},{id:"later-midlife-health",title:"中年健康检查",description:"体检指标提示长期工作方式需要调整，继续透支会影响之后的承受力。",yearMin:2040,yearMax:2050,weight:82,interaction:"life-choice",options:[{id:"change",label:"系统治疗并降低强度｜现金-8万",result:{stats:{funds:-8,health:10,pressure:-7,happiness:3},attributes:{constitution:2}}},{id:"delay",label:"暂时只做基础干预｜现金-2万",result:{stats:{funds:-2,health:3,pressure:-2}}}]},{id:"later-second-career",title:"第二职业的入口",description:"多年经验可以转化为咨询、教学或独立服务，但收入稳定性会下降。",yearMin:2046,yearMax:2058,weight:68,interaction:"opportunity",declineAllowed:!0,prerequisites:["career.level==core"],options:[{id:"consult",label:"建立专业咨询业务",result:{skills:{expression:5,business:4,management:3},stats:{pressure:3},addFlags:["second-career-consulting"]}},{id:"teach",label:"把经验转化为课程",result:{skills:{expression:6,learning:3},stats:{happiness:4},addFlags:["second-career-teaching"]}}]},{id:"later-successor",title:"经验交接",description:"年轻同事开始承担主力工作。你可以系统传授方法，也可以把精力留给自己的下一阶段。",yearMin:2051,yearMax:2062,weight:65,interaction:"life-choice",options:[{id:"teach",label:"完成系统交接",result:{relationships:{mentor:8},skills:{expression:4,management:4},stats:{happiness:4}}},{id:"personal",label:"逐步减少职业责任",result:{stats:{health:5,pressure:-6,happiness:3}}}]},{id:"later-retirement-plan",title:"退休现金流安排",description:"工资收入将逐步下降，需要在现金储备、资产风险和生活质量之间重新平衡。",yearMin:2056,yearMax:2066,weight:85,interaction:"milestone",forced:!0,options:[{id:"stable",label:"降低风险，保留三年生活现金",result:{stats:{pressure:-5,happiness:2},skills:{information:2},addFlags:["retirement-stable"]}},{id:"active",label:"保留部分经营和投资",result:{skills:{business:3,information:3},stats:{pressure:3},addFlags:["retirement-active"]}}]},{id:"later-housing-choice",title:"晚年住房选择",description:"当前住房的维护、医疗便利和家人距离开始比面积更重要。",yearMin:2061,yearMax:2070,weight:70,interaction:"life-choice",options:[{id:"accessible",label:"为适老化投入｜现金-10万",result:{stats:{funds:-10,health:5,happiness:4},addFlags:["accessible-home"]}},{id:"remain",label:"继续住在熟悉的地方",result:{stats:{familyBond:3,happiness:3,pressure:-2}}}]},{id:"later-life-record",title:"整理一生的经验",description:"接近人生终点时，你决定如何保存自己的判断、经历和遗憾。",yearMin:2067,yearMax:2072,weight:95,interaction:"milestone",forced:!0,options:[{id:"record",label:"整理成完整的人生档案",result:{stats:{informationValue:8,happiness:5},skills:{expression:3},addFlags:["life-archive-complete"]}},{id:"family",label:"把时间留给家人",result:{stats:{familyBond:8,happiness:7,pressure:-4},addFlags:["life-family-finale"]}}]}]),e("LATER_LIFE_CONTENT_EVENTS",[]);s._RF.pop()}}}));

System.register("chunks:///_virtual/LegacyManager.ts",["cc"],(function(t){var e,r;return{setters:[function(t){e=t.cclegacy,r=t.sys}],execute:function(){e._RF.push({},"925f1f+oLFBqKWtF+hJO1zS","LegacyManager",void 0);var a="restart-life.inheritance.v1";t("LegacyManager",function(){function t(){}var e=t.prototype;return e.save=function(t){r.localStorage.setItem(a,JSON.stringify(t))},e.load=function(){var t=r.localStorage.getItem(a);if(t)try{return JSON.parse(t)}catch(t){return}},t}());e._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./GameBootstrap.ts","./Motion.ts","./StatChangeAnimator.ts","./UITheme.ts","./AchievementConfig.ts","./CareerPathEvents.ts","./EducationEvents.ts","./EndingConfig.ts","./EventTemplates.ts","./ExplorationConfig.ts","./FamilyOpportunityEvents.ts","./FutureTransitionEvents.ts","./GameEvents.ts","./IdentityConfig.ts","./IndependentLifeEvents.ts","./IndustryOpportunityEvents.ts","./IndustryProjectConfig.ts","./InheritanceConfig.ts","./LaterLifeEvents.ts","./MajorOpportunityEvents.ts","./MarketConfig.ts","./MarketInsightConfig.ts","./MidLifeEvents.ts","./OpportunityConfig.ts","./OpportunityEvents.ts","./StarterEvents.ts","./StartupConfig.ts","./YearConfig.ts","./GameSession.ts","./GameStateManager.ts","./GameTypes.ts","./SeededRandom.ts","./AchievementSystem.ts","./AssetSystem.ts","./CareerSystem.ts","./CitySystem.ts","./ConditionEvaluator.ts","./DelayedEventQueue.ts","./EducationProgressionSystem.ts","./EducationSystem.ts","./EndingResolver.ts","./EventMatcher.ts","./FamilyUnlockManager.ts","./FinanceSystem.ts","./HealthSystem.ts","./HousingSystem.ts","./IndustryProjectSystem.ts","./InvestmentMemoryManager.ts","./LegacyManager.ts","./MarketSystem.ts","./OpenOpportunitySystem.ts","./OpportunitySystem.ts","./ReportGenerator.ts","./RequirementFormatter.ts","./SaveManager.ts","./StartupSystem.ts","./WealthSystem.ts"],(function(){return{setters:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/MajorOpportunityEvents.ts",["cc"],(function(t){var e;return{setters:[function(t){e=t.cclegacy}],execute:function(){e._RF.push({},"f73b7yCpr1EZZNokxDlJTVo","MajorOpportunityEvents",void 0);t("MAJOR_OPPORTUNITY_EVENTS",[{id:"major-venture-investment",title:"高风险项目跟投机会",description:"一支小团队邀请你以现金跟投。项目可能带来数倍回报，也可能几乎归零；这是一次真正会改变资产曲线的选择。",yearMin:2016,yearMax:2072,weight:45,prerequisites:["stats.funds>=50"],options:[{id:"commit",label:"投入 ¥500,000 跟投（成功约四成，成功后回收 ¥2,400,000）",result:{stats:{funds:-50,pressure:8},addFlags:["venture-investor"]}},{id:"decline",label:"放弃，保留现金与选择权",result:{skills:{information:1},stats:{pressure:-1}}}]}]);e._RF.pop()}}}));

System.register("chunks:///_virtual/MarketConfig.ts",["cc"],(function(i){var e;return{setters:[function(i){e=i.cclegacy}],execute:function(){e._RF.push({},"0d03bCcAO5PbI9JbNxAQPTr","MarketConfig",void 0);i("MARKET_INSTRUMENTS",[{id:"housing-developer",name:"安居开发",kind:"stock",sector:"地产开发",risk:"高",chainId:"urban-housing",description:"城市化上行期受益明显；高杠杆也意味着周期反转时跌幅可能更深。",publicFromYear:2005,startingPrice:10,prices:{2005:10,2008:13,2012:26,2015:42,2018:38,2020:31,2022:16,2024:11,2026:9},prerequisites:["skills.information>=15"],clue:"住房需求与信贷扩张正在同时出现。"},{id:"web-portal",name:"万象门户",kind:"stock",sector:"个人电脑互联网",risk:"高",chainId:"pc-internet",description:"早期门户与软件服务的代表；先发优势会随移动时代到来而衰减。",publicFromYear:2006,startingPrice:8,prices:{2006:8,2009:15,2012:28,2015:33,2018:24,2020:19,2024:16,2026:14},prerequisites:["flags.computer-intro"],clue:"电脑正在从少数人的工具变成基础设施。"},{id:"commerce-platform",name:"千帆商贸",kind:"stock",sector:"电子商务",risk:"中",chainId:"ecommerce",description:"线上交易、物流与支付网络共同推动增长；竞争会持续吞噬利润。",publicFromYear:2010,startingPrice:12,prices:{2010:12,2013:20,2016:48,2019:74,2021:68,2024:92,2026:105},prerequisites:["skills.business>=20"],clue:"网购订单与仓配网络正在同步扩张。"},{id:"mobile-service",name:"掌中服务",kind:"stock",sector:"移动互联网",risk:"高",chainId:"mobile-internet",description:"应用、支付与本地服务的高速扩张期；增长放缓时估值会剧烈波动。",publicFromYear:2013,startingPrice:10,prices:{2013:10,2015:24,2018:61,2020:88,2022:57,2024:73,2026:80},prerequisites:["skills.information>=22"],clue:"用户开始把更多生活环节交给手机。"},{id:"content-platform",name:"回声内容",kind:"stock",sector:"内容平台",risk:"高",chainId:"content-industry",description:"注意力能够变现，但流量、监管与创作成本让收益充满不确定。",publicFromYear:2016,startingPrice:9,prices:{2016:9,2018:18,2020:44,2022:27,2024:31,2026:36},prerequisites:["skills.expression>=20"],clue:"短内容与直播正在改变广告和消费。"},{id:"ai-toolmaker",name:"智造工具",kind:"stock",sector:"人工智能",risk:"高",chainId:"artificial-intelligence",description:"生成式工具带来效率想象，也伴随高估值、技术替代和商业化兑现风险。",publicFromYear:2022,startingPrice:18,prices:{2022:18,2023:46,2024:31,2026:58,2030:42,2035:95},prerequisites:["skills.technology>=30","skills.information>=25"],clue:"模型能力提升快于多数企业的适应速度。"},{id:"virtual-reality",name:"幻界互动",kind:"stock",sector:"沉浸式娱乐",risk:"高",description:"概念先于盈利。热潮之中容易被追捧，兑现不足时也会快速回落。",publicFromYear:2021,startingPrice:20,prices:{2021:20,2022:39,2023:14,2024:11,2026:13},prerequisites:["skills.information>=25"],clue:"所有人都在谈论下一个入口，但还没人能说清收入从哪里来。"},{id:"urban-index",name:"城镇发展指数",kind:"fund",sector:"综合指数",risk:"中",description:"覆盖基础设施、消费与城市服务的公开指数基金。",publicFromYear:2008,startingPrice:10,prices:{2008:10,2012:14,2016:19,2020:24,2024:30,2026:32,2035:42,2045:55,2055:68,2070:82}},{id:"cloud-pioneer",name:"云端先驱",kind:"stock",sector:"云计算",risk:"高",description:"早期软件服务公司，波动较大，依赖技术与信息判断。",publicFromYear:2012,startingPrice:8,prices:{2012:8,2015:11,2018:18,2020:35,2022:22,2024:48,2026:55,2035:38,2045:75,2055:96,2070:130},prerequisites:["skills.technology>=25"],clue:"技术论坛中持续出现“企业上云”的讨论。"},{id:"green-grid",name:"绿网能源",kind:"stock",sector:"新能源设备",risk:"高",description:"新能源设备企业，需较高信息能力才能识别周期风险。",publicFromYear:2016,startingPrice:12,prices:{2016:12,2018:10,2020:17,2022:33,2024:21,2026:29,2035:46,2045:34,2055:72,2070:110},prerequisites:["skills.information>=25"],clue:"行业报告提到电网改造将形成长期订单。"},{id:"innovation-bond",name:"创新城债",kind:"bond",sector:"城市建设债",risk:"低",description:"收益平稳的城市建设债券，适合建立第一笔可控投资。",publicFromYear:2005,startingPrice:10,prices:{2005:10,2010:11,2015:12,2020:13,2024:14,2026:15,2035:18,2045:22,2055:27,2070:34}}]);e._RF.pop()}}}));

System.register("chunks:///_virtual/MarketInsightConfig.ts",["cc"],(function(e){var i;return{setters:[function(e){i=e.cclegacy}],execute:function(){i._RF.push({},"fc8ad4Qe7lA8oAIQR8de2va","MarketInsightConfig",void 0);e("MARKET_INSIGHTS",[{id:"long-term-compounding",name:"时间复利",description:"理解长期持有与稳定收益的累积价值。"},{id:"diversification",name:"分散配置",description:"理解单一行业并不能代表整个市场。"},{id:"cycle-awareness",name:"周期意识",description:"理解增长、回撤与情绪会反复出现。"}]);i._RF.pop()}}}));

System.register("chunks:///_virtual/MarketSystem.ts",["./MarketConfig.ts.ts", "./MarketInsightConfig.ts.ts", "./ConditionEvaluator.ts"], function (exports_1, context_1) {
    "use strict";
    var MarketConfig_1, MarketInsightConfig_1, ConditionEvaluator_1, FUTURE_STOCK_TEMPLATES, MarketSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (MarketConfig_1_1) {
                MarketConfig_1 = MarketConfig_1_1;
            },
            function (MarketInsightConfig_1_1) {
                MarketInsightConfig_1 = MarketInsightConfig_1_1;
            },
            function (ConditionEvaluator_1_1) {
                ConditionEvaluator_1 = ConditionEvaluator_1_1;
            }
        ],
        execute: function () {
            FUTURE_STOCK_TEMPLATES = [
                { id: 'starlight-compute', name: '星海算力', sector: '未来算力', risk: '高', description: '面向新一代算力服务的企业，成长与波动都很显著。', prerequisites: ['skills.technology>=25'] },
                { id: 'dawn-health', name: '曙光健康', sector: '长期健康', risk: '中', description: '将诊疗、设备与长期健康服务结合的新兴公司。', prerequisites: ['skills.information>=20'] },
                { id: 'farway-logistics', name: '远方物流', sector: '自动物流', risk: '中', description: '自动化配送与跨区域供应链服务商。', prerequisites: ['skills.business>=20'] },
                { id: 'spirit-media', name: '灵境内容', sector: '沉浸内容', risk: '高', description: '沉浸式内容平台，受文化潮流影响很大。', prerequisites: ['skills.expression>=20'] },
                { id: 'green-harvest', name: '绿野农科', sector: '农业科技', risk: '中', description: '以农业科技与资源循环为核心的创新企业。', prerequisites: ['skills.information>=18'] },
                { id: 'urban-renewal', name: '新城更新', sector: '城市更新', risk: '中', description: '参与城市更新与公共服务建设的企业。', prerequisites: ['skills.information>=20'] },
            ];
            MarketSystem = class MarketSystem {
                constructor() {
                    this.conditions = new ConditionEvaluator_1.ConditionEvaluator();
                }
                instruments(state) {
                    const held = new Set(state.market.positions.map((position) => position.instrumentId));
                    const discovered = new Set(state.market.discoveredInstrumentIds);
                    return this.catalog(state)
                        // Researched and previously held instruments remain in the ledger after a full sale.
                        .filter((item) => item.publicFromYear <= state.year && (!item.closeYear || state.year <= item.closeYear || held.has(item.id) || discovered.has(item.id)))
                        // Trading must not reorder the list: a stable catalogue prevents a sale looking like a price move.
                        .sort((left, right) => right.publicFromYear - left.publicFromYear || left.id.localeCompare(right.id));
                }
                /** Future listings are generated once, saved, and never reveal their timing before they appear. */
                revealFutureInstrument(state, random) {
                    if (state.year <= 2026 || state.market.generatedInstruments.some((item) => item.publicFromYear === state.year))
                        return;
                    if (state.market.generatedInstruments.length >= FUTURE_STOCK_TEMPLATES.length || random.next() > 0.58)
                        return;
                    const used = new Set(state.market.generatedInstruments.map((item) => item.id.split('-').slice(2).join('-')));
                    const templates = FUTURE_STOCK_TEMPLATES.filter((template) => !used.has(template.id));
                    if (templates.length === 0)
                        return;
                    const template = templates[random.int(0, templates.length - 1)];
                    const startingPrice = random.int(12, 45);
                    const prices = { [state.year]: startingPrice };
                    let price = startingPrice;
                    for (let year = state.year + random.int(3, 5); year <= 2072; year += random.int(3, 6)) {
                        price = Math.max(4, Math.round(price * (0.62 + random.next() * 1.55)));
                        prices[year] = price;
                    }
                    state.market.generatedInstruments.push({
                        id: `future-${state.year}-${template.id}`,
                        name: template.name,
                        kind: 'stock',
                        description: `${template.description} 它在 ${state.year} 年突然进入公开市场。`,
                        publicFromYear: state.year,
                        startingPrice,
                        prices,
                        prerequisites: [...template.prerequisites],
                        clue: '这是一只未知未来中随机出现的新股票。',
                        sector: template.sector,
                        risk: template.risk,
                    });
                }
                canResearch(state, item) {
                    if (!this.instruments(state).includes(item))
                        return false;
                    if (this.conditions.matchesAll(state, item.prerequisites))
                        return true;
                    // The cycle learned from known history helps the player evaluate unknown future listings.
                    return item.id.startsWith('future-')
                        && state.market.insightIds.includes('cycle-awareness')
                        && state.skills.information >= 15;
                }
                research(state, instrumentId) {
                    const item = this.find(instrumentId, state);
                    if (!this.canResearch(state, item))
                        throw new Error('当前条件不足，无法理解该标的。');
                    if (!state.market.discoveredInstrumentIds.includes(item.id))
                        state.market.discoveredInstrumentIds.push(item.id);
                    return item;
                }
                price(item, year) {
                    var _a, _b, _c, _d;
                    const points = Object.keys(item.prices).map(Number).sort((a, b) => a - b);
                    const before = (_a = [...points].reverse().find((candidate) => candidate <= year)) !== null && _a !== void 0 ? _a : points[0];
                    const after = (_b = points.find((candidate) => candidate >= year)) !== null && _b !== void 0 ? _b : points[points.length - 1];
                    const start = (_c = item.prices[before]) !== null && _c !== void 0 ? _c : item.startingPrice;
                    const end = (_d = item.prices[after]) !== null && _d !== void 0 ? _d : start;
                    if (before === after || start <= 0)
                        return start;
                    const progress = (year - before) / (after - before);
                    return Math.round(start * Math.pow(end / start, progress) * 100) / 100;
                }
                change(item, year) {
                    const current = this.price(item, year);
                    const previous = this.price(item, Math.max(item.publicFromYear, year - 1));
                    const amount = Math.round((current - previous) * 100) / 100;
                    return { amount, percent: previous === 0 ? 0 : Math.round(amount / previous * 1000) / 10 };
                }
                history(item, year, years = 5) {
                    const start = Math.max(item.publicFromYear, year - years + 1);
                    return Array.from({ length: year - start + 1 }, (_, index) => ({ year: start + index, price: this.price(item, start + index) }));
                }
                canTrade(state) { return state.age >= 18 && state.flags.includes('market-risk-read'); }
                acceptRisk(state) {
                    if (state.age < 18)
                        throw new Error('年满18岁后才能以本人名义开立交易账户。');
                    if (!state.flags.includes('market-risk-read'))
                        state.flags.push('market-risk-read');
                }
                buy(state, instrumentId, quantity) {
                    if (!this.canTrade(state))
                        throw new Error(state.age < 18 ? '未成年只能查看行情，不能买卖。' : '请先阅读并确认交易风险说明。');
                    const item = this.research(state, instrumentId);
                    if (item.closeYear && state.year > item.closeYear)
                        throw new Error('该标的已停止新增买入，但历史持仓仍可查看和卖出。');
                    if (!Number.isInteger(quantity) || quantity <= 0)
                        throw new Error('购买数量必须为正整数。');
                    const cost = this.price(item, state.year) * quantity;
                    if (state.stats.funds < cost)
                        throw new Error('资金不足，无法完成本次购买。');
                    const position = state.market.positions.find((entry) => entry.instrumentId === item.id);
                    if (position) {
                        position.averageCost = (position.averageCost * position.quantity + cost) / (position.quantity + quantity);
                        position.quantity += quantity;
                    }
                    else
                        state.market.positions.push({ instrumentId: item.id, quantity, averageCost: cost / quantity });
                    state.stats.funds -= cost;
                }
                sell(state, instrumentId, quantity) {
                    if (!this.canTrade(state))
                        throw new Error('请先完成交易账户和风险说明。');
                    const position = this.position(state, instrumentId);
                    if (!Number.isInteger(quantity) || quantity <= 0 || position.quantity < quantity)
                        throw new Error('持仓数量不足。');
                    const proceeds = this.price(this.find(instrumentId, state), state.year) * quantity;
                    state.stats.funds += proceeds;
                    state.market.realizedProfit += proceeds - position.averageCost * quantity;
                    position.quantity -= quantity;
                    if (position.quantity === 0)
                        state.market.positions = state.market.positions.filter((entry) => entry !== position);
                }
                position(state, instrumentId) { const item = state.market.positions.find((entry) => entry.instrumentId === instrumentId); if (!item)
                    throw new Error('暂无该标的持仓。'); return item; }
                portfolioValue(state) { return state.market.positions.reduce((sum, position) => sum + this.price(this.find(position.instrumentId, state), state.year) * position.quantity, 0); }
                find(id, state) { const item = this.catalog(state).find((entry) => entry.id === id); if (!item)
                    throw new Error('当前投资品种尚未开放。'); return item; }
                insightIdsFor(item) {
                    if (item.kind === 'bond')
                        return ['long-term-compounding'];
                    if (item.kind === 'fund')
                        return ['diversification'];
                    if (item.kind === 'stock')
                        return ['cycle-awareness'];
                    return [];
                }
                insightNames(ids) {
                    return ids.map((id) => { var _a; return (_a = MarketInsightConfig_1.MARKET_INSIGHTS.find((item) => item.id === id)) === null || _a === void 0 ? void 0 : _a.name; }).filter((name) => Boolean(name));
                }
                catalog(state) { return [...MarketConfig_1.MARKET_INSTRUMENTS, ...state.market.generatedInstruments]; }
            };
            exports_1("MarketSystem", MarketSystem);
        }
    };
});

System.register("chunks:///_virtual/MidLifeEvents.ts",["cc","./EventTemplates.ts"],(function(e){var t,n,i;return{setters:[function(e){t=e.cclegacy},function(e){n=e.buildTemplateEvents,i=e.seedSeries}],execute:function(){t._RF.push({},"3bfe0gKhCNAzauQwJC81DRI","MidLifeEvents",void 0);e("MID_LIFE_EVENTS",n("midlife",[].concat(i("career",2026,5,8),i("investment",2027,4,8),i("care",2028,4,8),i("health",2029,3,8),i("reflection",2030,2,8),i("opportunity",2031,2,7))));t._RF.pop()}}}));

System.register("chunks:///_virtual/Motion.ts",["cc"],(function(t){var e,n,o,a;return{setters:[function(t){e=t.cclegacy,n=t.UIOpacity,o=t.tween,a=t.Vec3}],execute:function(){e._RF.push({},"5417652zUhBFq/LjJoDh4wY","Motion",void 0);t("Motion",function(){function t(){}return t.screenEnter=function(t,e){var a;void 0===e&&(e=0);var c=null!=(a=t.getComponent(n))?a:t.addComponent(n);c.opacity=0;var i=t.position.clone();t.setPosition(i.x,i.y-14,i.z),o(t).delay(e).parallel(o(t).to(.32,{position:i},{easing:"quadOut"}),o(c).to(.28,{opacity:255},{easing:"quadOut"})).start()},t.modalEnter=function(t){var e,c=null!=(e=t.getComponent(n))?e:t.addComponent(n);c.opacity=0,t.setScale(new a(.96,.96,1)),o(t).parallel(o(c).to(.24,{opacity:255}),o(t).to(.28,{scale:a.ONE},{easing:"backOut"})).start()},t.pulse=function(t){o(t).repeatForever(o(t).sequence(o(t).to(.7,{scale:new a(1.035,1.035,1)}),o(t).to(.7,{scale:a.ONE}))).start()},t}());e._RF.pop()}}}));

System.register("chunks:///_virtual/OpenOpportunitySystem.ts",["cc","./ExplorationConfig.ts","./ConditionEvaluator.ts","./RequirementFormatter.ts"],(function(t){var e,n,i,r;return{setters:[function(t){e=t.cclegacy},function(t){n=t.EXPLORATION_ACTIONS},function(t){i=t.ConditionEvaluator},function(t){r=t.RequirementFormatter}],execute:function(){e._RF.push({},"a8896coX7FPGaMT8S0bJufF","OpenOpportunitySystem",void 0);t("OpenOpportunitySystem",function(){function t(){this.conditions=new i,this.formatter=new r}var e=t.prototype;return e.actions=function(t){var e=this;return n.filter((function(n){return e.isAvailable(t,n)}))},e.isAvailable=function(t,e){return(void 0===e.yearMin||t.year>=e.yearMin)&&(void 0===e.yearMax||t.year<=e.yearMax)&&this.conditions.matchesAll(t,e.prerequisites)},e.lockedReason=function(t,e){if(!this.isAvailable(t,e))return this.requirementText(e)},e.requirementText=function(t){return this.formatter.formatAll(t.prerequisites)},t}());e._RF.pop()}}}));

System.register("chunks:///_virtual/OpportunityConfig.ts",["cc"],(function(e){var i;return{setters:[function(e){i=e.cclegacy}],execute:function(){i._RF.push({},"66a01CnOTZAsYOX1ZrzGgyj","OpportunityConfig",void 0);var n=["emergence","growth","boom","maturity","adjustment"];e("OPPORTUNITY_CHAINS",[{id:"urban-development",name:"城市发展",category:"era",stages:[].concat(n),description:"迁移、教育资源和工作机会逐渐向城市集中。"},{id:"urban-housing",name:"城市住房",category:"era",stages:[].concat(n),description:"居住需求、资产价格与家庭负担共同变化。"},{id:"pc-internet",name:"个人电脑互联网",category:"era",stages:[].concat(n),description:"从家用电脑、社区到软件和互联网公司。"},{id:"ecommerce",name:"电子商务",category:"era",stages:[].concat(n),description:"从网购习惯、开店到品牌和供应链竞争。"},{id:"mobile-internet",name:"移动互联网",category:"era",stages:[].concat(n),description:"智能设备、应用服务与移动支付改变生活。"},{id:"content-industry",name:"内容产业",category:"era",stages:[].concat(n),description:"论坛、博客、自媒体、直播和短视频的演进。"},{id:"new-energy",name:"新能源",category:"era",stages:[].concat(n),description:"技术积累、支持政策与产业扩张带来新机会。"},{id:"artificial-intelligence",name:"人工智能",category:"era",stages:[].concat(n),description:"自动化、算法应用和生成式工具改变职业。"},{id:"education-life",name:"教育与专业",category:"life",stages:[].concat(n),description:"学习与专业选择会长期影响职业入口。"},{id:"family-health-life",name:"家庭健康与陪伴",category:"life",stages:[].concat(n),description:"健康和陪伴具有长期且不可逆的价值。"},{id:"relationship-life",name:"重要人物与长期关系",category:"life",stages:[].concat(n),description:"关系会改变信息、支持与人生幸福。"}]),e("SIGNALS",[{id:"signal-city-resource",chainId:"urban-development",text:"更多教育和就业资源正在向城市集中。",confidence:65},{id:"signal-pc-home",chainId:"pc-internet",text:"越来越多家庭开始接触电脑和网络。",confidence:60},{id:"signal-ecommerce-orders",chainId:"ecommerce",text:"身边有人开始通过网络购买商品。",confidence:65},{id:"signal-mobile-users",chainId:"mobile-internet",text:"智能设备用户增长，应用服务开始增加。",confidence:75},{id:"signal-content-creators",chainId:"content-industry",text:"个人表达开始积累稳定的关注者。",confidence:70},{id:"signal-housing-demand",chainId:"urban-housing",text:"城市居住需求与通勤成本正在变化。",confidence:60},{id:"signal-energy-policy",chainId:"new-energy",text:"新能源技术和产业支持被频繁讨论。",confidence:60},{id:"signal-ai-tooling",chainId:"artificial-intelligence",text:"智能工具开始帮助人们完成重复和创作工作。",confidence:80},{id:"signal-family-time",chainId:"family-health-life",text:"家人需要的陪伴比想象中更难替代。",confidence:85},{id:"signal-relationship-trust",chainId:"relationship-life",text:"长期信任会在关键时刻带来支持。",confidence:75}]);i._RF.pop()}}}));

System.register("chunks:///_virtual/OpportunityEvents.ts",["cc","./EventTemplates.ts"],(function(e){var t,i,n;return{setters:[function(e){t=e.cclegacy},function(e){i=e.buildTemplateEvents,n=e.seedSeries}],execute:function(){t._RF.push({},"c4f4ab/4B9BV7TO3bfpQPmA","OpportunityEvents",void 0);e("OPPORTUNITY_EVENTS",[{id:"signal-city",title:"城市的消息",description:"亲戚谈起城市里更多的学校和工作机会。",yearMin:2004,yearMax:2008,weight:55,options:[{id:"notice",label:"认真记下这些变化",result:{signalIds:["signal-city-resource"],skills:{information:3},opportunity:{chainId:"urban-development",stage:"emergence",entered:!1}}},{id:"ignore",label:"先过好眼前的生活",result:{stats:{happiness:2}}}]},{id:"signal-pc-internet",title:"电脑与网络的声音",description:"网吧、论坛和个人网站开始出现在同学们的谈话里。",yearMin:2003,yearMax:2007,weight:60,options:[{id:"observe",label:"观察并学习",result:{signalIds:["signal-pc-home"],skills:{technology:3,information:3},opportunity:{chainId:"pc-internet",stage:"emergence",entered:!1}}},{id:"pass",label:"暂时不关注",result:{skills:{expression:1}}}]},{id:"opportunity-pc-entry",title:"互联网行业的入口",description:"一个小团队需要愿意学习网站和软件的人。未成年阶段只能学习和参与体验，不能以本人名义投资。",yearMin:2007,yearMax:2011,weight:60,interaction:"life-choice",prerequisites:["flags.computer-intro"],options:[{id:"learn",label:"投入时间学习技术",result:{skills:{technology:8},stats:{pressure:3},opportunity:{chainId:"pc-internet",stage:"growth",entered:!0},addFlags:["pc-industry-entry"]}},{id:"watch",label:"继续观察行业",result:{skills:{information:3},opportunity:{chainId:"pc-internet",stage:"growth",entered:!1}}}]},{id:"signal-ecommerce",title:"新的购物方式",description:"有人开始在网上买东西，也有人尝试把商品卖给陌生人。",yearMin:2008,yearMax:2012,weight:65,options:[{id:"research",label:"研究交易和物流",result:{signalIds:["signal-ecommerce-orders"],skills:{business:4,information:3},opportunity:{chainId:"ecommerce",stage:"emergence",entered:!1}}},{id:"ignore",label:"觉得不够可靠",result:{stats:{pressure:-1}}}]},{id:"opportunity-ecommerce-entry",title:"标准商品网店试营",description:"日用小商品的线上订单正在增长，货源、包装和配送决定能否持续经营。",yearMin:2011,yearMax:2015,weight:55,interaction:"opportunity",declineAllowed:!0,options:[{id:"store",label:"投入20万元建立仓配与网店持仓",result:{projectInvestment:{projectId:"online-retail-fulfillment",amount:20},stats:{pressure:5},skills:{business:6,management:2},opportunity:{chainId:"ecommerce",stage:"growth",entered:!0},addFlags:["ecommerce-entry","industry-invested-online-retail-fulfillment"]}},{id:"supply",label:"先学习供应链",result:{skills:{business:4},opportunity:{chainId:"ecommerce",stage:"growth",entered:!1}}}]},{id:"signal-mobile",title:"口袋里的屏幕",description:"越来越多人通过手机获取服务、付款和社交。",yearMin:2011,yearMax:2014,weight:75,options:[{id:"follow",label:"持续关注变化",result:{signalIds:["signal-mobile-users"],skills:{information:4},opportunity:{chainId:"mobile-internet",stage:"emergence",entered:!1}}},{id:"wait",label:"等行业更成熟",result:{stats:{pressure:-1}}}]},{id:"opportunity-mobile-entry",title:"移动生活服务团队岗位",description:"一家移动生活服务团队正在招聘产品、技术和运营人员。",yearMin:2014,yearMax:2017,weight:65,interaction:"opportunity",declineAllowed:!0,options:[{id:"join",label:"进入移动服务团队",result:{skills:{technology:4,management:3},stats:{funds:18,pressure:4},opportunity:{chainId:"mobile-internet",stage:"growth",entered:!0},addFlags:["mobile-entry"]}},{id:"study",label:"先补足能力",result:{skills:{technology:5},opportunity:{chainId:"mobile-internet",stage:"growth",entered:!1}}}]},{id:"signal-content",title:"个人表达的机会",description:"有人靠持续创作获得了大量关注，但收入仍不稳定。",yearMin:2014,yearMax:2018,weight:70,options:[{id:"signal",label:"分析内容趋势",result:{signalIds:["signal-content-creators"],skills:{expression:3,information:3},opportunity:{chainId:"content-industry",stage:"growth",entered:!1}}},{id:"pass",label:"暂不投入",result:{stats:{pressure:-1}}}]},{id:"opportunity-content-entry",title:"建立垂直内容账号",description:"你可以围绕一个具体领域持续创作，通过广告和项目合作尝试变现。",yearMin:2016,yearMax:2021,weight:60,interaction:"opportunity",declineAllowed:!0,options:[{id:"create",label:"投入12万元建立内容工作室持仓",result:{projectInvestment:{projectId:"short-video-studio",amount:12},skills:{expression:6,business:3},stats:{pressure:5},opportunity:{chainId:"content-industry",stage:"boom",entered:!0},addFlags:["content-entry","industry-invested-short-video-studio"]}},{id:"observe",label:"继续观察",result:{skills:{information:3}}}]},{id:"signal-housing",title:"居住成本的变化",description:"租金、通勤和住房讨论开始影响身边人的选择。",yearMin:2014,yearMax:2020,weight:55,options:[{id:"notice",label:"记录成本和趋势",result:{signalIds:["signal-housing-demand"],skills:{information:3},opportunity:{chainId:"urban-housing",stage:"growth",entered:!1}}},{id:"ignore",label:"以后再考虑",result:{stats:{happiness:1}}}]},{id:"signal-energy",title:"新能源的产业消息",description:"技术、政策和产业投资开始在新闻中频繁出现。",yearMin:2017,yearMax:2022,weight:55,options:[{id:"research",label:"追踪产业消息",result:{signalIds:["signal-energy-policy"],skills:{information:4,technology:2},opportunity:{chainId:"new-energy",stage:"growth",entered:!1}}},{id:"wait",label:"等待更明确的机会",result:{stats:{pressure:-1}}}]},{id:"signal-ai",title:"智能工具的涌现",description:"生成式工具开始帮助人们写作、编程和分析信息。",yearMin:2022,yearMax:2026,weight:90,options:[{id:"learn",label:"学习并尝试工具",result:{signalIds:["signal-ai-tooling"],skills:{technology:6,information:4},opportunity:{chainId:"artificial-intelligence",stage:"growth",entered:!0},addFlags:["ai-entry"]}},{id:"observe",label:"先观察行业应用",result:{signalIds:["signal-ai-tooling"],skills:{information:3},opportunity:{chainId:"artificial-intelligence",stage:"growth",entered:!1}}}]}]),e("OPPORTUNITY_CONTENT_EVENTS",i("opportunity",[].concat(n("opportunity",2004,4,4),n("opportunity",2008,4,5,["flags.computer-intro"]),n("opportunity",2011,4,5,["skills.information>=18"]),n("opportunity",2015,3,5,["flags.career-started"]),n("investment",2017,3,5,["flags.career-started"]))));t._RF.pop()}}}));

System.register("chunks:///_virtual/OpportunitySystem.ts",["./rollupPluginModLoBabelHelpers.js","cc","./OpportunityConfig.ts"],(function(n){var t,i,u,r;return{setters:[function(n){t=n.extends},function(n){i=n.cclegacy},function(n){u=n.SIGNALS,r=n.OPPORTUNITY_CHAINS}],execute:function(){i._RF.push({},"13298pM3O5Di5h4eHqqsmpm","OpportunitySystem",void 0);n("OpportunitySystem",function(){function n(){}var i=n.prototype;return i.signalText=function(n){var t,i;return null!=(t=null==(i=u.find((function(t){return t.id===n})))?void 0:i.text)?t:"尚未辨明的时代信号"},i.chainName=function(n){var t,i;return null!=(t=null==(i=r.find((function(t){return t.id===n})))?void 0:i.name)?t:"未命名机遇"},i.hasSignalForChain=function(n,t){return n.discoveredSignalIds.some((function(n){var i;return(null==(i=u.find((function(t){return t.id===n})))?void 0:i.chainId)===t}))},i.applyProgress=function(n,i){var u=n.opportunities.find((function(n){return n.chainId===i.chainId}));u?Object.assign(u,i):n.opportunities.push(t({},i))},n}());i._RF.pop()}}}));

System.register("chunks:///_virtual/ReportGenerator.ts",["cc","./GameEvents.ts","./OpportunitySystem.ts","./WealthSystem.ts"],(function(t){var e,n,i,r;return{setters:[function(t){e=t.cclegacy},function(t){n=t.GAME_EVENTS},function(t){i=t.OpportunitySystem},function(t){r=t.totalAssetValue}],execute:function(){e._RF.push({},"04c35AGqylPjp3NysLTimnB","ReportGenerator",void 0);t("ReportGenerator",function(){function t(){this.opportunities=new i}return t.prototype.generate=function(t){var e=this,i=[["健康",t.stats.health],["幸福",t.stats.happiness],["家庭",t.stats.familyBond],["财富",Math.min(100,t.stats.funds+r(t))],["知识",t.stats.knowledge]],o=[].concat(i).sort((function(t,e){return e[1]-t[1]}))[0][0],u=[].concat(i).sort((function(t,e){return t[1]-e[1]}))[0][0],a=t.opportunities.filter((function(t){return t.entered})).map((function(t){return e.opportunities.chainName(t.chainId)})),c=t.lifeLog.map((function(t){var e,i,r=n.find((function(e){return e.id===t.eventId})),s=null==r?void 0:r.options.find((function(e){return e.id===t.optionId}));return{year:t.year,age:t.year-1992,event:null!=(e=null==r?void 0:r.title)?e:"未记录的事件",choice:null!=(i=null==s?void 0:s.label)?i:"未记录的选择",impact:"这一次选择改变了之后的人生资源与可能性。"}})),l=[["父亲","父子/父女",t.relationships.father],["母亲","母子/母女",t.relationships.mother],["朋友","友谊",t.relationships.friend],["伴侣","亲密关系",t.relationships.partner],["导师","师友",t.relationships.mentor]].filter((function(t){return t[2]>0})).sort((function(t,e){return e[2]-t[2]})).slice(0,3).map((function(t){var e=t[0],n=t[1],i=t[2];return{name:e,relationship:n,finalScore:i,impact:i>=70?"长期支持你的人生选择。":"在不同阶段留下了重要影响。"}})),p=[t.identityId.includes("rural")?"小镇成长":"人生重启",t.skills.technology>=70?"技术极客":t.skills.business>=70?"商业嗅觉":"持续积累",s(t),t.stats.health<=30?"透支警醒":t.stats.happiness>=70?"内心丰盛":"继续前行"].filter((function(t,e,n){return n.indexOf(t)===e})).slice(0,5);return{summary:"你经历了 "+t.lifeLog.length+" 次关键选择，并在"+o+"维度留下最深痕迹。",strongestDimension:o,greatestSacrifice:u,opportunities:a,timeline:c,missedOpportunities:["电商","移动互联网","内容产业","人工智能"].filter((function(t){return!a.includes(t)})),biggestSuccess:"财富"===o?"完成了可观的资产积累。":"把"+o+"变成了人生的支点。",biggestRegret:"最需要重新照看的维度是"+u+"。",keyPeople:l,lifeKeywords:p,oneLineReview:"这是一段以「"+p.join("、")+"」为关键词的人生。"}},t}());function s(t){var e=r(t);return e>=200?"资产自由":e>=80?"稳健布局":"脚踏实地"}e._RF.pop()}}}));

System.register("chunks:///_virtual/RequirementFormatter.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"ea7a8aFSmVCeJ1mBQNN69eU","RequirementFormatter",void 0);e("RequirementFormatter",function(){function e(){}var t=e.prototype;return t.formatAll=function(e){var t=this;return void 0===e&&(e=[]),0===e.length?"无特殊条件":e.map((function(e){return t.format(e)})).join("；")},t.format=function(e){if(e.startsWith("flags."))return"需要经历："+this.flagName(e.slice(6));var t=e.match(/^(attributes|skills|stats)\.([a-zA-Z]+)\s*(>=|<=|==|>|<)\s*(-?\d+)$/);if(!t)return"需要满足前置条件";var n=t[1],r=t[2],i=t[3],a=t[4],o=Number(a),u={">=":"≥","<=":"≤","==":"=",">":">","<":"<"}[i];return"stats"===n&&"funds"===r?"可用现金 "+u+" "+this.money(o):this.nameOf(n,r)+" "+u+" "+o},t.money=function(e){return"¥"+Math.round(1e4*e).toLocaleString("zh-CN")},t.nameOf=function(e,t){var n;return null!=(n={intelligence:"智力",emotionalIntelligence:"情商",constitution:"体质",execution:"执行力",charm:"魅力",luck:"运气",learning:"学习能力",technology:"技术能力",business:"商业能力",expression:"表达能力",management:"管理能力",information:"信息能力",familyResources:"家庭资源",health:"健康",pressure:"压力",happiness:"幸福",knowledge:"知识",familyBond:"家庭关系",romance:"感情关系",informationValue:"信息值",worldShift:"世界偏移"}[t])?n:"相应能力"},t.flagName=function(e){var t;return null!=(t={"career-started":"拥有正式工作","middle-school":"完成初中阶段","university-entry":"完成大学录取","computer-intro":"接触过电脑"}[e])?t:"相应的人生经历"},e}());t._RF.pop()}}}));

System.register("chunks:///_virtual/SaveManager.ts",["cc", "./EducationProgressionSystem.ts", "./IdentityConfig.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, EducationProgressionSystem_1, IdentityConfig_1, SAVE_KEY, SaveManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (EducationProgressionSystem_1_1) {
                EducationProgressionSystem_1 = EducationProgressionSystem_1_1;
            },
            function (IdentityConfig_1_1) {
                IdentityConfig_1 = IdentityConfig_1_1;
            }
        ],
        execute: function () {
            SAVE_KEY = 'restart-life.save.v1';
            SaveManager = class SaveManager {
                constructor() {
                    this.education = new EducationProgressionSystem_1.EducationProgressionSystem();
                }
                save(state) {
                    cc_1.sys.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
                }
                load() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
                    var _2, _3, _4, _5, _6, _7, _8, _9;
                    const raw = cc_1.sys.localStorage.getItem(SAVE_KEY);
                    if (!raw)
                        return undefined;
                    try {
                        const state = JSON.parse(raw);
                        if (state.version !== 1)
                            return undefined;
                        // Additive schema migration keeps development saves playable as new systems appear.
                        (_a = state.career) !== null && _a !== void 0 ? _a : (state.career = { track: 'unemployed', level: 'junior', workIntensity: 'normal', industry: '', yearsAtLevel: 0 });
                        (_b = (_2 = state.career).yearsAtLevel) !== null && _b !== void 0 ? _b : (_2.yearsAtLevel = 0);
                        (_c = (_3 = state.stats).knowledge) !== null && _c !== void 0 ? _c : (_3.knowledge = 10);
                        (_d = state.education) !== null && _d !== void 0 ? _d : (state.education = { level: 'primary', city: 'county', studyHabit: 20, academicScore: 50, studyYears: 0 });
                        (_e = (_4 = state.education).studyHabit) !== null && _e !== void 0 ? _e : (_4.studyHabit = 20);
                        (_f = (_5 = state.education).academicScore) !== null && _f !== void 0 ? _f : (_5.academicScore = 50);
                        const elapsedSchoolYears = Math.min(10, Math.max(0, state.age - 8));
                        // The previous build accidentally replaced both values with 2 whenever "学习成长" settled.
                        const hasOverwrittenEducation = state.education.studyHabit <= 4 && state.education.academicScore <= 4;
                        (_g = (_6 = state.education).studyYears) !== null && _g !== void 0 ? _g : (_6.studyYears = hasOverwrittenEducation
                            ? elapsedSchoolYears
                            : Math.min(elapsedSchoolYears, Math.max(0, Math.round((state.education.studyHabit - 20) / 2))));
                        if (hasOverwrittenEducation) {
                            state.education.studyHabit = Math.min(100, 20 + state.education.studyYears * 2);
                            state.education.academicScore = Math.min(100, 50 + state.education.studyYears * 2);
                            if (state.flags.includes('high-school-placement'))
                                this.education.resolveHighSchool(state);
                            if (state.flags.includes('university-entry'))
                                this.education.resolveUniversity(state);
                        }
                        (_h = state.lifeFocus) !== null && _h !== void 0 ? _h : (state.lifeFocus = state.career.track === 'unemployed' ? 'study' : 'work');
                        (_j = state.finance) !== null && _j !== void 0 ? _j : (state.finance = { familyAllowanceAnnual: 0.5, salaryAnnual: 0, livingCostAnnual: 0, loanBalance: 0, loanLimit: 0, lastCashflow: 0, history: [] });
                        (_k = (_7 = state.finance).history) !== null && _k !== void 0 ? _k : (_7.history = []);
                        (_l = state.startup) !== null && _l !== void 0 ? _l : (state.startup = { active: false });
                        (_m = state.assets) !== null && _m !== void 0 ? _m : (state.assets = []);
                        (_o = state.housingHoldings) !== null && _o !== void 0 ? _o : (state.housingHoldings = []);
                        if (state.housingHoldings.length === 0) {
                            const legacyHousing = state.assets.find((asset) => asset.type === 'housing' && asset.value > 0);
                            if (legacyHousing)
                                state.housingHoldings.push({ id: `legacy-housing-${state.year}`, productId: 'legacy', city: state.education.city, name: '旧存档住房', purchaseYear: state.year, purchasePrice: legacyHousing.value, currentValue: legacyHousing.value });
                        }
                        (_p = state.industryProjects) !== null && _p !== void 0 ? _p : (state.industryProjects = []);
                        state.industryProjects.forEach((holding) => {
                            var _a;
                            (_a = holding.realizedReturn) !== null && _a !== void 0 ? _a : (holding.realizedReturn = holding.status === 'failed' ? -holding.investedPrincipal : 0);
                            if (holding.status === 'failed') {
                                holding.currentValue = 0;
                                holding.realizedReturn = -holding.investedPrincipal;
                            }
                        });
                        (_q = state.market) !== null && _q !== void 0 ? _q : (state.market = { discoveredInstrumentIds: [], positions: [], realizedProfit: 0, insightIds: [], generatedInstruments: [] });
                        (_r = (_8 = state.market).insightIds) !== null && _r !== void 0 ? _r : (_8.insightIds = []);
                        (_s = (_9 = state.market).generatedInstruments) !== null && _s !== void 0 ? _s : (_9.generatedInstruments = []);
                        (_t = state.relationships) !== null && _t !== void 0 ? _t : (state.relationships = { father: 50, mother: 50, friend: 30, partner: 0, mentor: 0 });
                        (_u = state.discoveredSignalIds) !== null && _u !== void 0 ? _u : (state.discoveredSignalIds = []);
                        (_v = state.opportunities) !== null && _v !== void 0 ? _v : (state.opportunities = []);
                        (_w = state.lifeLog) !== null && _w !== void 0 ? _w : (state.lifeLog = []);
                        (_x = state.completed) !== null && _x !== void 0 ? _x : (state.completed = false);
                        (_y = state.delayedEvents) !== null && _y !== void 0 ? _y : (state.delayedEvents = []);
                        (_z = state.unlockedAchievementIds) !== null && _z !== void 0 ? _z : (state.unlockedAchievementIds = []);
                        (_0 = state.lastWellbeingYear) !== null && _0 !== void 0 ? _0 : (state.lastWellbeingYear = -1);
                        (_1 = state.annualActionYears) !== null && _1 !== void 0 ? _1 : (state.annualActionYears = {});
                        for (const flag of IdentityConfig_1.familyFlagsFor(state.identityId))
                            if (!state.flags.includes(flag))
                                state.flags.push(flag);
                        // Earlier builds ended every run at 2026. Reopen those premature endings under the 80-year life span.
                        if (state.completed && state.age < 80) {
                            state.completed = false;
                            state.ending = undefined;
                        }
                        return state;
                    }
                    catch (_10) {
                        return undefined;
                    }
                }
                clear() {
                    cc_1.sys.localStorage.removeItem(SAVE_KEY);
                }
                hasSave() { return this.load() !== undefined; }
                hasContinuableSave() {
                    const state = this.load();
                    return !!state && !state.completed;
                }
            };
            exports_1("SaveManager", SaveManager);
        }
    };
});
System.register("chunks:///_virtual/SeededRandom.ts",["cc"],(function(t){var e;return{setters:[function(t){e=t.cclegacy}],execute:function(){e._RF.push({},"ce4edKafq5J1KWVOrigEJ9H","SeededRandom",void 0);t("SeededRandom",function(){function t(t){this.state=void 0,this.state=t>>>0}var e=t.prototype;return e.next=function(){this.state+=1831565813;var t=this.state;return t=Math.imul(t^t>>>15,1|t),(((t^=t+Math.imul(t^t>>>7,61|t))^t>>>14)>>>0)/4294967296},e.int=function(t,e){return Math.floor(this.next()*(e-t+1))+t},t}());e._RF.pop()}}}));

System.register("chunks:///_virtual/StarterEvents.ts",["cc","./EventTemplates.ts"],(function(e){var s,i,t;return{setters:[function(e){s=e.cclegacy},function(e){i=e.buildTemplateEvents,t=e.seedSeries}],execute:function(){s._RF.push({},"c7315itELxNY6FcjExifJ3M","StarterEvents",void 0);e("STARTER_EVENTS",[{id:"childhood-first-computer",title:"家里的旧电脑",description:"亲戚送来一台旧电脑。你可以把它当成玩具，也可以开始了解它。",yearMin:2e3,yearMax:2002,weight:100,options:[{id:"learn",label:"学习电脑基础",result:{skills:{technology:8,information:3},stats:{knowledge:6,pressure:5,happiness:-3},addFlags:["computer-intro"]}},{id:"play",label:"和朋友一起玩游戏",result:{attributes:{charm:2},stats:{happiness:6,pressure:-3}}}]},{id:"childhood-reading-habit",title:"放学后的时间",description:"老师建议你建立阅读习惯，但朋友约你去踢球。",yearMin:2001,yearMax:2004,weight:90,options:[{id:"read",label:"去图书馆读书",result:{skills:{learning:6,information:2},attributes:{intelligence:2},stats:{knowledge:7,pressure:5,happiness:-4},addFlags:["reading-habit"]}},{id:"sports",label:"和朋友去踢球",result:{attributes:{constitution:3,charm:2},stats:{happiness:4,pressure:-3,health:2}}}]},{id:"childhood-family-shop",title:"周末的家庭小店",description:"家里需要一个人帮忙照看店铺。你会如何安排这个周末？",yearMin:2003,yearMax:2006,weight:70,prerequisites:["stats.familyResources>=10"],options:[{id:"help",label:"帮忙招待顾客",result:{skills:{business:5,expression:2},attributes:{execution:2},stats:{knowledge:1,pressure:2,happiness:-1},addFlags:["family-business-experience"]}},{id:"study",label:"坚持完成作业",result:{skills:{learning:4},stats:{knowledge:5,pressure:5,happiness:-3}}}]},{id:"childhood-online-community",title:"网络社区的邀请码",description:"同学邀请你加入一个小小的网络社区，里面有人分享编程和写作。",yearMin:2004,yearMax:2006,weight:80,prerequisites:["flags.computer-intro"],options:[{id:"join",label:"注册并持续分享",result:{skills:{technology:4,expression:4,information:4},stats:{knowledge:4,pressure:3,happiness:-1},addFlags:["online-community"]}},{id:"observe",label:"先旁观一段时间",result:{skills:{information:3},stats:{knowledge:2,pressure:-1,happiness:1}}}]}]),e("STARTER_CONTENT_EVENTS",i("childhood",[].concat(t("computer",2e3,3,3),t("reading",2e3,3,4),t("family",2001,4,5),t("social",2001,3,5),t("hobby",2002,4,5),t("era",2002,3,5),t("health",2001,3,5),t("reflection",2003,3,4))));s._RF.pop()}}}));

System.register("chunks:///_virtual/StartupConfig.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"82f28GRvNdHyIBJdcBhhwea","StartupConfig",void 0);e("TALENTS",[{id:"fast-learner",name:"学得很快",description:"学习能力提升。",rarity:"common",result:{skills:{learning:8}}},{id:"healthy-body",name:"身体不错",description:"体质和健康提升。",rarity:"common",result:{attributes:{constitution:5},stats:{health:10}}},{id:"likable",name:"讨人喜欢",description:"魅力与表达能力提升。",rarity:"common",result:{attributes:{charm:5},skills:{expression:3}}},{id:"diligent",name:"踏实肯干",description:"执行力提升。",rarity:"common",result:{attributes:{execution:6}}},{id:"calm",name:"情绪稳定",description:"初始压力更低。",rarity:"common",result:{stats:{pressure:-6}}},{id:"eloquent",name:"能说会道",description:"表达与情商提升。",rarity:"common",result:{skills:{expression:6},attributes:{emotionalIntelligence:3}}},{id:"curious",name:"好奇心强",description:"信息与学习能力提升。",rarity:"common",result:{skills:{information:5,learning:3}}},{id:"careful",name:"心思细密",description:"信息与管理能力提升。",rarity:"common",result:{skills:{information:4,management:3}}},{id:"optimistic",name:"乐观",description:"幸福与魅力提升。",rarity:"common",result:{stats:{happiness:7},attributes:{charm:2}}},{id:"resilient",name:"抗压",description:"体质提升，压力降低。",rarity:"common",result:{attributes:{constitution:3},stats:{pressure:-4}}},{id:"business-sense",name:"商业嗅觉",description:"商业能力显著提升。",rarity:"rare",result:{skills:{business:10}}},{id:"judge-character",name:"识人之明",description:"情商与信息能力提升。",rarity:"rare",result:{attributes:{emotionalIntelligence:5},skills:{information:5}}},{id:"energetic",name:"精力充沛",description:"健康与执行力提升。",rarity:"rare",result:{stats:{health:8},attributes:{execution:4}}},{id:"numbers",name:"数字敏感",description:"智力与商业能力提升。",rarity:"rare",result:{attributes:{intelligence:5},skills:{business:5}}},{id:"tech-intuition",name:"技术直觉",description:"技术能力显著提升。",rarity:"rare",result:{skills:{technology:10}}},{id:"social-core",name:"善于合作",description:"情商、表达与管理能力提升。",rarity:"rare",result:{skills:{expression:4,management:3},attributes:{emotionalIntelligence:4}}},{id:"storyteller",name:"故事感",description:"表达与魅力提升。",rarity:"rare",result:{skills:{expression:8},attributes:{charm:4}}},{id:"organizer",name:"组织者",description:"管理与执行力提升。",rarity:"rare",result:{skills:{management:8},attributes:{execution:3}}},{id:"steady-hand",name:"稳健投资者",description:"商业与信息能力提升。",rarity:"rare",result:{skills:{business:5,information:5}}},{id:"quick-recovery",name:"恢复很快",description:"体质与健康提升。",rarity:"rare",result:{attributes:{constitution:6},stats:{health:6}}},{id:"benefactor",name:"关键引路人",description:"更早获得一次职业指引和信息优势。",rarity:"legendary",result:{skills:{information:7,management:4},stats:{informationValue:8},addFlags:["benefactor"]}},{id:"past-echo",name:"前世残影",description:"未来记忆更加清晰。",rarity:"legendary",result:{stats:{informationValue:12},addFlags:["memory-boost"]}},{id:"time-observer",name:"时间观察者",description:"信息能力显著提升。",rarity:"legendary",result:{skills:{information:12},addFlags:["extra-signal"]}},{id:"second-choice",name:"第二选择",description:"获得一次回退机会。",rarity:"legendary",result:{addFlags:["event-rollback"]}},{id:"born-leader",name:"天生领袖",description:"管理、魅力与执行力提升。",rarity:"legendary",result:{skills:{management:8},attributes:{charm:5,execution:4}}},{id:"focus-master",name:"专注",description:"学习与技术能力提升。",rarity:"rare",result:{skills:{learning:6,technology:5}}},{id:"warm-heart",name:"共情力",description:"情商、幸福与家庭关系提升。",rarity:"rare",result:{attributes:{emotionalIntelligence:5},stats:{happiness:4,familyBond:5}}},{id:"adaptable",name:"适应力强",description:"学习、执行与健康提升。",rarity:"common",result:{skills:{learning:3},attributes:{execution:3,constitution:2}}},{id:"bold",name:"敢于尝试",description:"执行与商业能力提升。",rarity:"common",result:{attributes:{execution:4},skills:{business:3}}},{id:"quiet-thinker",name:"安静思考者",description:"智力与信息能力提升。",rarity:"common",result:{attributes:{intelligence:4},skills:{information:3}}}]);var i=e("NO_DEFECT",{id:"none",name:"无明显短板",description:"天赋只提供优势，不再随机捆绑严重副作用。",result:{}});e("DEFECTS",[i,{id:"procrastination",name:"拖延",description:"执行力下降。",result:{attributes:{execution:-6}}},{id:"impulse-spending",name:"冲动消费",description:"初始资金减少。",result:{stats:{funds:-5}}},{id:"risk-averse",name:"风险厌恶",description:"商业能力略降。",result:{skills:{business:-4}}},{id:"overconfident",name:"过度自信",description:"信息判断下降。",result:{skills:{information:-4}}},{id:"social-anxiety",name:"社交恐惧",description:"情商与表达能力下降。",result:{attributes:{emotionalIntelligence:-5},skills:{expression:-4}}},{id:"frail",name:"身体虚弱",description:"体质与健康下降。",result:{attributes:{constitution:-8},stats:{health:-10}}},{id:"family-pressure",name:"家庭压力",description:"初始压力提高。",result:{stats:{pressure:15}}},{id:"gullible",name:"容易轻信",description:"信息能力下降。",result:{skills:{information:-6}}},{id:"workaholic",name:"工作成瘾",description:"幸福下降。",result:{stats:{happiness:-8}}},{id:"perfectionist",name:"完美主义",description:"压力提高，执行力略升。",result:{stats:{pressure:8},attributes:{execution:2}}},{id:"short-tempered",name:"急躁",description:"情商下降。",result:{attributes:{emotionalIntelligence:-5}}},{id:"low-self-esteem",name:"缺乏自信",description:"魅力与表达下降。",result:{attributes:{charm:-4},skills:{expression:-3}}},{id:"distracted",name:"容易分心",description:"学习能力下降。",result:{skills:{learning:-6}}},{id:"stubborn",name:"固执",description:"管理与情商下降。",result:{skills:{management:-3},attributes:{emotionalIntelligence:-3}}},{id:"avoid-conflict",name:"回避冲突",description:"表达与执行力下降。",result:{skills:{expression:-3},attributes:{execution:-3}}}]),e("MEMORIES",[{id:"mobile-life",text:"随身设备会改变人们的生活。",accuracy:"clear",effectText:"提前获得移动互联网信号；信息 +4",result:{signalIds:["signal-mobile-users"],skills:{information:4}}},{id:"online-shopping",text:"人们会越来越习惯线上消费。",accuracy:"clear",effectText:"提前获得电商信号；商业 +4",result:{signalIds:["signal-ecommerce-orders"],skills:{business:4}}},{id:"personal-media",text:"个人也能拥有自己的媒体渠道。",accuracy:"fairly-clear",effectText:"提前获得内容产业信号；表达 +4",result:{signalIds:["signal-content-creators"],skills:{expression:4}}},{id:"automation",text:"自动化工具会逐渐替代重复劳动。",accuracy:"fairly-clear",effectText:"技术 +3、信息 +3",result:{skills:{technology:3,information:3}}},{id:"city-growth",text:"机会会不断向更大的城市集中。",accuracy:"clear",effectText:"提前获得城市资源信号；信息 +3",result:{signalIds:["signal-city-resource"],skills:{information:3}}},{id:"housing",text:"居住选择会影响很长一段人生。",accuracy:"fairly-clear",effectText:"提前获得住房信号；信息 +3",result:{signalIds:["signal-housing-demand"],skills:{information:3}}},{id:"education",text:"早期的学习习惯会拉开差距。",accuracy:"clear",effectText:"学习 +5、知识 +4、学习习惯 +4",result:{skills:{learning:5},stats:{knowledge:4},education:{studyHabit:4,academicScore:3}}},{id:"content",text:"注意力会成为稀缺资源。",accuracy:"fairly-clear",effectText:"表达 +3、商业 +2",result:{skills:{expression:3,business:2}}},{id:"clean-energy",text:"能源的变化会创造新的职业。",accuracy:"blurred",effectText:"提前获得新能源信号；技术 +3",result:{signalIds:["signal-energy-policy"],skills:{technology:3}}},{id:"ai-tools",text:"机器会开始帮助人们创造内容。",accuracy:"blurred",effectText:"提前获得人工智能信号；技术 +4",result:{signalIds:["signal-ai-tooling"],skills:{technology:4}}},{id:"community",text:"线上社区会改变信息传播方式。",accuracy:"fairly-clear",effectText:"信息 +4、表达 +3",result:{skills:{information:4,expression:3}}},{id:"health",text:"透支身体的代价会在后来显现。",accuracy:"clear",effectText:"健康 +8、体质 +3",result:{stats:{health:8},attributes:{constitution:3}}},{id:"family",text:"有些陪伴错过后很难补回。",accuracy:"fairly-clear",effectText:"家庭关系 +8、幸福 +3",result:{stats:{familyBond:8,happiness:3},signalIds:["signal-family-time"]}},{id:"cashflow",text:"稳定现金流比一时风口更重要。",accuracy:"blurred",effectText:"商业 +3、起始现金 +¥30,000",result:{skills:{business:3},stats:{funds:3}}},{id:"skills",text:"能够持续学习的人会走得更远。",accuracy:"clear",effectText:"学习 +6、知识 +3",result:{skills:{learning:6},stats:{knowledge:3}}},{id:"network",text:"关键经历会在后来打开新的入口。",accuracy:"fairly-clear",effectText:"信息 +5、管理 +3",result:{skills:{information:5,management:3}}},{id:"global",text:"世界会比想象中更紧密地连接。",accuracy:"fragmentary",effectText:"信息 +4、表达 +2",result:{skills:{information:4,expression:2}}},{id:"crisis",text:"繁荣和风险总会交替出现。",accuracy:"blurred",effectText:"信息 +5、压力 -3",result:{skills:{information:5},stats:{pressure:-3}}},{id:"small-team",text:"小团队也能做成影响很多人的产品。",accuracy:"fragmentary",effectText:"技术 +3、管理 +3",result:{skills:{technology:3,management:3}}},{id:"choice",text:"真正重要的不是答案，而是判断。",accuracy:"fairly-clear",effectText:"智力 +3、执行力 +3",result:{attributes:{intelligence:3,execution:3}}}]);t._RF.pop()}}}));

System.register("chunks:///_virtual/StartupSystem.ts",["cc","./AssetSystem.ts"],(function(t){var s,e;return{setters:[function(t){s=t.cclegacy},function(t){e=t.AssetSystem}],execute:function(){s._RF.push({},"2e2d6aD51tLRJRjvy9LT1lc","StartupSystem",void 0);var r={ecommerce:{name:"电商店铺",industry:"线上零售",description:"依靠选品、供应链与流量经营。",cost:30,risk:"中",riskScore:25,chain:"ecommerce",skill:"business",suitedSkill:"商业",returnPath:"稳定后估值 +¥350,000；扩张再 +¥800,000"},"local-service":{name:"本地服务",industry:"餐饮与生活服务",description:"服务真实社区，增长较慢但需求稳定。",cost:25,risk:"低",riskScore:20,chain:"mobile-internet",skill:"business",suitedSkill:"商业",returnPath:"稳定后估值 +¥350,000；扩张再 +¥800,000"},content:{name:"内容工作室",industry:"自媒体与内容",description:"用持续创作换取关注与商业合作。",cost:15,risk:"高",riskScore:30,chain:"content-industry",skill:"expression",suitedSkill:"表达",returnPath:"低投入高波动；成熟后每次推进现金 +¥250,000"},software:{name:"软件工具",industry:"企业软件与互联网",description:"用技术解决重复、协作和效率问题。",cost:40,risk:"高",riskScore:35,chain:"pc-internet",skill:"technology",suitedSkill:"技术",returnPath:"稳定后估值 +¥350,000；扩张再 +¥800,000"},emerging:{name:"智能自动化",industry:"人工智能应用",description:"将智能工具用于内容、办公或行业服务。",cost:60,risk:"高",riskScore:45,chain:"artificial-intelligence",skill:"information",suitedSkill:"信息",returnPath:"投入最高；扩张成功后的估值上限更高"}};t("StartupSystem",function(){function t(){this.assets=new e}var s=t.prototype;return s.preview=function(t){return r[t]},s.startProject=function(t,s){if(t.startup.active)throw new Error("你已经在经营一个项目，请先推进或退出它。");var e=r[s];if(t.stats.funds<e.cost)throw new Error("启动该项目需要 ¥"+(1e4*e.cost).toLocaleString("zh-CN")+" 现金。");t.stats.funds-=e.cost,t.startup={active:!0,project:s,stage:"launch"},this.assets.apply(t.assets,"startup",e.cost),t.skills[e.skill]=Math.min(100,t.skills[e.skill]+3),t.stats.pressure=Math.min(100,t.stats.pressure+6),t.flags.push("startup-"+s)},s.successRate=function(t,s){if(void 0===s&&(s=t.startup.project),!s)return 0;var e=r[s],i=.3*t.attributes.execution+.3*t.skills[e.skill]+.22*t.skills.business+.18*t.skills.information;return Math.max(5,Math.min(85,Math.round(30+.6*i-e.riskScore)))},s.advanceStage=function(t){if(!t.startup.active||!t.startup.project)throw new Error("当前没有进行中的创业项目。");var s=this.successRate(t);if(!((t.seed+t.year+17*t.lifeLog.length)%100<s))throw t.stats.pressure=Math.min(100,t.stats.pressure+8),this.assets.apply(t.assets,"startup",-10),new Error("本轮推进未达预期（成功率 "+s+"%），项目估值下降。");"launch"===t.startup.stage?(t.startup.stage="stable",this.assets.apply(t.assets,"startup",35)):"stable"===t.startup.stage?(t.startup.stage="expansion",this.assets.apply(t.assets,"startup",80)):(t.stats.funds+=25,this.assets.apply(t.assets,"startup",20))},s.exit=function(t){var s,e;if(!t.startup.active)throw new Error("当前没有可退出的项目。");var r=null!=(s=null==(e=t.assets.find((function(t){return"startup"===t.type})))?void 0:e.value)?s:0;t.stats.funds+=Math.round(.7*r),this.assets.apply(t.assets,"startup",-r),t.startup={active:!1}},t}());s._RF.pop()}}}));

System.register("chunks:///_virtual/StatChangeAnimator.ts",["cc"],(function(n){var t,e,o,a,i,r,l,s,c;return{setters:[function(n){t=n.cclegacy,e=n.Node,o=n.UITransform,a=n.Vec3,i=n.Sprite,r=n.Color,l=n.Label,s=n.UIOpacity,c=n.tween}],execute:function(){t._RF.push({},"073118Fkd1E25XJdWGb+BwY","StatChangeAnimator",void 0);n("StatChangeAnimator",function(){function n(n){this.root=n}var t=n.prototype;return t.diff=function(n,t){var e=[],o=function(n,t,o,a){return void 0===a&&(a=!1),Object.keys(o).forEach((function(i){var r,l,s=(null!=(r=t[i])?r:0)-(null!=(l=n[i])?l:0);Math.abs(s)>.01&&e.push({name:o[i],delta:s,isMoney:a&&"funds"===i})}))};return o(n.stats,t.stats,{funds:"现金",health:"健康",pressure:"压力",happiness:"幸福",knowledge:"知识",informationValue:"信息值"},!0),o(n.skills,t.skills,{learning:"学习",technology:"技术",business:"商业",expression:"表达",management:"管理",information:"信息"}),e.slice(0,7)},t.playAnimation=function(n,t){var e=this;this.diff(n,t).forEach((function(n,t){return e.float(n,t)}))},t.float=function(n,t){var u=new e("StatDiff");u.addComponent(o).setContentSize(320,42),u.setPosition(new a(0,118-43*t)),u.addComponent(i).color=new r(36,31,48,245);var d=u.addComponent(l);d.string=(n.delta>0?"+":"")+(n.isMoney?"¥"+Math.round(1e4*n.delta).toLocaleString("zh-CN"):Math.round(n.delta))+"  "+n.name,d.fontSize=n.isMoney?22:19,d.lineHeight=28,d.horizontalAlign=l.HorizontalAlign.CENTER,d.verticalAlign=l.VerticalAlign.CENTER,d.overflow=l.Overflow.SHRINK,d.fontFamily="Noto Sans SC",d.color=n.delta>=0?n.isMoney?new r(224,138,110):new r(143,199,154):n.isMoney?new r(143,199,154):new r(224,138,110);var f=u.addComponent(s);f.opacity=0,this.root.addChild(u),c(u).delay(.07*t).parallel(c(f).to(.16,{opacity:255}),c(u).by(.75,{position:new a(0,52)},{easing:"quadOut"})).delay(.25).to(.18,{scale:new a(.88,.88,1)}).call((function(){return u.destroy()})).start()},n}());t._RF.pop()}}}));

System.register("chunks:///_virtual/UITheme.ts",["cc"],(function(e){var n,o;return{setters:[function(e){n=e.cclegacy,o=e.Color}],execute:function(){n._RF.push({},"8383bJxoxlGjJSdRaUoOSJV","UITheme",void 0);e("UITheme",{ink900:new o(25,31,42,255),ink850:new o(33,40,54,255),surface:new o(43,51,66,255),surfaceRaised:new o(54,63,80,255),line:new o(84,92,108,255),gold:new o(230,178,94,255),goldSoft:new o(240,201,135,255),text:new o(243,238,228,255),muted:new o(179,170,184,255),quiet:new o(125,116,136,255),gain:new o(143,199,154,255),loss:new o(224,138,110,255),info:new o(143,179,217,255),danger:new o(217,107,90,255),serif:"Noto Serif SC",sans:"Noto Sans SC"});n._RF.pop()}}}));

System.register("chunks:///_virtual/WealthSystem.ts",["cc","./MarketConfig.ts"],(function(t){var n,e;return{setters:[function(t){n=t.cclegacy},function(t){e=t.MARKET_INSTRUMENTS}],execute:function(){t("totalAssetValue",(function(t){var n=t.assets.reduce((function(t,n){return t+n.value}),0),r=t.industryProjects.filter((function(t){return"active"===t.status})).reduce((function(t,n){return t+n.currentValue}),0),u=[].concat(e,t.market.generatedInstruments),c=t.market.positions.reduce((function(n,e){var r,c,i,s,a,o,f,l,d,h,m,p=u.find((function(t){return t.id===e.instrumentId}));return n+(p?(r=p,c=t.year,f=Object.keys(r.prices).map(Number).sort((function(t,n){return t-n})),l=null!=(i=[].concat(f).reverse().find((function(t){return t<=c})))?i:f[0],d=null!=(s=f.find((function(t){return t>=c})))?s:f[f.length-1],h=null!=(a=r.prices[l])?a:r.startingPrice,m=null!=(o=r.prices[d])?o:h,(l===d||h<=0?h:h*Math.pow(m/h,(c-l)/(d-l)))*e.quantity):0)}),0);return Math.round(10*(n+r+c))/10})),n._RF.push({},"4b9caLI6chOkLS65anvzhUx","WealthSystem",void 0),n._RF.pop()}}}));

System.register("chunks:///_virtual/YearConfig.ts",["cc"],(function(e){var r;return{setters:[function(e){r=e.cclegacy}],execute:function(){e("getYearConfig",(function(e){var r;return null!=(r=a.find((function(r){return r.year===e})))?r:{year:e,headline:"人生终章",summary:"这一局人生已经到达终点。"}})),r._RF.push({},"14725F7o2VEUroiIfw9nPkL","YearConfig",void 0);var n={2e3:["新世纪的开始","电脑和互联网逐渐走进更多家庭。"],2003:["新的连接方式","网络社区与即时沟通开始改变人们获取信息的方式。"],2005:["城市的吸引力","教育、就业和生活资源继续向城市集中。"],2008:["不确定的世界","风险与机会同时显现，稳定收入变得更受重视。"],2010:["线上消费加速","更多人开始习惯通过网络购买商品和服务。"],2012:["移动设备普及","随身设备正在重塑人们的沟通与消费习惯。"],2014:["移动服务时代","应用、移动支付和本地服务快速增长。"],2016:["内容成为职业","短内容和直播让个人表达拥有更多可能。"],2018:["竞争升级","行业红利逐渐缩小，能力和效率开始决定差距。"],2020:["生活方式变化","远程协作与线上服务进入更多人的日常。"],2022:["技术再一次前进","自动化与智能工具开始进入更多行业。"],2024:["新工具，新选择","生成式工具改变创作、学习和工作的方式。"],2026:["站在新的路口","过去的每个选择，共同构成了此刻的人生。"],2030:["成熟的选择","经验开始产生复利，取舍也变得更加具体。"],2040:["人生的中段","事业、家庭与健康需要新的平衡。"],2050:["重新定义成功","你开始决定什么值得继续投入。"],2060:["从容的积累","时间让真正重要的事逐渐清晰。"],2070:["回望与传承","你拥有的经验与关系，正在影响后来的人。"]},a=e("YEARS",Array.from({length:73},(function(e,r){var a=2e3+r,t=n[a];return t?{year:a,headline:t[0],summary:t[1],isKeyYear:!0}:{year:a,headline:"平常的一年",summary:"生活仍在向前，新的选择会在合适的时候出现。"}})));r._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
