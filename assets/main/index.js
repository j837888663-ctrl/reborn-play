System.register("chunks:///_virtual/AbilityConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var ABILITIES, STAT_NAMES;
    var __moduleName = context_1 && context_1.id;
    function abilityValue(state, ability) {
        return Math.round(state[ability.group][ability.key]);
    }
    exports_1("abilityValue", abilityValue);
    function moneyText(amount) { return `¥${Math.round(amount * 10000).toLocaleString('zh-CN')}`; }
    exports_1("moneyText", moneyText);
    function signedMoneyText(amount) { return `${amount < 0 ? '−' : '+'}${moneyText(Math.abs(amount))}`; }
    exports_1("signedMoneyText", signedMoneyText);
    function changeText(change) {
        const parts = [];
        for (const group of [change.attributes, change.skills, change.stats]) {
            for (const [key, value] of Object.entries(group !== null && group !== void 0 ? group : {})) {
                if (!STAT_NAMES[key] || value === 0)
                    continue;
                parts.push(`${STAT_NAMES[key]} ${key === 'funds' || key === 'familyResources' ? signedMoneyText(value) : `${value > 0 ? '+' : ''}${value}`}`);
            }
        }
        if (change.projectInvestment)
            parts.push(`项目投入 ${moneyText(change.projectInvestment.amount)}`);
        return parts.join(' · ');
    }
    exports_1("changeText", changeText);
    return {
        setters: [],
        execute: function () {
            exports_1("ABILITIES", ABILITIES = [
                { group: 'skills', key: 'learning', name: '学习', use: '影响中考与高考成绩；教育研究岗位要求22；自学可提升。' },
                { group: 'skills', key: 'technology', name: '技术', use: '技术研发岗位要求20；影响技术工资和科技类机会。' },
                { group: 'skills', key: 'business', name: '商业', use: '销售岗位要求16、产品运营要求14；影响销售与产品收入。' },
                { group: 'skills', key: 'expression', name: '表达', use: '销售岗位要求14、内容传媒要求18；影响销售和传媒收入。' },
                { group: 'skills', key: 'management', name: '管理', use: '产品运营岗位要求13；影响产品收入与产品岗位晋升。' },
                { group: 'skills', key: 'information', name: '信息', use: '提高市场预告出现率；传媒岗位要求17，并影响传媒收入。' },
            ]);
            exports_1("STAT_NAMES", STAT_NAMES = {
                learning: '学习', technology: '技术', business: '商业',
                expression: '表达', management: '管理', information: '信息', funds: '现金', familyResources: '家庭资源',
                health: '健康', pressure: '压力', happiness: '幸福', knowledge: '知识',
            });
        }
    };
});












































System.register("chunks:///_virtual/AchievementConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var a, ACHIEVEMENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            a = (id, name, condition, rarity = 'bronze') => ({ id, name, description: `达成「${name}」人生节点。`, icon: '◆', condition, rarity });
            exports_1("ACHIEVEMENTS", ACHIEVEMENTS = [a('scholar-985', '学霸', 'flags.education-985', 'gold'), a('career-core', '核心人物', 'career.level==core', 'gold'), a('wealth-first', '第一桶金', 'stats.funds>=50', 'silver'), a('wealth-million', '百万富翁', 'assets.total>=100', 'gold'), a('invest-first', '初次尝鲜', 'flags.investment-practice'), a('industry-first', '行业投资者', 'flags.industry-invested-online-retail-fulfillment', 'silver'), a('startup-founder', '创业者', 'startup.stage==launch', 'silver'), a('unicorn', '独角兽', 'startup.stage==expansion', 'gold'), a('home-owner', '买房', 'assets.total>=1', 'silver'), a('family-time', '陪伴时光', 'flags.family-time', 'silver'), a('time-traveler', '时间旅行者', 'skills.information>=90', 'gold'), a('all-rounder', '全能者', 'skills.technology>=60', 'gold'), ...Array.from({ length: 28 }, (_, i) => a(`growth-${i + 1}`, `成长里程碑 ${i + 1}`, `stats.knowledge>=${20 + i * 2}`, i > 20 ? 'gold' : i > 10 ? 'silver' : 'bronze'))]);
        }
    };
});












































System.register("chunks:///_virtual/AchievementSystem.ts",["./AchievementConfig.ts", "./ConditionEvaluator.ts"], function (exports_1, context_1) {
    "use strict";
    var AchievementConfig_1, ConditionEvaluator_1, AchievementSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (AchievementConfig_1_1) {
                AchievementConfig_1 = AchievementConfig_1_1;
            },
            function (ConditionEvaluator_1_1) {
                ConditionEvaluator_1 = ConditionEvaluator_1_1;
            }
        ],
        execute: function () {
            AchievementSystem = class AchievementSystem {
                constructor() {
                    this.conditions = new ConditionEvaluator_1.ConditionEvaluator();
                }
                check(state) { const unlocked = AchievementConfig_1.ACHIEVEMENTS.filter(a => !state.unlockedAchievementIds.includes(a.id) && this.conditions.matches(state, a.condition)); unlocked.forEach(a => { state.unlockedAchievementIds.push(a.id); }); return unlocked; }
            };
            exports_1("AchievementSystem", AchievementSystem);
        }
    };
});












































System.register("chunks:///_virtual/AssetSystem.ts",[], function (exports_1, context_1) {
    "use strict";
    var AssetSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            AssetSystem = class AssetSystem {
                apply(assets, type, amount) {
                    const holding = assets.find((item) => item.type === type);
                    if (holding)
                        holding.value = Math.max(0, holding.value + amount);
                    else
                        assets.push({ type, value: Math.max(0, amount) });
                }
            };
            exports_1("AssetSystem", AssetSystem);
        }
    };
});












































System.register("chunks:///_virtual/CareerPathEvents.ts",[], function (exports_1, context_1) {
    "use strict";
    var CAREER_PATH_EVENTS;
    var __moduleName = context_1 && context_1.id;
    function pathEvent(track, id, title, description, yearMin, yearMax, options) {
        return { id: `career-path-${track}-${id}`, title, description, yearMin, yearMax, weight: 82, interaction: 'life-choice', prerequisites: [`career.track==${track}`], options };
    }
    return {
        setters: [],
        execute: function () {
            exports_1("CAREER_PATH_EVENTS", CAREER_PATH_EVENTS = [
                pathEvent('technology', 'architecture', '核心系统改造', '团队要重写一套高并发系统。它能带来技术壁垒，也会占用大量生活时间。', 2015, 2028, [
                    { id: 'lead', label: '负责核心架构', result: { skills: { technology: 8, management: 2, information: 2 }, stats: { pressure: 7, health: -2 }, addFlags: ['tech-core-system'] } },
                    { id: 'steady', label: '负责稳定交付', result: { skills: { technology: 4 }, stats: { pressure: 2, happiness: 2 } } },
                ]),
                pathEvent('technology', 'transition', '技术路线的转型', '基础编码被自动化工具重塑，你需要在架构、智能系统和管理之间重新定位。', 2029, 2052, [
                    { id: 'ai', label: '转向智能系统架构', result: { skills: { technology: 7, information: 6 }, stats: { pressure: 5 }, addFlags: ['tech-ai-architect'] } },
                    { id: 'management', label: '转向技术管理', result: { skills: { management: 7, expression: 3 }, stats: { pressure: 3 }, addFlags: ['tech-manager'] } },
                ]),
                pathEvent('product', 'growth', '用户增长实验', '产品团队需要在补贴拉新与改善留存之间分配预算，你能看到平台业务的真实数据。', 2015, 2028, [
                    { id: 'retention', label: '改善留存与付费', result: { skills: { management: 5, business: 5, information: 4 }, stats: { pressure: 4 }, addFlags: ['product-retention-data'] } },
                    { id: 'subsidy', label: '短期补贴拉新', result: { stats: { funds: 4, pressure: 7 }, skills: { business: 3 }, addFlags: ['product-subsidy-growth'] } },
                ]),
                pathEvent('product', 'platform', '平台规则重构', '市场成熟后，平台需要兼顾商户、用户与监管，单纯追求增长已经不够。', 2029, 2052, [
                    { id: 'ecosystem', label: '建立长期生态规则', result: { skills: { management: 7, information: 5 }, stats: { pressure: 4 }, addFlags: ['product-ecosystem'] } },
                    { id: 'revenue', label: '优先提高变现效率', result: { skills: { business: 6 }, stats: { funds: 8, pressure: 6, happiness: -2 } } },
                ]),
                pathEvent('sales', 'key-account', '关键客户订单', '一笔大订单需要长期维护、议价和回款管理，收入上限高但波动明显。', 2015, 2028, [
                    { id: 'pursue', label: '投入三个月争取订单', result: { skills: { business: 7, expression: 4, information: 2 }, stats: { funds: 9, pressure: 8 }, addFlags: ['sales-key-account'] } },
                    { id: 'portfolio', label: '分散维护中小客户', result: { skills: { business: 4, management: 2 }, stats: { funds: 4, pressure: 3 } } },
                ]),
                pathEvent('sales', 'supply-chain', '跨区域供应链调整', '客户开始重组供应链。你比其他职业更早看到订单、库存和外贸需求变化。', 2029, 2052, [
                    { id: 'new-market', label: '开发新区域市场', result: { skills: { business: 6, information: 6, expression: 3 }, stats: { pressure: 6 }, addFlags: ['sales-supply-signal'] } },
                    { id: 'existing', label: '保住现有客户', result: { stats: { funds: 6, pressure: 2 }, skills: { management: 3 } } },
                ]),
                pathEvent('education', 'curriculum', '课程与教学改革', '新的课程体系需要一线教师试点，你可以积累研究成果或专注稳定教学。', 2015, 2028, [
                    { id: 'research', label: '参与课程研究', result: { skills: { learning: 7, expression: 4, information: 3 }, stats: { knowledge: 6, pressure: 5 }, addFlags: ['education-research'] } },
                    { id: 'classroom', label: '深耕课堂教学', result: { skills: { learning: 4, expression: 5 }, stats: { happiness: 3, pressure: 2 } } },
                ]),
                pathEvent('education', 'lifelong', '终身学习项目', '人口与职业结构变化带来成人再教育需求，你能从学习路径而非市场热词判断方向。', 2029, 2055, [
                    { id: 'build', label: '建设职业再教育课程', result: { skills: { learning: 6, management: 5, information: 4 }, stats: { knowledge: 5, pressure: 4 }, addFlags: ['education-lifelong-platform'] } },
                    { id: 'mentor', label: '专注个体指导', result: { stats: { happiness: 5 }, skills: { expression: 4 }, addFlags: ['mentor-legacy'] } },
                ]),
                pathEvent('media', 'channel', '内容渠道迁移', '用户注意力从图文转向短内容和直播，创作方式与商业模式同时变化。', 2015, 2028, [
                    { id: 'adapt', label: '建立新内容栏目', result: { skills: { expression: 8, information: 5, business: 2 }, stats: { pressure: 6 }, addFlags: ['media-new-channel'] } },
                    { id: 'depth', label: '坚持深度内容', result: { skills: { expression: 5, learning: 3 }, stats: { funds: -2, happiness: 3 }, addFlags: ['media-depth'] } },
                ]),
                pathEvent('media', 'synthetic', '合成内容冲击', '自动生成内容大量出现，可信度、人格化表达和版权变得比产量更重要。', 2029, 2052, [
                    { id: 'brand', label: '建立可信个人品牌', result: { skills: { expression: 7, information: 6, business: 3 }, stats: { pressure: 4 }, addFlags: ['media-trusted-brand'] } },
                    { id: 'automation', label: '采用自动化生产', result: { skills: { technology: 4, management: 4 }, stats: { funds: 5, happiness: -2 } } },
                ]),
                pathEvent('public-service', 'policy', '公共项目试点', '一项社区公共服务试点需要协调预算、居民需求与执行部门。', 2015, 2028, [
                    { id: 'field', label: '深入社区推动试点', result: { skills: { management: 6, information: 4, expression: 3 }, stats: { pressure: 5, familyBond: 2 }, addFlags: ['public-service-pilot'] } },
                    { id: 'procedure', label: '完善流程与合规', result: { skills: { management: 4, learning: 3 }, stats: { pressure: 2 } } },
                ]),
                pathEvent('public-service', 'resilience', '城市韧性规划', '人口老龄化和极端天气改变了公共投入重点，你能较早接触公开规划信息。', 2029, 2055, [
                    { id: 'planning', label: '参与长期规划', result: { skills: { information: 7, management: 6, learning: 2 }, stats: { pressure: 4 }, addFlags: ['public-resilience-plan'] } },
                    { id: 'operations', label: '保障日常服务', result: { skills: { management: 4 }, stats: { happiness: 3, pressure: 1 } } },
                ]),
            ]);
        }
    };
});












































System.register("chunks:///_virtual/CareerSystem.ts",[], function (exports_1, context_1) {
    "use strict";
    var LEVELS, MIN_PROMOTION_TENURE, GUARANTEED_PROMOTION_TENURE, ENTRY_REQUIREMENTS, CareerSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            LEVELS = ['junior', 'middle', 'senior', 'core'];
            MIN_PROMOTION_TENURE = 2;
            GUARANTEED_PROMOTION_TENURE = 4;
            ENTRY_REQUIREMENTS = {
                technology: [
                    { label: '技术', required: (state) => state.education.major === 'engineering' ? 14 : 20, read: (state) => state.skills.technology },
                    { label: '知识', required: () => 32, read: (state) => state.stats.knowledge },
                ],
                product: [
                    { label: '管理', required: () => 13, read: (state) => state.skills.management },
                    { label: '商业', required: () => 14, read: (state) => state.skills.business },
                ],
                sales: [
                    { label: '商业', required: () => 16, read: (state) => state.skills.business },
                    { label: '表达', required: () => 14, read: (state) => state.skills.expression },
                ],
                education: [
                    { label: '学习', required: () => 22, read: (state) => state.skills.learning },
                    { label: '知识', required: () => 40, read: (state) => state.stats.knowledge },
                ],
                media: [
                    { label: '表达', required: () => 18, read: (state) => state.skills.expression },
                    { label: '信息', required: () => 17, read: (state) => state.skills.information },
                ],
                'public-service': [
                    { label: '管理', required: () => 16, read: (state) => state.skills.management },
                    { label: '学习', required: () => 14, read: (state) => state.skills.learning },
                ],
            };
            CareerSystem = class CareerSystem {
                entryStatus(state, track) {
                    if (track === 'unemployed')
                        return { eligible: false, summary: '未选择具体岗位', unmet: ['岗位类型无效'] };
                    const metrics = ENTRY_REQUIREMENTS[track].map((metric) => (Object.assign(Object.assign({}, metric), { required: metric.required(state), current: Math.round(metric.read(state)) })));
                    const unmet = metrics.filter((metric) => metric.current < metric.required).map((metric) => `${metric.label}还差${metric.required - metric.current}`);
                    return {
                        eligible: unmet.length === 0,
                        summary: metrics.map((metric) => `${metric.label}${metric.current}/${metric.required}`).join(' · '),
                        unmet,
                    };
                }
                nextLevel(current) {
                    const index = LEVELS.indexOf(current);
                    return index >= 0 && index < LEVELS.length - 1 ? LEVELS[index + 1] : undefined;
                }
                requirement(state) {
                    if (state.career.track === 'unemployed')
                        return undefined;
                    const next = this.nextLevel(state.career.level);
                    return { next, years: state.career.yearsAtLevel, requiredYears: next ? MIN_PROMOTION_TENURE : 0, guaranteed: !!next && state.career.yearsAtLevel >= GUARANTEED_PROMOTION_TENURE };
                }
                evaluateAnnual(state) {
                    if (state.career.track === 'unemployed')
                        return undefined;
                    state.career.yearsAtLevel += 1;
                }
                canOfferPromotion(state) {
                    const check = this.requirement(state);
                    return !!(check === null || check === void 0 ? void 0 : check.next) && check.years >= MIN_PROMOTION_TENURE;
                }
                promote(state) {
                    const check = this.requirement(state);
                    if (!(check === null || check === void 0 ? void 0 : check.next) || check.years < MIN_PROMOTION_TENURE)
                        throw new Error('当前尚未获得晋升机会。');
                    state.career.level = check.next;
                    state.career.yearsAtLevel = 0;
                    state.career.lastPromotionYear = state.year;
                    state.career.salaryMultiplier = Math.round(state.career.salaryMultiplier * 1.15 * 10000) / 10000;
                    const flag = `promoted-${check.next}`;
                    if (!state.flags.includes(flag))
                        state.flags.push(flag);
                    return check.next;
                }
            };
            exports_1("CareerSystem", CareerSystem);
        }
    };
});












































System.register("chunks:///_virtual/CitySystem.ts",["./GrowthSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var GrowthSystem_1, LIVING_COST, MOVE_BASE, CitySystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (GrowthSystem_1_1) {
                GrowthSystem_1 = GrowthSystem_1_1;
            }
        ],
        execute: function () {
            LIVING_COST = { rural: 1.8, county: 2.8, city: 4.5, metropolis: 7.2 };
            MOVE_BASE = {
                rural: { transport: .3, deposit: .2, transition: .5 },
                county: { transport: .5, deposit: .5, transition: 1 },
                city: { transport: .8, deposit: 1, transition: 2 },
                metropolis: { transport: 1.2, deposit: 1.8, transition: 4 },
            };
            CitySystem = class CitySystem {
                livingCost(city, year = 2026, age = 30) {
                    const yearFactor = year <= 2026 ? Math.pow(.985, 2026 - year) : Math.pow(1.012, year - 2026);
                    const healthAndCare = age >= 65 ? 2.5 : age >= 50 ? .8 : 0;
                    return Math.round((LIVING_COST[city] * yearFactor + healthAndCare) * 10) / 10;
                }
                preview(state, target) {
                    const base = MOVE_BASE[target];
                    const rank = { rural: 0, county: 1, city: 2, metropolis: 3 };
                    const distancePremium = Math.abs(rank[target] - rank[state.education.city]) * .25;
                    const transport = Math.round((base.transport + distancePremium) * 10) / 10;
                    const total = Math.round((transport + base.deposit + base.transition) * 10) / 10;
                    return { target, transport, deposit: base.deposit, transition: base.transition, total, annualBefore: this.livingCost(state.education.city, state.year, state.age), annualAfter: this.livingCost(target, state.year, state.age) };
                }
                migrate(state, target) {
                    if (state.education.city === target)
                        throw new Error('你已经在这类城市生活。');
                    const preview = this.preview(state, target);
                    if (state.stats.funds < preview.total)
                        throw new Error(`迁居共需 ¥${(preview.total * 10000).toLocaleString('zh-CN')} 流动资金。`);
                    state.stats.funds -= preview.total;
                    state.education.city = target;
                    state.stats.pressure = Math.min(100, state.stats.pressure + (target === 'metropolis' ? 5 : 2));
                    state.skills.information = GrowthSystem_1.growValue(state.skills.information, target === 'metropolis' ? 8 : target === 'city' ? 4 : 0);
                    if (target === 'metropolis' && !state.flags.includes('metropolis-move'))
                        state.flags.push('metropolis-move');
                }
            };
            exports_1("CitySystem", CitySystem);
        }
    };
});












































System.register("chunks:///_virtual/ConditionEvaluator.ts",["./WealthSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var WealthSystem_1, ConditionEvaluator;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (WealthSystem_1_1) {
                WealthSystem_1 = WealthSystem_1_1;
            }
        ],
        execute: function () {
            ConditionEvaluator = class ConditionEvaluator {
                matchesAll(state, conditions = []) {
                    return conditions.every((condition) => this.matches(state, condition));
                }
                matches(state, condition) {
                    if (condition.startsWith('flags.'))
                        return state.flags.includes(condition.slice(6));
                    const match = condition.match(/^(attributes|skills|stats|career|startup|assets|opportunities)\.([a-zA-Z]+)\s*(>=|<=|==|>|<)\s*(-?\d+|[a-z-]+)$/);
                    if (!match)
                        return false;
                    const [, group, key, operator, rawTarget] = match;
                    const value = group === 'assets' && key === 'total' ? WealthSystem_1.totalAssetValue(state)
                        : group === 'opportunities' && key === 'entered' ? state.opportunities.filter((item) => item.entered).length
                            : state[group][key];
                    const target = Number.isNaN(Number(rawTarget)) ? rawTarget : Number(rawTarget);
                    const comparableValue = value;
                    switch (operator) {
                        case '>=': return Number(comparableValue) >= Number(target);
                        case '<=': return Number(comparableValue) <= Number(target);
                        case '==': return comparableValue === target;
                        case '>': return Number(comparableValue) > Number(target);
                        case '<': return Number(comparableValue) < Number(target);
                        default: return false;
                    }
                }
            };
            exports_1("ConditionEvaluator", ConditionEvaluator);
        }
    };
});












































System.register("chunks:///_virtual/DelayedEventQueue.ts",[], function (exports_1, context_1) {
    "use strict";
    var DelayedEventQueue;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DelayedEventQueue = class DelayedEventQueue {
                schedule(state, eventId, dueYear) {
                    if (!state.delayedEvents.some((item) => item.eventId === eventId))
                        state.delayedEvents.push({ eventId, dueYear });
                }
                takeDue(state) {
                    const index = state.delayedEvents.findIndex((item) => item.dueYear <= state.year);
                    return index >= 0 ? state.delayedEvents.splice(index, 1)[0] : undefined;
                }
            };
            exports_1("DelayedEventQueue", DelayedEventQueue);
        }
    };
});












































System.register("chunks:///_virtual/DeviceLayout.ts",[], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function calculateDeviceLayout(width, height, mobile, top = 0, bottom = 0) {
        width = Math.max(1, width);
        height = Math.max(1, height);
        const desktop = !mobile && width >= 900 && width > height;
        const formFactor = desktop ? 'desktop' : Math.min(width, height) >= 600 ? 'tablet' : 'phone';
        const designWidth = formFactor === 'desktop' ? 1280 : formFactor === 'tablet' ? 960 : 720;
        const designHeight = formFactor === 'desktop' ? Math.max(720, Math.round(designWidth * height / width)) : Math.max(formFactor === 'tablet' ? 900 : 960, Math.round(designWidth * height / width));
        return { width, height, portrait: formFactor !== 'desktop', formFactor, designWidth, designHeight,
            safeTop: Math.max(formFactor === 'desktop' ? 16 : 24, top * designWidth / width), safeBottom: Math.max(formFactor === 'desktop' ? 16 : 20, bottom * designWidth / width) };
    }
    exports_1("calculateDeviceLayout", calculateDeviceLayout);
    function readDeviceLayout(mobile) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        const host = globalThis;
        const mini = (_a = host.tt) !== null && _a !== void 0 ? _a : host.wx;
        const info = (_b = mini === null || mini === void 0 ? void 0 : mini.getSystemInfoSync) === null || _b === void 0 ? void 0 : _b.call(mini);
        const width = (_d = (_c = info === null || info === void 0 ? void 0 : info.windowWidth) !== null && _c !== void 0 ? _c : host.innerWidth) !== null && _d !== void 0 ? _d : 1280;
        const height = (_f = (_e = info === null || info === void 0 ? void 0 : info.windowHeight) !== null && _e !== void 0 ? _e : host.innerHeight) !== null && _f !== void 0 ? _f : 720;
        let top = (_k = (_h = (_g = info === null || info === void 0 ? void 0 : info.safeArea) === null || _g === void 0 ? void 0 : _g.top) !== null && _h !== void 0 ? _h : (_j = host.__restartLifeInsets) === null || _j === void 0 ? void 0 : _j.top) !== null && _k !== void 0 ? _k : 0;
        let bottom = (info === null || info === void 0 ? void 0 : info.safeArea) ? Math.max(0, ((_l = info.screenHeight) !== null && _l !== void 0 ? _l : height) - info.safeArea.bottom) : (_o = (_m = host.__restartLifeInsets) === null || _m === void 0 ? void 0 : _m.bottom) !== null && _o !== void 0 ? _o : 0;
        try {
            const menu = (_q = (_p = mini === null || mini === void 0 ? void 0 : mini.getMenuButtonBoundingClientRect) === null || _p === void 0 ? void 0 : _p.call(mini)) !== null && _q !== void 0 ? _q : (_r = mini === null || mini === void 0 ? void 0 : mini.getMenuButtonLayout) === null || _r === void 0 ? void 0 : _r.call(mini);
            if (menu)
                top = Math.max(top, (_s = menu.bottom) !== null && _s !== void 0 ? _s : ('top' in menu ? ((_t = menu.top) !== null && _t !== void 0 ? _t : 0) + ((_u = menu.height) !== null && _u !== void 0 ? _u : 0) : 0));
        }
        catch (_v) { }
        return calculateDeviceLayout(width, height, mobile || !!mini, top, bottom);
    }
    exports_1("readDeviceLayout", readDeviceLayout);
    return {
        setters: [],
        execute: function () {
        }
    };
});












































System.register("chunks:///_virtual/EducationEvents.ts",["./EventTemplates.ts"], function (exports_1, context_1) {
    "use strict";
    var EventTemplates_1, EDUCATION_EVENTS, EDUCATION_CONTENT_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EventTemplates_1_1) {
                EventTemplates_1 = EventTemplates_1_1;
            }
        ],
        execute: function () {
            exports_1("EDUCATION_EVENTS", EDUCATION_EVENTS = [
                {
                    id: 'growth-study-routine', title: '第一次制定学习计划', description: '老师建议你把每天的时间分成学习、休息和兴趣三部分。', yearMin: 2001, yearMax: 2004, weight: 75,
                    options: [
                        { id: 'routine', label: '坚持执行学习计划', result: { education: { studyHabit: 12, academicScore: 4 }, skills: { learning: 5 }, attributes: { execution: 2 }, stats: { knowledge: 7, pressure: 6, happiness: -5 }, addFlags: ['study-routine'] } },
                        { id: 'interest', label: '留出更多时间发展兴趣', result: { skills: { expression: 3 }, stats: { knowledge: 1, happiness: 5, pressure: -2 } } },
                    ],
                },
                {
                    id: 'growth-school-transfer', title: '转去更远的学校', description: '家人有机会让你去资源更好的学校，但也意味着离开熟悉的朋友。', yearMin: 2004, yearMax: 2006, weight: 70,
                    options: [
                        { id: 'transfer', label: '去新的学校', result: { education: { city: 'city', academicScore: 6 }, skills: { information: 3 }, stats: { familyResources: -3, knowledge: 4, pressure: 3, happiness: -2 }, addFlags: ['better-school'] } },
                        { id: 'stay', label: '留在现在的学校', result: { stats: { happiness: 4, familyBond: 2, pressure: -1 }, skills: { expression: 2 } } },
                    ],
                },
                {
                    id: 'education-middle-school', title: '初中的新开始', description: '小学毕业后进入初中，课程突然变难，你需要决定如何适应新的学习节奏。', yearMin: 2004, yearMax: 2004, weight: 120, forced: true,
                    options: [
                        { id: 'focus-academic', label: '把重心放在学习上', result: { education: { level: 'middle', studyHabit: 8, academicScore: 8 }, skills: { learning: 6 }, stats: { knowledge: 8, pressure: 4, happiness: -2 }, addFlags: ['middle-school'] } },
                        { id: 'balanced', label: '兼顾学习和活动', result: { education: { level: 'middle', academicScore: 3 }, skills: { expression: 3, management: 2 }, stats: { knowledge: 3, pressure: -1, happiness: 4 }, addFlags: ['middle-school'] } },
                    ],
                },
                {
                    id: 'education-first-competition', title: '一次校外比赛', description: '学校推荐你参加一项比赛，可以是学科、演讲或电脑相关方向。', yearMin: 2006, yearMax: 2009, weight: 70,
                    prerequisites: ['flags.middle-school'],
                    options: [
                        { id: 'science', label: '报名学科与科技比赛', result: { skills: { learning: 4, technology: 4 }, education: { academicScore: 4 }, stats: { knowledge: 5, pressure: 4, happiness: -2 }, addFlags: ['science-competition'] } },
                        { id: 'speech', label: '报名演讲与社团比赛', result: { skills: { expression: 5 }, stats: { knowledge: 2, happiness: 3, pressure: -1 }, addFlags: ['speech-competition'] } },
                    ],
                },
                {
                    id: 'education-subject-direction', title: '中考与高中录取', description: '中考评估以平时成绩为主，也会计算学习技能、习惯、知识与多年持续投入。', yearMin: 2008, yearMax: 2010, weight: 100, forced: true,
                    options: [
                        { id: 'exam-result', label: '查看中考录取结果', result: { addFlags: ['middle-school', 'high-school-placement'] } },
                    ],
                },
                {
                    id: 'education-part-time-work', title: '第一次兼职', description: '假期里，你可以尝试做一份短期工作，或者继续补足学习短板。', yearMin: 2009, yearMax: 2011, weight: 65,
                    options: [
                        { id: 'work', label: '做一份兼职', result: { stats: { funds: 0.3 }, skills: { business: 3, expression: 2 }, attributes: { execution: 2 }, addFlags: ['part-time-experience'] } },
                        { id: 'study', label: '集中准备升学', result: { education: { academicScore: 7, studyHabit: 3 }, skills: { learning: 4 }, stats: { knowledge: 7, pressure: 6, happiness: -4 } } },
                    ],
                },
                {
                    id: 'education-entrance-exam', title: '高考与大学录取', description: '大学录取将依据你的升学评估决定。', yearMin: 2010, yearMax: 2012, weight: 110, forced: true,
                    prerequisites: ['flags.middle-school'],
                    options: [
                        { id: 'admission-result', label: '查看大学录取结果', result: { stats: { pressure: 3 }, addFlags: ['college-admission'] } },
                    ],
                },
                {
                    id: 'education-major', title: '专业与方向', description: '专业会影响你的第一份工作，也会改变你看到的机会。', yearMin: 2011, yearMax: 2013, weight: 100, forced: true,
                    prerequisites: ['flags.university-entry'],
                    options: [
                        { id: 'engineering', label: '计算机与工程', result: { education: { major: 'engineering' }, skills: { technology: 8 }, addFlags: ['major-engineering'] } },
                        { id: 'business', label: '商业与经济', result: { education: { major: 'business' }, skills: { business: 7, information: 2 }, addFlags: ['major-business'] } },
                        { id: 'media', label: '人文与传媒', result: { education: { major: 'media' }, skills: { expression: 7, information: 2 }, addFlags: ['major-media'] } },
                    ],
                },
                {
                    id: 'education-city-choice', title: '离开还是留下', description: '更大的城市有更多机会，也意味着更高成本和更陌生的生活。', yearMin: 2011, yearMax: 2014, weight: 70,
                    options: [
                        { id: 'metropolis', label: '去大城市发展', result: { education: { city: 'metropolis' }, skills: { information: 4 }, stats: { pressure: 4, familyResources: -3 }, addFlags: ['metropolis-move'] } },
                        { id: 'local', label: '留在熟悉的城市', result: { education: { city: 'city' }, stats: { familyBond: 4, happiness: 2 }, addFlags: ['local-development'] } },
                    ],
                },
                {
                    id: 'education-internship', title: '第一段实习', description: '一份实习机会出现，你可以优先考虑能力积累或稳定收入。', yearMin: 2012, yearMax: 2014, weight: 90,
                    options: [
                        { id: 'skill', label: '进入成长更快的团队', result: { skills: { technology: 4, management: 3 }, stats: { pressure: 4 }, addFlags: ['growth-internship'] } },
                        { id: 'income', label: '选择收入更稳定的岗位', result: { stats: { funds: 12 }, skills: { business: 3 }, addFlags: ['stable-internship'] } },
                    ],
                },
            ]);
            exports_1("EDUCATION_CONTENT_EVENTS", EDUCATION_CONTENT_EVENTS = EventTemplates_1.buildTemplateEvents('education', [
                ...EventTemplates_1.seedSeries('exam', 2007, 5, 3), ...EventTemplates_1.seedSeries('campus', 2008, 8, 5), ...EventTemplates_1.seedSeries('exam', 2009, 6, 4),
                ...EventTemplates_1.seedSeries('campus', 2010, 6, 4), ...EventTemplates_1.seedSeries('social', 2010, 3, 4), ...EventTemplates_1.seedSeries('skill', 2010, 8, 4),
                ...EventTemplates_1.seedSeries('intern', 2011, 4, 3),
            ]));
        }
    };
});












































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
            UNIVERSITY_THRESHOLDS = { undergraduate: 42, 'first-tier': 55, '211': 65, '985': 75 };
            EducationProgressionSystem = class EducationProgressionSystem {
                constructor() {
                    this.rules = new EducationSystem_1.EducationSystem();
                }
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
                    const level = score >= UNIVERSITY_THRESHOLDS['985'] ? '985'
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
                    return `升学评估 ${score} 分 · 预计录取：${result}\n分数线：普高 ${HIGH_SCHOOL_THRESHOLDS.general} / 重点高中 ${HIGH_SCHOOL_THRESHOLDS.key}`;
                }
                universityPreview(state) {
                    const score = this.universityScore(state);
                    const result = score >= UNIVERSITY_THRESHOLDS['985'] ? '985'
                        : score >= UNIVERSITY_THRESHOLDS['211'] ? '211'
                            : score >= UNIVERSITY_THRESHOLDS['first-tier'] ? '一本'
                                : score >= UNIVERSITY_THRESHOLDS.undergraduate ? '本科'
                                    : '专科';
                    return `升学评估 ${score} 分 · 预计录取：${result}\n分数线：本科 42 / 一本 55 / 211 65 / 985 75。大学录取只看升学评估。`;
                }
                highSchoolScore(state) {
                    return this.clampScore(this.baseAcademicScore(state));
                }
                universityScore(state) {
                    return this.clampScore(this.baseAcademicScore(state));
                }
                baseAcademicScore(state) {
                    return this.rules.admissionScore(state.attributes, state.skills, state.education, state.stats.knowledge);
                }
                clampScore(value) {
                    return Math.max(0, Math.min(100, Math.round(value)));
                }
                annualSalary(state) {
                    var _a;
                    if (state.career.track === 'unemployed')
                        return 0;
                    const base = {
                        primary: 3.6, middle: 4.2, vocational: 5.3, high: 4.7, college: 6,
                        undergraduate: 7, 'first-tier': 7.9, '211': 9, '985': 10.5, graduate: 11,
                    };
                    const trackMultiplier = state.career.track === 'technology' ? 1.1
                        : state.career.track === 'media' ? .88
                            : state.career.track === 'sales' ? .95
                                : state.career.track === 'education' ? .9 : 1;
                    return Math.round(base[state.education.level] * trackMultiplier * ((_a = state.career.salaryMultiplier) !== null && _a !== void 0 ? _a : 1) * 10) / 10;
                }
                applyGraduateSchool(state) {
                    if (state.flags.includes('graduate-school') || state.education.level === 'graduate')
                        throw new Error('研究生进修只能完成一次。');
                    if (state.age < 22)
                        throw new Error(`本科毕业阶段后才能考研，当前还需等待 ${22 - state.age} 年。`);
                    if (!['undergraduate', 'first-tier', '211', '985'].includes(state.education.level))
                        throw new Error('需要先完成本科阶段，才能申请研究生。');
                    if (state.stats.knowledge < 60 || state.skills.learning < 45)
                        throw new Error('考研需要满足学习与知识门槛。');
                    if (state.stats.funds < 8)
                        throw new Error('考研准备与学费至少需要 ¥80,000。');
                    state.stats.funds -= 8;
                    state.career.salaryMultiplier = Math.round(state.career.salaryMultiplier * 1.05 * 10000) / 10000;
                    this.addFlag(state, 'graduate-school');
                }
                applyCertificate(state, skill) {
                    if (state.age < 16)
                        throw new Error(`16岁后才能参加职业考证，当前还需等待 ${16 - state.age} 年。`);
                    const certificateCount = state.flags.filter((flag) => flag.startsWith('certificate-')).length;
                    if (certificateCount >= 2)
                        throw new Error('职业考证最多可完成两次。');
                    if (state.stats.knowledge < 35 || state.skills[skill] < 30)
                        throw new Error('职业考证需要满足职业与知识门槛。');
                    if (state.stats.funds < 1.5)
                        throw new Error('考证报名与培训需要 ¥15,000。');
                    state.stats.funds -= 1.5;
                    state.career.salaryMultiplier = Math.round(state.career.salaryMultiplier * 1.05 * 10000) / 10000;
                    this.addFlag(state, `certificate-${certificateCount + 1}-${skill}`);
                }
                addFlag(state, flag) { if (!state.flags.includes(flag))
                    state.flags.push(flag); }
            };
            exports_1("EducationProgressionSystem", EducationProgressionSystem);
        }
    };
});












































System.register("chunks:///_virtual/EducationSystem.ts",[], function (exports_1, context_1) {
    "use strict";
    var LEVEL_RANK, EducationSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            LEVEL_RANK = { primary: 1, middle: 2, high: 3, vocational: 3, college: 4, undergraduate: 5, 'first-tier': 6, '211': 7, '985': 8, graduate: 9 };
            EducationSystem = class EducationSystem {
                admissionScore(_attributes, skills, education, knowledge = 0) {
                    void _attributes;
                    void skills;
                    void knowledge;
                    return education.admissionScore;
                }
                canAdvance(education, target) {
                    return LEVEL_RANK[target] >= LEVEL_RANK[education.level];
                }
            };
            exports_1("EducationSystem", EducationSystem);
        }
    };
});












































System.register("chunks:///_virtual/EndingConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var item, ENDINGS, ENDING_DESCRIPTIONS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            item = (id, title, priority, conditions, rarity = 'common', scoreBonus = 0) => ({ id, title, description: `你的人生最终呈现为「${title}」。每一次取舍都留下了无法替代的痕迹。`, priority, conditions, scoreBonus, rarity, shareText: `这一局，我成为了${title}。` });
            exports_1("ENDINGS", ENDINGS = [
                item('ending-happiness-collapse', '被耗尽的心', 110, ['flags.happiness-collapse'], 'common', -18),
                item('ending-cashflow-collapse', '现金流断裂', 99, ['flags.cashflow-collapse'], 'common', -15),
                item('ending-time-traveler', '时间旅行者', 100, ['skills.information>=90', 'opportunities.entered>=5'], 'legendary', 18), item('ending-investment-master', '投资大师', 95, ['assets.total>=200', 'skills.information>=70'], 'rare', 16), item('ending-startup-legend', '创业传奇', 90, ['startup.stage==expansion', 'assets.total>=300'], 'rare', 16), item('ending-health-collapse', '被透支的身体', 105, ['stats.health<=20'], 'common', -12), item('ending-career-peak', '行业里的重要角色', 75, ['career.level==core'], 'common', 10), item('ending-financial-freedom', '财务自由', 70, ['assets.total>=200', 'stats.health>=50'], 'common', 10), item('ending-family-anchor', '珍贵的陪伴', 81, ['flags.family-time', 'stats.happiness>=75'], 'common', 8), item('ending-tech-pioneer', '技术先锋', 60, ['skills.technology>=70'], 'common', 8), item('ending-content-creator', '内容创作者', 55, ['skills.expression>=60', 'flags.content-entry'], 'common', 6), item('ending-cashflow-master', '稳健的积累者', 45, ['assets.total>=120'], 'common', 5), item('ending-healthy-longlife', '从容的长跑者', 80, ['stats.health>=80', 'stats.happiness>=65']), item('ending-lifelong-learner', '终身学习者', 82, ['stats.knowledge>=85']), item('ending-city-builder', '城市新居民', 41, ['flags.metropolis-move', 'skills.information>=55']), item('ending-family-business', '家业的新篇', 40, ['flags.family-business-experience', 'skills.business>=60']), item('ending-resilient', '愈挫愈勇', 39, ['flags.venture-loss', 'stats.happiness>=55']), item('ending-opportunity-hunter', '时代的捕手', 38, ['opportunities.entered>=3']), item('ending-second-act', '人生下半场', 79, ['flags.retirement-active', 'skills.management>=60'], 'rare'), item('ending-community-mentor', '照亮后来者的人', 83, ['flags.mentor-legacy']), item('ending-balanced-life', '平衡的生活家', 35, ['stats.health>=60', 'stats.happiness>=60']), item('ending-regret', '遗憾的人生', 25, ['stats.happiness<30', 'stats.health<40']), item('ending-drifter', '随波逐流', 20, ['opportunities.entered==0', 'skills.information<25']), item('ending-ordinary-brave', '认真生活的人', 0, []),
            ]);
            ENDING_DESCRIPTIONS = {
                'ending-career-peak': '你在工作中走到了核心位置。能力与年月的积累，让你成为行业里不可忽视的人。工作之外的生活，也值得被记住。',
                'ending-healthy-longlife': '你保有了健康，也保有对日子的热情。漫长的一生里，照顾自己同样是一种成就。',
                'ending-lifelong-learner': '你始终没有放下学习。知识一点点积累，变成理解世界、重新选择的底气。',
                'ending-family-anchor': '你曾主动为重要的人留下时间，也在这些相聚中保有快乐。陪伴成为这一生珍贵的部分。',
                'ending-community-mentor': '你选择将经验留给后来的人。你的故事，也因此在别人的成长中继续。',
                'ending-health-collapse': '身体承受了太多消耗。那些得到的东西真实存在，而没有留给自己的休息，也成为这一生的代价。',
                'ending-cashflow-collapse': '手头的现金最终无法覆盖生活的开支。下一次，也许可以更早为自己留一份安全垫。',
            };
            for (const ending of ENDINGS)
                if (ENDING_DESCRIPTIONS[ending.id])
                    ending.description = ENDING_DESCRIPTIONS[ending.id];
        }
    };
});












































System.register("chunks:///_virtual/EndingResolver.ts",["./EndingConfig.ts", "./ConditionEvaluator.ts", "./WealthSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var EndingConfig_1, ConditionEvaluator_1, WealthSystem_1, EndingResolver;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EndingConfig_1_1) {
                EndingConfig_1 = EndingConfig_1_1;
            },
            function (ConditionEvaluator_1_1) {
                ConditionEvaluator_1 = ConditionEvaluator_1_1;
            },
            function (WealthSystem_1_1) {
                WealthSystem_1 = WealthSystem_1_1;
            }
        ],
        execute: function () {
            EndingResolver = class EndingResolver {
                constructor() {
                    this.conditions = new ConditionEvaluator_1.ConditionEvaluator();
                }
                resolve(state) {
                    var _a;
                    const ending = (_a = [...EndingConfig_1.ENDINGS].sort((a, b) => b.priority - a.priority).find((item) => this.conditions.matchesAll(state, item.conditions))) !== null && _a !== void 0 ? _a : EndingConfig_1.ENDINGS[EndingConfig_1.ENDINGS.length - 1];
                    const assets = WealthSystem_1.totalAssetValue(state);
                    const career = state.career.level === 'core' ? 90 : state.career.level === 'senior' ? 75 : state.career.level === 'middle' ? 60 : 40;
                    const score = Math.max(0, Math.min(100, Math.round(Math.min(100, assets) * .12 + career * .12 + state.stats.health * .15 + state.stats.happiness * .18 +
                        state.skills.information * .12 +
                        Math.min(20, state.opportunities.filter((item) => item.entered).length * 3) + Math.min(10, state.stats.knowledge * .1) + ending.scoreBonus)));
                    return { id: ending.id, title: ending.title, description: ending.description, score, rarity: ending.rarity, shareText: ending.shareText };
                }
            };
            exports_1("EndingResolver", EndingResolver);
        }
    };
});












































System.register("chunks:///_virtual/EventMatcher.ts",["./ConditionEvaluator.ts"], function (exports_1, context_1) {
    "use strict";
    var ConditionEvaluator_1, EventMatcher;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ConditionEvaluator_1_1) {
                ConditionEvaluator_1 = ConditionEvaluator_1_1;
            }
        ],
        execute: function () {
            EventMatcher = class EventMatcher {
                constructor(conditions = new ConditionEvaluator_1.ConditionEvaluator()) {
                    this.conditions = conditions;
                }
                pick(state, events, random) {
                    const candidates = events.filter((event) => this.isEligible(state, event));
                    if (candidates.length === 0)
                        return undefined;
                    const forced = candidates.find((event) => event.forced);
                    if (forced)
                        return forced;
                    const totalWeight = candidates.reduce((sum, event) => sum + event.weight, 0);
                    let cursor = random.next() * totalWeight;
                    for (const event of candidates) {
                        cursor -= event.weight;
                        if (cursor <= 0)
                            return event;
                    }
                    return candidates[candidates.length - 1];
                }
                isEligible(state, event) {
                    var _a;
                    if (event.repeatable) {
                        const previous = [...state.lifeLog].reverse().find(entry => entry.eventId === event.id);
                        if (previous && state.year - previous.year < ((_a = event.cooldownYears) !== null && _a !== void 0 ? _a : 3))
                            return false;
                    }
                    return (event.repeatable || !state.triggeredEventIds.includes(event.id))
                        && state.year >= event.yearMin
                        && state.year <= event.yearMax
                        && this.conditions.matchesAll(state, event.prerequisites);
                }
            };
            exports_1("EventMatcher", EventMatcher);
        }
    };
});












































System.register("chunks:///_virtual/EventTemplates.ts",[], function (exports_1, context_1) {
    "use strict";
    var THEME_COPY;
    var __moduleName = context_1 && context_1.id;
    function seedSeries(theme, yearStart, count, span, prerequisites, repeatable = false) {
        const [title, description] = THEME_COPY[theme];
        return Array.from({ length: count }, (_, index) => ({ theme, year: yearStart + (index % span), title: `${title} · ${index + 1}`, description, prerequisites, weight: 50 + (index % 6) * 10, repeatable }));
    }
    exports_1("seedSeries", seedSeries);
    function buildTemplateEvents(stage, seeds) {
        const serials = new Map();
        return seeds.map((seed) => {
            var _a, _b;
            const serial = ((_a = serials.get(`${seed.theme}-${seed.year}`)) !== null && _a !== void 0 ? _a : 0) + 1;
            serials.set(`${seed.theme}-${seed.year}`, serial);
            const [focus, balance] = effects(seed.theme);
            return {
                id: `${stage}-${seed.theme}-${seed.year}-${String(serial).padStart(2, '0')}`,
                title: seed.title,
                description: seed.description,
                yearMin: seed.year,
                yearMax: seed.year + 1,
                weight: (_b = seed.weight) !== null && _b !== void 0 ? _b : 70,
                prerequisites: seed.prerequisites,
                repeatable: seed.repeatable,
                options: [
                    { id: 'focus', label: focus.label, result: focus.result },
                    { id: 'balance', label: balance.label, result: balance.result },
                ],
            };
        });
    }
    exports_1("buildTemplateEvents", buildTemplateEvents);
    function effects(theme) {
        const map = {
            computer: [{ label: '投入时间研究', result: { skills: { technology: 4, information: 3 }, stats: { knowledge: 4, pressure: 3, happiness: -2 }, addFlags: ['computer-intro'] } }, { label: '把时间留给朋友', result: { stats: { happiness: 4, pressure: -2 }, addFlags: ['social-circle'] } }],
            reading: [{ label: '坚持深度学习', result: { skills: { learning: 4 }, education: { academicScore: 3, studyHabit: 2 }, stats: { knowledge: 5, pressure: 3, happiness: -2 }, addFlags: ['reading-habit'] } }, { label: '按自己的节奏来', result: { stats: { happiness: 4, pressure: -2 } } }],
            family: [{ label: '承担家庭责任', result: { skills: { business: 3, expression: 2 }, stats: { familyBond: 4, pressure: 3, happiness: -1 }, addFlags: ['family-business-experience'] } }, { label: '守住自己的安排', result: { skills: { learning: 3 }, stats: { knowledge: 3, pressure: 2, happiness: -1 } } }],
            social: [{ label: '和朋友共度时间', result: { stats: { happiness: 3, pressure: -1 }, skills: { expression: 2 }, addFlags: ['social-circle'] } }, { label: '优先独处成长', result: { skills: { learning: 3, information: 2 }, stats: { knowledge: 3, pressure: 2, happiness: -1 } } }],
            hobby: [{ label: '系统训练特长', result: { skills: { expression: 4 }, attributes: { execution: 2 }, stats: { happiness: 2, pressure: 3 }, addFlags: ['childhood-specialty'] } }, { label: '保持轻松爱好', result: { stats: { happiness: 4, pressure: -2 } } }],
            era: [{ label: '记录时代变化', result: { skills: { information: 4 }, stats: { knowledge: 2, pressure: 2 }, addFlags: ['era-observer'] } }, { label: '不被消息打扰', result: { stats: { happiness: 3, pressure: -2 } } }],
            health: [{ label: '建立运动习惯', result: { stats: { health: 4, pressure: -2, happiness: 1 }, addFlags: ['health-routine'] } }, { label: '把精力放在别处', result: { skills: { learning: 3 }, stats: { knowledge: 3, pressure: 2, health: -1 } } }],
            exam: [{ label: '高强度备考', result: { education: { academicScore: 5, studyHabit: 2 }, skills: { learning: 3 }, stats: { knowledge: 4, pressure: 5, happiness: -3 } } }, { label: '维持稳定节奏', result: { education: { academicScore: 2 }, stats: { health: 2, happiness: 3, pressure: -2 } } }],
            campus: [{ label: '争取更多舞台', result: { skills: { expression: 3, management: 2 }, stats: { pressure: 3, happiness: 1 } } }, { label: '专注课程基础', result: { skills: { learning: 4 }, stats: { knowledge: 4, pressure: 3, happiness: -1 } } }],
            skill: [{ label: '专项强化训练', result: { skills: { technology: 3, information: 2 }, stats: { knowledge: 4, pressure: 3, happiness: -2 }, addFlags: ['skill-builder'] } }, { label: '保留生活空间', result: { stats: { happiness: 4, pressure: -2 } } }],
            intern: [{ label: '选择成长更快的岗位', result: { skills: { technology: 3, management: 2 }, stats: { pressure: 4, happiness: -2 }, addFlags: ['internship-experience'] } }, { label: '选择稳定收入', result: { stats: { funds: 3, pressure: 1 }, skills: { business: 2 } } }],
            career: [{ label: '接受挑战', result: { skills: { management: 3 }, attributes: { execution: 2 }, stats: { funds: 5, pressure: 5, health: -1 } } }, { label: '维持可持续节奏', result: { stats: { health: 2, happiness: 3, pressure: -3 }, skills: { information: 1 } } }],
            startup: [{ label: '投入项目试错', result: { stats: { funds: -10, pressure: 6 }, skills: { business: 4, management: 2 }, addFlags: ['startup-experience'] } }, { label: '继续积累筹码', result: { stats: { funds: 4, pressure: -1 }, skills: { information: 2 } } }],
            investment: [{ label: '研究后小额配置', result: { stats: { funds: -6, pressure: 2 }, skills: { business: 3, information: 3 }, addFlags: ['investment-practice'] } }, { label: '保留流动现金', result: { stats: { funds: 2, happiness: 1, pressure: -1 } } }],
            housing: [{ label: '为长期居住投入', result: { stats: { funds: -12, pressure: 4, happiness: 2 }, assetChanges: [{ type: 'housing', amount: 12 }], addFlags: ['housing-planner'] } }, { label: '保留迁移弹性', result: { stats: { funds: 3, happiness: 2, pressure: -1 } } }],
            care: [{ label: '投入照护时间', result: { stats: { familyBond: 4, happiness: 2, funds: -3, pressure: -1 } } }, { label: '提供资源支持', result: { stats: { familyBond: 2, funds: -6, pressure: 2 } } }],
            reflection: [{ label: '重新调整优先级', result: { stats: { happiness: 3, pressure: -3, health: 2 }, skills: { information: 2 } } }, { label: '继续追逐目标', result: { stats: { funds: 4, pressure: 4, health: -1 }, attributes: { execution: 2 } } }],
            opportunity: [{ label: '提前布局', result: { skills: { information: 4, business: 2 }, stats: { pressure: 3 }, addFlags: ['opportunity-scout'] } }, { label: '暂时观望', result: { stats: { happiness: 2, pressure: -1 }, skills: { information: 1 } } }],
        };
        return map[theme];
    }
    return {
        setters: [],
        execute: function () {
            THEME_COPY = {
                computer: ['电脑前的新问题', '一项新工具来到身边。投入探索会得到能力，也会占用原本轻松的时间。'], reading: ['书页里的岔路', '阅读、练习和玩耍都在争夺你有限的课后时间。'], family: ['家庭小店的周末排班', '家人正在协调周末小店的人手。帮忙会获得零用钱和商业经验，留在学校则能继续学习。'], social: ['同学间的邀请', '关系需要主动维护，但每一次投入都有机会成本。'], hobby: ['兴趣的坚持', '特长训练带来舞台，也意味着更少的自由时间。'], era: ['时代的新消息', '观察变化可能积累信息优势，也可能让你感到焦虑。'], health: ['身体的提醒', '健康习惯不会立刻带来回报，却会改变之后的承受力。'], exam: ['考试前的选择', '冲刺能换来分数，稳定节奏则保留了身心状态。'], campus: ['校园里的机会', '社团和课程都能塑造未来，但无法同时做到最好。'], skill: ['能力补强计划', '专门训练会带来能力，也会增加压力。'], intern: ['实习岗位的取舍', '成长速度与眼前收入之间，需要你做一次选择。'], career: ['职业路径的分岔', '承担更大责任会更快成长，也会让生活变得更紧绷。'], startup: ['创业念头浮现', '项目需要资金与精力，稳定积累同样是一条可走的路。'], investment: ['资产配置的讨论', '投资需要承担波动，保留现金则意味着放弃一部分可能。'], housing: ['居住安排重估', '房子提供确定性，也可能限制你之后的迁移自由。'], care: ['照护与责任', '家人需要你的时间或资源，两种支持都有代价。'], reflection: ['人生阶段复盘', '放慢脚步能找回自己，坚持目标也可能带来新的高度。'], opportunity: ['一条具体的行业线索', '线索会给出行业、窗口期、所需本金与风险；只有在时机合适时投入才可能形成回报。'],
            };
        }
    };
});












































System.register("chunks:///_virtual/ExplorationConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var EXPLORATION_ACTIONS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("EXPLORATION_ACTIONS", EXPLORATION_ACTIONS = [
                { id: 'market', domain: 'market', name: '交易所', description: '查看公开行情、持仓与市场预告，主动进行买卖。', prerequisites: [] },
                { id: 'industry', domain: 'industry', name: '项目投资', description: '买断具体项目，持有经营，并在合适的行业阶段出售。', yearMin: 2010, prerequisites: [] },
                { id: 'city', domain: 'city', name: '城市迁移', description: '未来用于迁居、寻找城市红利与承受生活成本。', prerequisites: ['stats.funds>=10'] },
                { id: 'housing', domain: 'housing', name: '房产市场', description: '查看不同城市房价，购买、持有或出售住房。', prerequisites: ['stats.funds>=25'], permanentUnlock: true },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/FamilyOpportunityEvents.ts",[], function (exports_1, context_1) {
    "use strict";
    var FAMILY_OPPORTUNITY_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("FAMILY_OPPORTUNITY_EVENTS", FAMILY_OPPORTUNITY_EVENTS = [
                {
                    id: 'family-info-rural-network', title: '同乡带来的城市消息',
                    description: '外出务工的亲戚说，沿海工厂、建筑和物流岗位正在增加。工资更高，但迁移、住宿和技能门槛同样真实。',
                    yearMin: 2001, yearMax: 2003, weight: 100, forced: true, informational: true, prerequisites: ['flags.family-rural'],
                    options: [{ id: 'ack', label: '记下这条信息', result: { signalIds: ['signal-city-resource'], skills: { information: 2 }, addFlags: ['family-signal-labor-migration'] } }],
                },
                {
                    id: 'family-info-small-town', title: '县城正在慢慢变化',
                    description: '新学校、连锁门店和生活服务陆续进入县城。机会比大城市少，却更容易从熟人和本地需求中看清。',
                    yearMin: 2002, yearMax: 2004, weight: 100, forced: true, informational: true, prerequisites: ['flags.family-small-town'],
                    options: [{ id: 'ack', label: '记下这条信息', result: { signalIds: ['signal-city-resource'], skills: { information: 2 }, addFlags: ['family-signal-local-service'] } }],
                },
                {
                    id: 'family-info-county-shop', title: '小店账本里的变化',
                    description: '父母发现顾客开始询问外地商品，进货渠道和运输速度正在影响生意。稳定货源可能比门面大小更重要。',
                    yearMin: 2002, yearMax: 2004, weight: 100, forced: true, informational: true, prerequisites: ['flags.family-county-business'],
                    options: [{ id: 'ack', label: '一起看看账本', result: { signalIds: ['signal-ecommerce-orders'], skills: { business: 2, information: 2 }, addFlags: ['family-signal-shop-supply'] } }],
                },
                {
                    id: 'family-info-metro-office', title: '父母单位里的新岗位',
                    description: '办公电脑和企业网站逐渐普及，单位开始需要懂软件、网络和运营的人。城市里的岗位变化比新闻更早来到身边。',
                    yearMin: 2001, yearMax: 2003, weight: 100, forced: true, informational: true, prerequisites: ['flags.family-metro-salaried'],
                    options: [{ id: 'ack', label: '记下岗位变化', result: { signalIds: ['signal-pc-home'], skills: { technology: 2, information: 3 }, addFlags: ['family-signal-corporate-tech'] } }],
                },
                {
                    id: 'family-info-scholar-table', title: '书桌上的产业讨论',
                    description: '父母和朋友谈到计算机、通信和高校专业的变化。技术方向尚未成熟，但相关人才会越来越重要。',
                    yearMin: 2001, yearMax: 2003, weight: 100, forced: true, informational: true, prerequisites: ['flags.family-scholar'],
                    options: [{ id: 'ack', label: '把讨论写进笔记', result: { signalIds: ['signal-pc-home'], skills: { learning: 2, information: 3 }, stats: { knowledge: 2 }, addFlags: ['family-signal-academic-tech'] } }],
                },
                {
                    id: 'family-info-wealthy-supply', title: '饭桌上的供应链消息',
                    description: '父母的客户正在寻找新的销售渠道，也有人准备扩大仓储和运输。你比多数同龄人更早听见了生意变化。',
                    yearMin: 2001, yearMax: 2003, weight: 100, forced: true, informational: true, prerequisites: ['flags.family-wealthy-business'],
                    options: [{ id: 'ack', label: '整理客户与渠道信息', result: { signalIds: ['signal-ecommerce-orders'], skills: { business: 3, information: 3 }, addFlags: ['family-signal-supply-chain'] } }],
                },
                {
                    id: 'family-route-rural-skill', title: '同乡介绍的技能岗位',
                    description: '亲戚可以帮你了解城市里的技术岗位，但家庭只能承担有限的培训和迁移成本。',
                    yearMin: 2006, yearMax: 2009, weight: 120, forced: true, prerequisites: ['flags.family-rural'],
                    options: [
                        { id: 'train', label: '争取技能培训与迁移准备', result: { stats: { familyResources: -3, pressure: 3 }, skills: { technology: 5, information: 3 }, attributes: { execution: 2 }, opportunity: { chainId: 'urban-development', stage: 'growth', entered: true }, addFlags: ['family-route-skilled-migration'] } },
                        { id: 'stay', label: '暂时留在本地完成学业', result: { skills: { learning: 4 }, stats: { familyBond: 3, happiness: 2 }, opportunity: { chainId: 'urban-development', stage: 'growth', entered: false } } },
                    ],
                },
                {
                    id: 'family-route-small-town-choice', title: '本地发展还是准备离开',
                    description: '县城服务业正在增加，重点学校和大城市教育也提供另一条路。家庭可以支持一次明确选择。',
                    yearMin: 2006, yearMax: 2009, weight: 120, forced: true, prerequisites: ['flags.family-small-town'],
                    options: [
                        { id: 'education', label: '把资源投入教育和升学', result: { stats: { familyResources: -3, pressure: 2 }, education: { studyHabit: 5, academicScore: 5 }, skills: { learning: 4 }, addFlags: ['family-route-education-mobility'] } },
                        { id: 'local', label: '了解本地门店与生活服务', result: { skills: { business: 4, expression: 3, information: 2 }, stats: { familyBond: 2 }, opportunity: { chainId: 'urban-development', stage: 'growth', entered: true }, addFlags: ['family-route-local-service'] } },
                    ],
                },
                {
                    id: 'family-route-county-online', title: '给家庭小店增加线上渠道',
                    description: '现有货源可以降低试错成本，但拍摄、客服、包装和配送都需要重新学习。',
                    yearMin: 2006, yearMax: 2009, weight: 120, forced: true, prerequisites: ['flags.family-county-business', 'stats.familyResources>=5'],
                    options: [
                        { id: 'trial', label: '拿出部分家庭资源试卖', result: { stats: { familyResources: -5, pressure: 3 }, skills: { business: 6, management: 3, information: 3 }, opportunity: { chainId: 'ecommerce', stage: 'growth', entered: true }, addFlags: ['family-business-online-trial', 'family-business-experience'] } },
                        { id: 'supply', label: '先整理库存和供应商', result: { skills: { business: 4, management: 3 }, stats: { familyBond: 3 }, opportunity: { chainId: 'ecommerce', stage: 'emergence', entered: false } } },
                    ],
                },
                {
                    id: 'family-route-metro-internship', title: '城市企业的体验岗位',
                    description: '父母的同事可以介绍一次正规的企业体验。它不会直接带来财富，却能让你更早理解技术和产品岗位。',
                    yearMin: 2006, yearMax: 2009, weight: 120, forced: true, prerequisites: ['flags.family-metro-salaried'],
                    options: [
                        { id: 'join', label: '参加企业体验', result: { skills: { technology: 4, information: 5, expression: 2 }, stats: { pressure: 2 }, opportunity: { chainId: 'pc-internet', stage: 'growth', entered: true }, addFlags: ['family-corporate-internship'] } },
                        { id: 'study', label: '把时间留给升学准备', result: { education: { studyHabit: 4, academicScore: 5 }, skills: { learning: 4 }, opportunity: { chainId: 'pc-internet', stage: 'growth', entered: false } } },
                    ],
                },
                {
                    id: 'family-route-scholar-lab', title: '高校实验室的开放日',
                    description: '父母可以带你接触高校教师和实验室。你能更早看见专业方向，但成果转化仍需要漫长积累。',
                    yearMin: 2006, yearMax: 2009, weight: 120, forced: true, prerequisites: ['flags.family-scholar'],
                    options: [
                        { id: 'research', label: '跟随老师做一次小课题', result: { skills: { learning: 5, technology: 4, information: 3 }, stats: { knowledge: 5, pressure: 3 }, opportunity: { chainId: 'education-life', stage: 'growth', entered: true }, addFlags: ['family-academic-mentor'] } },
                        { id: 'broad', label: '先保持广泛阅读', result: { skills: { learning: 4, expression: 2 }, stats: { knowledge: 4, happiness: 2 }, opportunity: { chainId: 'education-life', stage: 'growth', entered: false } } },
                    ],
                },
                {
                    id: 'family-route-wealthy-channel', title: '家族企业准备试验新渠道',
                    description: '家庭可以承担一次明显高于普通家庭的试验，并直接提供供应商、仓储和客户资源。你的建议仍需要父母认可。',
                    yearMin: 2006, yearMax: 2009, weight: 120, forced: true, prerequisites: ['flags.family-wealthy-business', 'stats.familyResources>=8'],
                    options: [
                        { id: 'launch', label: '推动线上渠道试点', result: { stats: { familyResources: -8, pressure: 2 }, skills: { business: 7, management: 5, information: 5 }, opportunity: { chainId: 'ecommerce', stage: 'growth', entered: true }, addFlags: ['family-enterprise-channel', 'family-business-experience'] } },
                        { id: 'research', label: '先请团队做市场调查', result: { stats: { familyResources: -2 }, skills: { information: 6, business: 3 }, opportunity: { chainId: 'ecommerce', stage: 'emergence', entered: false } } },
                        { id: 'decline', label: '不动用家庭企业', result: { stats: { familyBond: 2, happiness: 2 } } },
                    ],
                },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/FamilyUnlockManager.ts",["cc", "./IdentityConfig.ts", "./WealthSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, IdentityConfig_1, WealthSystem_1, FAMILY_UNLOCK_KEY, CAREER_RANK, FamilyUnlockManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (IdentityConfig_1_1) {
                IdentityConfig_1 = IdentityConfig_1_1;
            },
            function (WealthSystem_1_1) {
                WealthSystem_1 = WealthSystem_1_1;
            }
        ],
        execute: function () {
            FAMILY_UNLOCK_KEY = 'restart-life.family-unlocks.v1';
            CAREER_RANK = { junior: 0, middle: 1, senior: 2, core: 3 };
            FamilyUnlockManager = class FamilyUnlockManager {
                unlockedIds() {
                    const defaults = [...IdentityConfig_1.STARTER_FAMILY_IDS];
                    const raw = cc_1.sys.localStorage.getItem(FAMILY_UNLOCK_KEY);
                    if (!raw)
                        return defaults;
                    try {
                        const stored = JSON.parse(raw);
                        return [...new Set([...defaults, ...stored.filter((id) => IdentityConfig_1.IDENTITIES.some((identity) => identity.id === id))])];
                    }
                    catch (_a) {
                        return defaults;
                    }
                }
                isUnlocked(identityId) { return this.unlockedIds().includes(identityId); }
                statuses() {
                    const unlocked = new Set(this.unlockedIds());
                    return IdentityConfig_1.IDENTITIES.map((identity) => ({ identity, unlocked: unlocked.has(identity.id), requirement: identity.unlockDescription }));
                }
                evaluate(state) {
                    var _a;
                    const before = new Set(this.unlockedIds());
                    const after = new Set(before);
                    const totalAssets = WealthSystem_1.totalAssetValue(state);
                    const enteredOpportunities = state.opportunities.filter((item) => item.entered).length
                        + state.industryProjects.filter((item) => item.status !== 'failed').length;
                    const careerRank = CAREER_RANK[state.career.level];
                    if (state.skills.business >= 45 && totalAssets >= 30)
                        after.add('county-business');
                    if (state.education.city === 'metropolis' && careerRank >= CAREER_RANK.senior)
                        after.add('metro-salaried');
                    if (state.education.level === '985' || state.education.level === 'graduate'
                        || (state.stats.knowledge >= 85 && state.skills.learning >= 70))
                        after.add('scholar-family');
                    if (((_a = state.ending) === null || _a === void 0 ? void 0 : _a.id) === 'ending-startup-legend'
                        || (state.skills.business >= 70 && totalAssets >= 200 && enteredOpportunities >= 3 && state.finance.loanBalance <= 20)) {
                        after.add('wealthy-business');
                    }
                    const newlyUnlocked = [...after].filter((id) => !before.has(id));
                    if (newlyUnlocked.length > 0)
                        cc_1.sys.localStorage.setItem(FAMILY_UNLOCK_KEY, JSON.stringify([...after]));
                    return newlyUnlocked;
                }
            };
            exports_1("FamilyUnlockManager", FamilyUnlockManager);
        }
    };
});












































System.register("chunks:///_virtual/FinanceSystem.ts",["./EducationProgressionSystem.ts", "./CitySystem.ts", "./WealthSystem.ts", "./HousingSystem.ts", "./CashManagementSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var EducationProgressionSystem_1, CitySystem_1, WealthSystem_1, HousingSystem_1, CashManagementSystem_1, FinanceSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EducationProgressionSystem_1_1) {
                EducationProgressionSystem_1 = EducationProgressionSystem_1_1;
            },
            function (CitySystem_1_1) {
                CitySystem_1 = CitySystem_1_1;
            },
            function (WealthSystem_1_1) {
                WealthSystem_1 = WealthSystem_1_1;
            },
            function (HousingSystem_1_1) {
                HousingSystem_1 = HousingSystem_1_1;
            },
            function (CashManagementSystem_1_1) {
                CashManagementSystem_1 = CashManagementSystem_1_1;
            }
        ],
        execute: function () {
            FinanceSystem = class FinanceSystem {
                constructor() {
                    this.education = new EducationProgressionSystem_1.EducationProgressionSystem();
                    this.cities = new CitySystem_1.CitySystem();
                    this.housing = new HousingSystem_1.HousingSystem();
                    this.cashManagement = new CashManagementSystem_1.CashManagementSystem();
                }
                refresh(state) {
                    const baseSalary = this.education.annualSalary(state);
                    const healthMultiplier = state.stats.health >= 80 ? 1 : state.stats.health >= 60 ? .9 : state.stats.health >= 40 ? .7 : state.stats.health >= 20 ? .45 : .2;
                    const focusMultiplier = state.career.track === 'unemployed' ? 1 : this.focusIncomeMultiplier(state.lifeFocus);
                    const intensityMultiplier = { relaxed: .9, normal: 1, hard: 1.12 }[state.career.workIntensity];
                    const skillIncome = this.skillIncomeBonus(state);
                    const retirementMultiplier = state.age < 65 ? 1
                        : state.flags.includes('second-career-consulting') || state.flags.includes('second-career-teaching') ? .65
                            : state.flags.includes('retirement-active') ? .55 : .4;
                    state.finance.salaryAnnual = Math.round((baseSalary * healthMultiplier * focusMultiplier * intensityMultiplier + skillIncome) * retirementMultiplier * 10) / 10;
                    state.finance.livingCostAnnual = state.age < 18 ? 0 : this.cities.livingCost(state.education.city, state.year, state.age);
                    const forecast = this.forecastWithoutLoanRefresh(state);
                    const annualSurplusBeforeInterest = Math.max(0, forecast.netCashflow + forecast.interestExpense);
                    const supported = state.age >= 18 && state.career.track !== 'unemployed' && annualSurplusBeforeInterest >= 1.5;
                    const calculatedLimit = supported ? annualSurplusBeforeInterest * 5 + WealthSystem_1.investmentAssetValue(state) * .3 : 0;
                    state.finance.loanLimit = this.roundMoney(Math.max(state.finance.loanBalance, calculatedLimit));
                }
                forecast(state) {
                    this.refresh(state);
                    const projectCashflow = this.roundMoney(state.industryProjects.filter((holding) => holding.status === 'active').reduce((sum, holding) => { var _a; return sum + ((_a = holding.lastAnnualCashflow) !== null && _a !== void 0 ? _a : 0); }, 0));
                    const rentalIncome = this.housing.rentalIncome(state);
                    const fixedIncome = this.cashManagement.expectedIncome(state);
                    const allowanceIncome = this.personalAllowanceAnnual(state);
                    const sideIncome = this.sideIncomeAnnual(state);
                    const otherIncome = this.roundMoney(allowanceIncome + sideIncome + projectCashflow + rentalIncome + fixedIncome);
                    const familyCoveredExpense = state.career.track === 'unemployed' && state.age >= 18 && state.age < 23
                        ? state.finance.livingCostAnnual : 0;
                    const personalLivingExpense = state.age < 18 || familyCoveredExpense > 0 ? 0 : state.finance.livingCostAnnual;
                    const discretionaryExpense = this.focusExpenseAnnual(state);
                    const interestExpense = state.age < 18 ? 0 : Math.ceil(state.finance.loanBalance * 0.05 * 10) / 10;
                    const netCashflow = this.roundMoney(state.finance.salaryAnnual + otherIncome - personalLivingExpense - discretionaryExpense - interestExpense);
                    return {
                        salaryIncome: state.finance.salaryAnnual,
                        allowanceIncome,
                        sideIncome,
                        otherIncome,
                        projectCashflow,
                        rentalIncome,
                        fixedIncome,
                        personalLivingExpense,
                        familyCoveredExpense,
                        discretionaryExpense,
                        interestExpense,
                        netCashflow,
                    };
                }
                settleYear(state) {
                    const openingCash = state.stats.funds;
                    const forecast = this.forecast(state);
                    state.stats.funds = this.roundMoney(state.stats.funds + forecast.netCashflow);
                    state.finance.lastCashflow = this.roundMoney(state.stats.funds - openingCash);
                    this.record(state, openingCash, forecast);
                }
                syncClosingCash(state) {
                    const record = state.finance.history.find((item) => item.year === state.year);
                    if (record)
                        record.closingCash = state.stats.funds;
                }
                takeLoan(state, amount) {
                    this.refresh(state);
                    if (state.age < 18)
                        throw new Error('未成年不能以本人名义申请贷款。');
                    if (!this.hasHealthyCashflow(state))
                        throw new Error(this.loanRequirementText(state));
                    const rounded = this.roundMoney(amount);
                    if (!Number.isFinite(rounded) || rounded <= 0 || state.finance.loanBalance + rounded > state.finance.loanLimit + .001)
                        throw new Error('超过可用贷款额度。');
                    state.finance.loanBalance = this.roundMoney(state.finance.loanBalance + rounded);
                    state.stats.funds = this.roundMoney(state.stats.funds + rounded);
                }
                loanOffer(state, required) {
                    this.refresh(state);
                    const amount = this.roundMoney(Math.max(0, required));
                    const available = this.roundMoney(Math.max(0, state.finance.loanLimit - state.finance.loanBalance));
                    return {
                        required: amount,
                        available,
                        amount,
                        canBorrow: amount > 0 && amount <= available + .001 && this.hasHealthyCashflow(state),
                        annualInterest: this.roundMoney(amount * .05),
                        resultingBalance: this.roundMoney(state.finance.loanBalance + amount),
                    };
                }
                loanRequirementText(state) {
                    if (state.age < 18)
                        return '年满18岁后开放贷款。';
                    if (state.career.track === 'unemployed')
                        return '需要先获得正式工作，并形成稳定的正现金流。';
                    const forecast = this.forecastWithoutLoanRefresh(state);
                    if (forecast.netCashflow < 1.5)
                        return '预计年度结余至少达到 ¥15,000 后开放贷款。';
                    return `当前可借 ¥${Math.round(Math.max(0, state.finance.loanLimit - state.finance.loanBalance) * 10000).toLocaleString('zh-CN')}。`;
                }
                repayLoan(state, amount) {
                    const rounded = this.roundMoney(amount);
                    if (!Number.isFinite(rounded) || rounded <= 0 || rounded > state.finance.loanBalance + .001)
                        throw new Error('还款金额无效。');
                    const actual = Math.min(rounded, state.finance.loanBalance);
                    if (state.stats.funds + .001 < actual)
                        throw new Error('现金不足，无法还款。');
                    state.stats.funds = this.roundMoney(state.stats.funds - actual);
                    state.finance.loanBalance = this.roundMoney(state.finance.loanBalance - actual);
                    this.refresh(state);
                }
                financialFreedom(state) {
                    const forecast = this.forecast(state);
                    const rows = state.finance.history.slice(-3);
                    const passive = rows.length
                        ? rows.reduce((sum, row) => sum + Math.max(0, row.projectIncome) + row.rentalIncome + row.fixedIncome, 0) / rows.length
                        : Math.max(0, forecast.projectCashflow) + forecast.rentalIncome + forecast.fixedIncome;
                    const essential = Math.max(.1, forecast.personalLivingExpense + forecast.interestExpense);
                    const rate = Math.max(0, passive / essential);
                    const label = rate >= 1.5 ? '财务自主' : rate >= 1 ? '财务自由' : rate >= .6 ? '接近自由' : rate >= .25 ? '有被动收入' : '起步积累';
                    const safeCash = state.stats.funds + state.cashManagement.demandBalance;
                    const safetyMonths = Math.floor(safeCash / essential * 12);
                    const achieved = rows.length >= 3 && state.finance.loanBalance <= .001 && rows.every((row) => (Math.max(0, row.projectIncome) + row.rentalIncome + row.fixedIncome) >= Math.max(.1, row.livingExpense + row.interestExpense));
                    return { rate, label, achieved, safetyMonths };
                }
                hasHealthyCashflow(state) {
                    return state.age >= 18
                        && state.career.track !== 'unemployed'
                        && state.finance.loanLimit > state.finance.loanBalance + .001;
                }
                focusIncomeMultiplier(focus) {
                    return { study: .92, work: 1.1, rest: .82, social: .9 }[focus];
                }
                sideIncomeAnnual(state) {
                    if (state.lifeFocus !== 'work' || state.career.track !== 'unemployed')
                        return 0;
                    return state.age < 18 ? .15 : 1.2;
                }
                focusExpenseAnnual(state) {
                    return state.age >= 18 && state.lifeFocus === 'social' ? .4 : 0;
                }
                skillIncomeBonus(state) {
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
                record(state, openingCash, forecast) {
                    const netCashflow = this.roundMoney(state.stats.funds - openingCash);
                    const record = {
                        year: state.year,
                        openingCash,
                        salaryIncome: forecast.salaryIncome,
                        allowanceIncome: forecast.allowanceIncome,
                        sideIncome: forecast.sideIncome,
                        projectIncome: forecast.projectCashflow,
                        rentalIncome: forecast.rentalIncome,
                        fixedIncome: forecast.fixedIncome,
                        otherIncome: forecast.otherIncome,
                        livingExpense: forecast.personalLivingExpense,
                        discretionaryExpense: forecast.discretionaryExpense,
                        familyCoveredExpense: forecast.familyCoveredExpense,
                        housingExpense: 0,
                        interestExpense: forecast.interestExpense,
                        netCashflow,
                        closingCash: state.stats.funds,
                    };
                    state.finance.history = state.finance.history.filter((item) => item.year !== state.year);
                    state.finance.history.push(record);
                }
                forecastWithoutLoanRefresh(state) {
                    const allowanceIncome = this.personalAllowanceAnnual(state);
                    const sideIncome = this.sideIncomeAnnual(state);
                    const projectCashflow = this.roundMoney(state.industryProjects.filter((holding) => holding.status === 'active').reduce((sum, holding) => { var _a; return sum + ((_a = holding.lastAnnualCashflow) !== null && _a !== void 0 ? _a : 0); }, 0));
                    const rentalIncome = this.housing.rentalIncome(state);
                    const fixedIncome = this.cashManagement.expectedIncome(state);
                    const personalLivingExpense = state.career.track === 'unemployed' && state.age < 23 ? 0 : state.finance.livingCostAnnual;
                    const familyCoveredExpense = state.career.track === 'unemployed' && state.age >= 18 && state.age < 23 ? state.finance.livingCostAnnual : 0;
                    const discretionaryExpense = this.focusExpenseAnnual(state);
                    const interestExpense = Math.ceil(state.finance.loanBalance * .05 * 10) / 10;
                    return {
                        salaryIncome: state.finance.salaryAnnual,
                        allowanceIncome,
                        sideIncome,
                        otherIncome: this.roundMoney(allowanceIncome + sideIncome + projectCashflow + rentalIncome + fixedIncome),
                        projectCashflow,
                        rentalIncome,
                        fixedIncome,
                        personalLivingExpense,
                        familyCoveredExpense,
                        discretionaryExpense,
                        interestExpense,
                        netCashflow: this.roundMoney(state.finance.salaryAnnual + allowanceIncome + sideIncome + projectCashflow + rentalIncome + fixedIncome - personalLivingExpense - discretionaryExpense - interestExpense),
                    };
                }
                roundMoney(value) { return Math.round(value * 100) / 100; }
                personalAllowanceAnnual(state) {
                    return state.age < 18 || (state.career.track === 'unemployed' && state.age < 23) ? state.finance.familyAllowanceAnnual : 0;
                }
            };
            exports_1("FinanceSystem", FinanceSystem);
        }
    };
});












































System.register("chunks:///_virtual/FutureTransitionEvents.ts",[], function (exports_1, context_1) {
    "use strict";
    var FUTURE_TRANSITION_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("FUTURE_TRANSITION_EVENTS", FUTURE_TRANSITION_EVENTS = [
                {
                    id: 'timeline-2026-unknown-future',
                    title: '已知的过去利用好了吗？',
                    description: '接下来是无人能预先写好的未来。你要继续前行。',
                    yearMin: 2026,
                    yearMax: 2026,
                    weight: 1,
                    forced: true,
                    options: [
                        { id: 'step-into-unknown', label: '走进未知的未来', result: { skills: { information: 3 }, stats: { happiness: 2 }, addFlags: ['future-timeline-unlocked'] } },
                    ],
                },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/GameBootstrap.ts",["cc", "./GameSession.ts", "./StartupConfig.ts", "./PortraitGameUI.ts", "./DeviceLayout.ts"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var cc_1, GameSession_1, StartupConfig_1, PortraitGameUI_1, DeviceLayout_1, ccclass, GameBootstrap;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (GameSession_1_1) {
                GameSession_1 = GameSession_1_1;
            },
            function (StartupConfig_1_1) {
                StartupConfig_1 = StartupConfig_1_1;
            },
            function (PortraitGameUI_1_1) {
                PortraitGameUI_1 = PortraitGameUI_1_1;
            },
            function (DeviceLayout_1_1) {
                DeviceLayout_1 = DeviceLayout_1_1;
            }
        ],
        execute: function () {
            cc_1.cclegacy._RF.push({}, "0d86a6jClRO66SLf+UnVpcB", "GameBootstrap", undefined);
            ccclass = cc_1._decorator.ccclass;
            GameBootstrap = class GameBootstrap extends cc_1.Component {
                constructor() {
                    super(...arguments);
                    this.session = new GameSession_1.GameSession();
                    this.uiRoot = new cc_1.Node('RestartLifeUI');
                    this.resizeUI = () => { var _a; (_a = this.ui) === null || _a === void 0 ? void 0 : _a.resize(DeviceLayout_1.readDeviceLayout(cc_1.sys.isMobile)); };
                    this.auditUI = () => { var _a, _b; return (_b = (_a = this.ui) === null || _a === void 0 ? void 0 : _a.audit()) !== null && _b !== void 0 ? _b : { revision: 0, issues: [] }; };
                }
                onLoad() {
                    var _a, _b, _c;
                    this.node.addChild(this.uiRoot);
                    this.uiRoot.addComponent(cc_1.UITransform).setContentSize(720, 1280);
                    this.ui = new PortraitGameUI_1.PortraitGameUI(this.uiRoot, this.session, () => this.rollTalentOffers());
                    this.resizeUI();
                    (_a = globalThis.addEventListener) === null || _a === void 0 ? void 0 : _a.call(globalThis, 'resize', this.resizeUI);
                    (_b = globalThis.addEventListener) === null || _b === void 0 ? void 0 : _b.call(globalThis, 'orientationchange', this.resizeUI);
                    const host = globalThis;
                    host.__restartLifeUiAudit = this.auditUI;
                    (_c = host.__restartLifeReady) === null || _c === void 0 ? void 0 : _c.call(host);
                }
                onDestroy() {
                    var _a, _b;
                    (_a = globalThis.removeEventListener) === null || _a === void 0 ? void 0 : _a.call(globalThis, 'resize', this.resizeUI);
                    (_b = globalThis.removeEventListener) === null || _b === void 0 ? void 0 : _b.call(globalThis, 'orientationchange', this.resizeUI);
                    const host = globalThis;
                    if (host.__restartLifeUiAudit === this.auditUI)
                        delete host.__restartLifeUiAudit;
                }
                rollTalentOffers() {
                    const usedTalentIds = new Set();
                    return Array.from({ length: 3 }, () => {
                        const rarityRoll = this.session.rollPercentage();
                        const rarity = rarityRoll < 2 ? 'legendary' : rarityRoll < 20 ? 'rare' : 'common';
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
                balanceTalent(talent) {
                    const multiplier = talent.rarity === 'legendary' ? 1.75 : talent.rarity === 'rare' ? 1.35 : 1;
                    const scale = (values) => {
                        if (!values)
                            return undefined;
                        const scaled = {};
                        Object.entries(values).forEach(([key, value]) => { scaled[key] = Math.round(value * multiplier); });
                        return scaled;
                    };
                    const result = Object.assign(Object.assign({}, talent.result), { attributes: scale(talent.result.attributes), skills: scale(talent.result.skills), stats: scale(talent.result.stats) });
                    return Object.assign(Object.assign({}, talent), { result });
                }
            };
            exports_1("GameBootstrap", GameBootstrap);
            exports_1("GameBootstrap", GameBootstrap = __decorate([
                ccclass('GameBootstrap')
            ], GameBootstrap));
            cc_1.cclegacy._RF.pop();
        }
    };
});












































System.register("chunks:///_virtual/GameEvents.ts",["./EducationEvents.ts", "./IndependentLifeEvents.ts", "./OpportunityEvents.ts", "./YouthTemptationEvents.ts", "./LaterLifeEvents.ts", "./FutureTransitionEvents.ts", "./FamilyOpportunityEvents.ts", "./CareerPathEvents.ts", "./AnnualLifeEvents.ts"], function (exports_1, context_1) {
    "use strict";
    var EducationEvents_1, IndependentLifeEvents_1, OpportunityEvents_1, YouthTemptationEvents_1, LaterLifeEvents_1, FutureTransitionEvents_1, FamilyOpportunityEvents_1, CareerPathEvents_1, AnnualLifeEvents_1, GAME_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EducationEvents_1_1) {
                EducationEvents_1 = EducationEvents_1_1;
            },
            function (IndependentLifeEvents_1_1) {
                IndependentLifeEvents_1 = IndependentLifeEvents_1_1;
            },
            function (OpportunityEvents_1_1) {
                OpportunityEvents_1 = OpportunityEvents_1_1;
            },
            function (YouthTemptationEvents_1_1) {
                YouthTemptationEvents_1 = YouthTemptationEvents_1_1;
            },
            function (LaterLifeEvents_1_1) {
                LaterLifeEvents_1 = LaterLifeEvents_1_1;
            },
            function (FutureTransitionEvents_1_1) {
                FutureTransitionEvents_1 = FutureTransitionEvents_1_1;
            },
            function (FamilyOpportunityEvents_1_1) {
                FamilyOpportunityEvents_1 = FamilyOpportunityEvents_1_1;
            },
            function (CareerPathEvents_1_1) {
                CareerPathEvents_1 = CareerPathEvents_1_1;
            },
            function (AnnualLifeEvents_1_1) {
                AnnualLifeEvents_1 = AnnualLifeEvents_1_1;
            }
        ],
        execute: function () {
            exports_1("GAME_EVENTS", GAME_EVENTS = [
                ...EducationEvents_1.EDUCATION_EVENTS.filter((event) => event.forced),
                ...YouthTemptationEvents_1.YOUTH_TEMPTATION_EVENTS,
                ...FamilyOpportunityEvents_1.FAMILY_OPPORTUNITY_EVENTS.map((event) => (Object.assign(Object.assign({}, event), { forced: false }))),
                ...IndependentLifeEvents_1.INDEPENDENT_LIFE_EVENTS,
                ...CareerPathEvents_1.CAREER_PATH_EVENTS,
                ...OpportunityEvents_1.OPPORTUNITY_EVENTS.filter((event) => event.yearMin >= 2011),
                ...FutureTransitionEvents_1.FUTURE_TRANSITION_EVENTS,
                ...LaterLifeEvents_1.LATER_LIFE_EVENTS,
                ...LaterLifeEvents_1.LATER_LIFE_CONTENT_EVENTS,
                ...AnnualLifeEvents_1.ANNUAL_LIFE_EVENTS,
            ]);
        }
    };
});












































System.register("chunks:///_virtual/GameSession.ts",["./IdentityConfig.ts", "./GameEvents.ts", "./YearConfig.ts", "./InheritanceConfig.ts", "./DelayedEventQueue.ts", "./EventMatcher.ts", "./SaveManager.ts", "./EndingResolver.ts", "./LegacyManager.ts", "./ReportGenerator.ts", "./SeededRandom.ts", "./GameStateManager.ts", "./MarketSystem.ts", "./InvestmentMemoryManager.ts", "./EducationProgressionSystem.ts", "./FinanceSystem.ts", "./CareerSystem.ts", "./CitySystem.ts", "./HousingSystem.ts", "./FamilyUnlockManager.ts", "./IndustryProjectSystem.ts", "./WealthSystem.ts", "./OpenOpportunitySystem.ts", "./CashManagementSystem.ts", "./AbilityConfig.ts"], function (exports_1, context_1) {
    "use strict";
    var IdentityConfig_1, GameEvents_1, YearConfig_1, InheritanceConfig_1, DelayedEventQueue_1, EventMatcher_1, SaveManager_1, EndingResolver_1, LegacyManager_1, ReportGenerator_1, SeededRandom_1, GameStateManager_1, MarketSystem_1, InvestmentMemoryManager_1, EducationProgressionSystem_1, FinanceSystem_1, CareerSystem_1, CitySystem_1, HousingSystem_1, FamilyUnlockManager_1, IndustryProjectSystem_1, WealthSystem_1, OpenOpportunitySystem_1, CashManagementSystem_1, AbilityConfig_1, MAX_AGE, GameSession;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (IdentityConfig_1_1) {
                IdentityConfig_1 = IdentityConfig_1_1;
            },
            function (GameEvents_1_1) {
                GameEvents_1 = GameEvents_1_1;
            },
            function (YearConfig_1_1) {
                YearConfig_1 = YearConfig_1_1;
            },
            function (InheritanceConfig_1_1) {
                InheritanceConfig_1 = InheritanceConfig_1_1;
            },
            function (DelayedEventQueue_1_1) {
                DelayedEventQueue_1 = DelayedEventQueue_1_1;
            },
            function (EventMatcher_1_1) {
                EventMatcher_1 = EventMatcher_1_1;
            },
            function (SaveManager_1_1) {
                SaveManager_1 = SaveManager_1_1;
            },
            function (EndingResolver_1_1) {
                EndingResolver_1 = EndingResolver_1_1;
            },
            function (LegacyManager_1_1) {
                LegacyManager_1 = LegacyManager_1_1;
            },
            function (ReportGenerator_1_1) {
                ReportGenerator_1 = ReportGenerator_1_1;
            },
            function (SeededRandom_1_1) {
                SeededRandom_1 = SeededRandom_1_1;
            },
            function (GameStateManager_1_1) {
                GameStateManager_1 = GameStateManager_1_1;
            },
            function (MarketSystem_1_1) {
                MarketSystem_1 = MarketSystem_1_1;
            },
            function (InvestmentMemoryManager_1_1) {
                InvestmentMemoryManager_1 = InvestmentMemoryManager_1_1;
            },
            function (EducationProgressionSystem_1_1) {
                EducationProgressionSystem_1 = EducationProgressionSystem_1_1;
            },
            function (FinanceSystem_1_1) {
                FinanceSystem_1 = FinanceSystem_1_1;
            },
            function (CareerSystem_1_1) {
                CareerSystem_1 = CareerSystem_1_1;
            },
            function (CitySystem_1_1) {
                CitySystem_1 = CitySystem_1_1;
            },
            function (HousingSystem_1_1) {
                HousingSystem_1 = HousingSystem_1_1;
            },
            function (FamilyUnlockManager_1_1) {
                FamilyUnlockManager_1 = FamilyUnlockManager_1_1;
            },
            function (IndustryProjectSystem_1_1) {
                IndustryProjectSystem_1 = IndustryProjectSystem_1_1;
            },
            function (WealthSystem_1_1) {
                WealthSystem_1 = WealthSystem_1_1;
            },
            function (OpenOpportunitySystem_1_1) {
                OpenOpportunitySystem_1 = OpenOpportunitySystem_1_1;
            },
            function (CashManagementSystem_1_1) {
                CashManagementSystem_1 = CashManagementSystem_1_1;
            },
            function (AbilityConfig_1_1) {
                AbilityConfig_1 = AbilityConfig_1_1;
            }
        ],
        execute: function () {
            MAX_AGE = 70;
            GameSession = class GameSession {
                constructor() {
                    this.stateManager = new GameStateManager_1.GameStateManager();
                    this.eventMatcher = new EventMatcher_1.EventMatcher();
                    this.saves = new SaveManager_1.SaveManager();
                    this.delayedEvents = new DelayedEventQueue_1.DelayedEventQueue();
                    this.endings = new EndingResolver_1.EndingResolver();
                    this.reports = new ReportGenerator_1.ReportGenerator();
                    this.legacy = new LegacyManager_1.LegacyManager();
                    this.market = new MarketSystem_1.MarketSystem();
                    this.investmentMemory = new InvestmentMemoryManager_1.InvestmentMemoryManager();
                    this.education = new EducationProgressionSystem_1.EducationProgressionSystem();
                    this.finance = new FinanceSystem_1.FinanceSystem();
                    this.careers = new CareerSystem_1.CareerSystem();
                    this.cities = new CitySystem_1.CitySystem();
                    this.housing = new HousingSystem_1.HousingSystem();
                    this.familyUnlocks = new FamilyUnlockManager_1.FamilyUnlockManager();
                    this.industryProjects = new IndustryProjectSystem_1.IndustryProjectSystem();
                    this.openOpportunities = new OpenOpportunitySystem_1.OpenOpportunitySystem();
                    this.cashManagement = new CashManagementSystem_1.CashManagementSystem();
                    this.random = new SeededRandom_1.SeededRandom(Date.now());
                    this.newlyUnlockedFamilyIds = [];
                }
                start(identityId, mode = 'original', seed = Date.now()) {
                    var _a;
                    const identity = IdentityConfig_1.IDENTITIES.find((candidate) => candidate.id === identityId);
                    if (!identity)
                        throw new Error('未找到所选家庭身份。');
                    if (!this.familyUnlocks.isUnlocked(identityId))
                        throw new Error(`该家庭尚未解锁：${(_a = identity.unlockDescription) !== null && _a !== void 0 ? _a : '请先完成人生目标。'}`);
                    this.newlyUnlockedFamilyIds = [];
                    this.random = new SeededRandom_1.SeededRandom(seed);
                    this.state = this.stateManager.createNewGame(mode, identity, seed);
                    this.state.market.insightIds = this.investmentMemory.load();
                    const inheritance = this.legacy.load();
                    if (inheritance) {
                        this.stateManager.applyChange(this.state, inheritance.result);
                        this.state.memoryId = inheritance.id;
                    }
                    this.matchNextEvent();
                    this.save();
                    return this.snapshot();
                }
                getCurrentEvent() {
                    return this.currentEvent;
                }
                pickDistinct(items, count) {
                    return [...items].sort(() => this.random.next() - .5).slice(0, count);
                }
                rollPercentage() {
                    return this.random.next() * 100;
                }
                getLatestOutcome() { return this.latestOutcome; }
                completeTutorial() {
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    if (!this.state.flags.includes('tutorial-seen'))
                        this.state.flags.push('tutorial-seen');
                    this.save();
                    return this.snapshot();
                }
                applyStartup(talent, defect) {
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    this.stateManager.applyChange(this.state, talent.result);
                    this.stateManager.applyChange(this.state, defect.result);
                    this.state.talentId = talent.id;
                    this.state.defectId = defect.id;
                    this.save();
                    return this.snapshot();
                }
                choose(optionId) {
                    var _a, _b;
                    if (!this.state || !this.currentEvent)
                        throw new Error('当前没有可选择的事件。');
                    const option = this.currentEvent.options.find((candidate) => candidate.id === optionId);
                    if (!option)
                        throw new Error('该选项已经失效，请重新选择。');
                    if (this.currentEvent.id.startsWith('asset-acquisition-'))
                        return this.resolveDynamic(this.currentEvent, option, () => this.resolveAcquisition(option));
                    if (this.currentEvent.id === 'market-signal')
                        return this.resolveDynamic(this.currentEvent, option, () => this.resolveMarketSignal(option));
                    if (this.currentEvent.id === 'financial-risk')
                        return this.resolveDynamic(this.currentEvent, option, () => this.resolveFinancialRisk(option));
                    if (this.currentEvent.id === 'liquidity-crisis')
                        return this.resolveDynamic(this.currentEvent, option, () => this.resolveLiquidityCrisis(option));
                    this.ensureCareerOptionEligible(option);
                    const cashCost = this.optionCashCost(option);
                    if (cashCost > this.state.stats.funds)
                        throw new Error('现金与可用贷款不足，无法承担这项选择。');
                    const familyCost = Math.max(0, -((_b = (_a = option.result.stats) === null || _a === void 0 ? void 0 : _a.familyResources) !== null && _b !== void 0 ? _b : 0));
                    if (familyCost > this.state.stats.familyResources)
                        throw new Error('家庭资源不足，无法推动这项家庭决策。');
                    this.resolve(this.currentEvent, option);
                    this.save();
                    return this.snapshot();
                }
                choiceFunding(optionId) {
                    if (!this.state || !this.currentEvent)
                        throw new Error('当前没有可选择的事件。');
                    const option = this.currentEvent.options.find((candidate) => candidate.id === optionId);
                    if (!option)
                        throw new Error('该选项已经失效，请重新选择。');
                    const cost = this.optionCashCost(option);
                    const shortfall = Math.max(0, Math.round((cost - this.state.stats.funds) * 100) / 100);
                    return { cost, shortfall, offer: this.finance.loanOffer(this.state, shortfall) };
                }
                chooseWithLoan(optionId) {
                    var _a, _b;
                    if (!this.state || !this.currentEvent)
                        throw new Error('当前没有可选择的事件。');
                    const event = this.currentEvent;
                    const option = event.options.find((candidate) => candidate.id === optionId);
                    if (!option)
                        throw new Error('该选项已经失效，请重新选择。');
                    this.ensureCareerOptionEligible(option);
                    const familyCost = Math.max(0, -((_b = (_a = option.result.stats) === null || _a === void 0 ? void 0 : _a.familyResources) !== null && _b !== void 0 ? _b : 0));
                    if (familyCost > this.state.stats.familyResources)
                        throw new Error('家庭资源不足，无法推动这项家庭决策。');
                    const funding = this.choiceFunding(optionId);
                    if (funding.shortfall > 0) {
                        if (!funding.offer.canBorrow)
                            throw new Error('可用贷款不足，无法承担这项选择。');
                        this.finance.takeLoan(this.state, funding.offer.amount);
                    }
                    this.resolve(event, option);
                    this.save();
                    return this.snapshot();
                }
                declineCurrentEvent() {
                    if (!this.state || !this.currentEvent)
                        throw new Error('当前没有待处理事件。');
                    const event = this.currentEvent;
                    if (event.id.startsWith('asset-acquisition-'))
                        return this.resolveAcquisition({ id: 'decline', label: '拒绝报价，继续持有', result: {} });
                    if (!event.declineAllowed)
                        throw new Error('这不是可以直接错过的商业机会，请选择一种具体处理方式。');
                    this.resolve(event, { id: 'decline-opportunity', label: '不采取行动', result: {} });
                    this.save();
                    return this.snapshot();
                }
                continueYear() {
                    return this.continueYears(this.random.int(1, 3));
                }
                continueYears(years) {
                    var _a;
                    var _b;
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    if (this.currentEvent)
                        throw new Error('请先处理当前事件。');
                    const requested = Math.max(1, Math.min(3, Math.floor(years)));
                    for (let index = 0; index < requested && !this.state.completed; index += 1) {
                        const before = this.snapshot();
                        this.finishYear(1);
                        this.matchNextEvent(true);
                        if (this.state.year > before.year) {
                            const health = Math.round(this.state.stats.health - before.stats.health);
                            const happiness = Math.round(this.state.stats.happiness - before.stats.happiness);
                            const pressure = Math.round(this.state.stats.pressure - before.stats.pressure);
                            const sign = (value) => `${value >= 0 ? '+' : ''}${value}`;
                            const focus = { study: '学习', work: '工作与实践', rest: '休整', social: '生活与相聚' }[before.lifeFocus];
                            const ledger = this.state.finance.history[this.state.finance.history.length - 1];
                            const warning = this.state.liquidityCrisis ? '现金出现缺口，需要先处理流动性危机。' : this.state.stats.health < 30 ? '身体需要更多照顾，明年可以调整重心。' : this.state.stats.pressure > 70 ? '压力较高，记得为休息留出时间。' : '安排可以沿用，也可以在「打算」中重新选择。';
                            (_a = (_b = this.state).annualReviews) !== null && _a !== void 0 ? _a : (_b.annualReviews = []);
                            this.state.annualReviews.push({ year: before.year, age: before.age,
                                text: `这一年，你把重心放在${focus}。\n现金变化 ${AbilityConfig_1.signedMoneyText(this.state.stats.funds - before.stats.funds)}\n健康 ${sign(health)} · 幸福 ${sign(happiness)} · 压力 ${sign(pressure)}\n${ledger ? `工资 ${AbilityConfig_1.signedMoneyText(ledger.salaryIncome)} · 生活支出 ${AbilityConfig_1.signedMoneyText(-ledger.livingExpense)} · 利息 ${AbilityConfig_1.signedMoneyText(-ledger.interestExpense)}\n` : ''}${warning}` });
                        }
                        if (this.currentEvent)
                            break;
                    }
                    this.save();
                    return this.snapshot();
                }
                setLifeFocus(focus) {
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    this.state.lifeFocus = focus;
                    this.finance.refresh(this.state);
                    this.save();
                    return this.snapshot();
                }
                recoverWellbeing(kind) {
                    const changes = {
                        pause: { stats: { pressure: -5, happiness: 2, health: 1 } },
                        care: { stats: { funds: -1.5, pressure: -14, happiness: 3, health: 6 }, addFlags: ['wellbeing-care'] },
                        connection: { stats: { funds: -0.8, pressure: -7, happiness: 8 }, addFlags: ['social-support', 'family-time'] },
                    };
                    return this.useAnnualAction('major-action', '本年度的沉淀已使用；每年只能选择一项沉淀。', () => {
                        var _a, _b;
                        const change = changes[kind];
                        const cost = Math.max(0, -((_b = (_a = change.stats) === null || _a === void 0 ? void 0 : _a.funds) !== null && _b !== void 0 ? _b : 0));
                        if (!this.state)
                            throw new Error('人生尚未开始。');
                        if (cost > this.state.stats.funds)
                            throw new Error(`这项恢复安排需要 ¥${Math.round(cost * 10000).toLocaleString('zh-CN')}。`);
                        this.stateManager.applyChange(this.state, change);
                        this.state.lastWellbeingYear = this.state.year;
                    }, { pause: '留出空白', care: '身心照护', connection: '与重要的人相聚' }[kind]);
                }
                treatYourself(kind) {
                    const choices = {
                        watch: { stats: { funds: -2, happiness: 4, pressure: -1 }, addFlags: ['bought-watch'] },
                        car: { stats: { funds: -12, happiness: 8, pressure: -3 }, addFlags: ['bought-car'] },
                        trip: { stats: { funds: -4, happiness: 6, pressure: -4 }, addFlags: ['took-trip'] },
                    };
                    return this.useAnnualAction('major-action', '本年度的沉淀已使用；每年只能选择一项沉淀。', () => {
                        var _a, _b;
                        if (!this.state)
                            throw new Error('人生尚未开始。');
                        const change = choices[kind], cost = Math.max(0, -((_b = (_a = change.stats) === null || _a === void 0 ? void 0 : _a.funds) !== null && _b !== void 0 ? _b : 0));
                        if (this.state.stats.funds < cost)
                            throw new Error(`这项消费需要 ¥${Math.round(cost * 10000).toLocaleString('zh-CN')}。`);
                        this.stateManager.applyChange(this.state, change);
                    }, { watch: '买一块喜欢的表', car: '买一辆车', trip: '去远处旅行' }[kind]);
                }
                getYearInfo() { return this.state ? YearConfig_1.getYearConfig(this.state.year) : undefined; }
                marketInstruments() { return this.state ? this.market.instruments(this.state) : []; }
                marketLotSize(instrumentId) { if (!this.state)
                    return 100; return this.market.lotSize(this.market.find(instrumentId, this.state)); }
                canTradeMarket() { return !!this.state && this.market.canTrade(this.state); }
                buyMarket(instrumentId, quantity) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.market.buy(this.state, instrumentId, quantity); this.save(); return this.snapshot(); }
                sellMarket(instrumentId, quantity) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.market.sell(this.state, instrumentId, quantity); this.save(); return this.snapshot(); }
                buyMarketAmount(instrumentId, amount) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.market.buyAmount(this.state, instrumentId, amount); this.save(); return this.snapshot(); }
                sellMarketFraction(instrumentId, fraction) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.market.sellFraction(this.state, instrumentId, fraction); this.save(); return this.snapshot(); }
                marketValue() { return this.state ? this.market.portfolioValue(this.state) : 0; }
                investmentAssetValue() { return this.state ? WealthSystem_1.investmentAssetValue(this.state) : 0; }
                totalAssetValue() { return this.state ? WealthSystem_1.totalAssetValue(this.state) : 0; }
                marketChange(instrumentId) { if (!this.state)
                    return { amount: 0, percent: 0 }; const item = this.market.find(instrumentId, this.state); return this.market.change(item, this.state.year, this.state.seed); }
                marketHistory(instrumentId, years = 5) { if (!this.state)
                    return []; const item = this.market.find(instrumentId, this.state); return this.market.history(item, this.state.year, years, this.state.seed); }
                learningIndex() { return this.state ? this.education.learningIndex(this.state) : 0; }
                educationAdmissionPreview(eventId) {
                    if (!this.state)
                        return undefined;
                    if (eventId === 'education-subject-direction')
                        return this.education.highSchoolPreview(this.state);
                    if (eventId === 'education-entrance-exam')
                        return this.education.universityPreview(this.state);
                    return undefined;
                }
                takeLoan(amount) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.finance.takeLoan(this.state, amount); this.save(); return this.snapshot(); }
                repayLoan(amount) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.finance.repayLoan(this.state, amount); this.save(); return this.snapshot(); }
                repayAllLoan() { if (!this.state)
                    throw new Error('人生尚未开始。'); this.finance.repayLoan(this.state, this.state.finance.loanBalance); this.save(); return this.snapshot(); }
                financeForecast() { if (!this.state)
                    throw new Error('人生尚未开始。'); return this.finance.forecast(this.state); }
                focusForecast(focus) { const preview = this.snapshot(); preview.lifeFocus = focus; return this.finance.forecast(preview); }
                financialFreedom() { if (!this.state)
                    throw new Error('人生尚未开始。'); return this.finance.financialFreedom(this.state); }
                loanRequirementText() { return this.state ? this.finance.loanRequirementText(this.state) : '人生尚未开始。'; }
                promotionRequirement() { return this.state ? this.careers.requirement(this.state) : undefined; }
                careerChoicePreview(optionId) {
                    var _a, _b;
                    if (!this.state || ((_a = this.currentEvent) === null || _a === void 0 ? void 0 : _a.id) !== 'career-first-job')
                        return undefined;
                    const option = this.currentEvent.options.find((candidate) => candidate.id === optionId);
                    const track = (_b = option === null || option === void 0 ? void 0 : option.result.career) === null || _b === void 0 ? void 0 : _b.track;
                    if (!option || !track)
                        return undefined;
                    const status = this.careers.entryStatus(this.state, track);
                    const previewState = JSON.parse(JSON.stringify(this.state));
                    this.stateManager.applyChange(previewState, option.result);
                    previewState.lifeFocus = 'work';
                    const forecast = this.finance.forecast(previewState);
                    return Object.assign(Object.assign({}, status), { salaryIncome: forecast.salaryIncome, totalIncome: Math.round((forecast.salaryIncome + forecast.otherIncome) * 100) / 100, annualExpense: Math.round((forecast.personalLivingExpense + forecast.discretionaryExpense + forecast.interestExpense) * 100) / 100, netCashflow: forecast.netCashflow });
                }
                migrateCity(target) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.cities.migrate(this.state, target); this.finance.refresh(this.state); this.save(); return this.snapshot(); }
                migrationPreview(target) { if (!this.state)
                    throw new Error('人生尚未开始。'); return this.cities.preview(this.state, target); }
                housingProducts() { return this.state ? this.housing.products(this.state.education.city) : []; }
                housingPrice(productId) { if (!this.state)
                    return 0; const item = this.housing.products(this.state.education.city).find((candidate) => candidate.id === productId); return item ? this.housing.price(item, this.state.year, this.state.seed) : 0; }
                buyHousing(productId) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.housing.buy(this.state, productId); this.save(); return this.snapshot(); }
                sellHousing(holdingId) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.housing.sell(this.state, holdingId); this.save(); return this.snapshot(); }
                industryProjectConfigs() { return this.state ? this.industryProjects.listings(this.state) : []; }
                hasNewProjectListings() { return !!this.state && this.industryProjects.hasUnreadListings(this.state); }
                markProjectListingsRead() { if (!this.state)
                    return; this.industryProjects.markListingsRead(this.state); this.save(); }
                industryProjectPhase(project) { return this.state ? this.industryProjects.phase(project, this.state.year) : '未知'; }
                industryProjectScale(project) { return this.industryProjects.scaleName(project); }
                industryProjectCashflowRange(project) { return this.state ? this.industryProjects.annualCashflowRange(project, this.state.year) : { min: 0, max: 0 }; }
                industryProjectLoanOffer(projectId) {
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    const project = this.industryProjects.listings(this.state).find((item) => item.id === projectId);
                    if (!project)
                        throw new Error('这个项目当前没有出售。');
                    return this.finance.loanOffer(this.state, Math.max(0, project.minimumInvestment - this.state.stats.funds));
                }
                buyIndustryProject(projectId, useLoan = false) {
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    const project = this.industryProjects.listings(this.state).find((item) => item.id === projectId);
                    if (!project)
                        throw new Error('这个项目当前没有出售。');
                    const shortfall = Math.max(0, Math.round((project.minimumInvestment - this.state.stats.funds) * 100) / 100);
                    if (shortfall > 0) {
                        const offer = this.finance.loanOffer(this.state, shortfall);
                        if (!useLoan || !offer.canBorrow)
                            throw new Error('现金与可用贷款不足，无法买断这个项目。');
                        this.finance.takeLoan(this.state, offer.amount);
                    }
                    this.industryProjects.invest(this.state, projectId, project.minimumInvestment);
                    this.finance.refresh(this.state);
                    this.save();
                    return this.snapshot();
                }
                exitIndustryProject(holdingId) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.industryProjects.exit(this.state, holdingId); this.save(); return this.snapshot(); }
                cashProducts() { return this.cashManagement.products(); }
                depositDemand(amount) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.cashManagement.depositDemand(this.state, amount); this.save(); return this.snapshot(); }
                withdrawDemand(amount) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.cashManagement.withdrawDemand(this.state, amount); this.save(); return this.snapshot(); }
                buyCashProduct(name, amount) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.cashManagement.purchase(this.state, name, amount); this.save(); return this.snapshot(); }
                redeemCashProduct(holdingId) { if (!this.state)
                    throw new Error('人生尚未开始。'); this.cashManagement.redeemEarly(this.state, holdingId); this.save(); return this.snapshot(); }
                cashManagementValue() { return this.state ? this.cashManagement.totalValue(this.state) : 0; }
                graduateSchool() { return this.useAnnualAction('major-action', '本年度的沉淀已使用；每年只能选择一项沉淀。', () => { this.education.applyGraduateSchool(this.state); this.finance.refresh(this.state); }, '研究生进修'); }
                certificate(skill) { return this.useAnnualAction('major-action', '本年度的沉淀已使用；每年只能选择一项沉淀。', () => { this.education.applyCertificate(this.state, skill); this.finance.refresh(this.state); }, '职业考证'); }
                hasMajorActionAvailable() { return !!this.state && this.state.annualActionYears['major-action'] !== this.state.year; }
                marketPrice(instrumentId) {
                    if (!this.state)
                        return 0;
                    return this.market.price(this.market.find(instrumentId, this.state), this.state.year, this.state.seed);
                }
                getReport() { return this.state ? this.reports.generate(this.state) : undefined; }
                familyUnlockStatuses() { return this.familyUnlocks.statuses(); }
                newlyUnlockedFamilyNames() {
                    return this.newlyUnlockedFamilyIds.map((id) => { var _a; return (_a = IdentityConfig_1.IDENTITIES.find((identity) => identity.id === id)) === null || _a === void 0 ? void 0 : _a.name; }).filter((name) => !!name);
                }
                hasArchive() { return this.saves.hasSave(); }
                hasContinuableSave() { return this.saves.hasContinuableSave(); }
                loadArchive() { return this.tryRestore(); }
                getInheritanceChoices() { return [...InheritanceConfig_1.INHERITANCE_REWARDS].sort(() => this.random.next() - 0.5).slice(0, 3); }
                chooseInheritance(reward) { this.legacy.save(reward); }
                activeInheritance() { return this.legacy.load(); }
                tryRestore() {
                    const restored = this.saves.load();
                    if (!restored)
                        return undefined;
                    this.state = restored;
                    this.education.repairMilestones(this.state);
                    this.state.market.insightIds = this.investmentMemory.remember(this.state.market.insightIds);
                    this.finance.refresh(this.state);
                    this.random = new SeededRandom_1.SeededRandom(restored.seed + restored.year + restored.triggeredEventIds.length);
                    this.currentEvent = restored.liquidityCrisis ? this.liquidityCrisisEvent()
                        : restored.pendingAcquisition ? this.acquisitionEvent(restored.pendingAcquisition)
                            : restored.pendingMarketSignal ? this.marketSignalEvent(restored.pendingMarketSignal)
                                : restored.pendingFinancialRisk ? this.financialRiskEvent(restored.pendingFinancialRisk)
                                    : restored.activeEventId === 'career-promotion' && this.careers.canOfferPromotion(restored) ? this.promoteAndCreateNotice()
                                        : GameEvents_1.GAME_EVENTS.find((event) => event.id === restored.activeEventId);
                    this.newlyUnlockedFamilyIds = restored.completed ? this.familyUnlocks.evaluate(restored) : [];
                    if (!this.currentEvent && !restored.completed)
                        this.matchNextEvent();
                    this.save();
                    return this.snapshot();
                }
                snapshot() {
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    return JSON.parse(JSON.stringify(this.state));
                }
                resolve(event, option) {
                    var _a, _b, _c, _d, _e;
                    if (!this.state)
                        return;
                    const before = this.snapshot();
                    const outcome = this.pickOutcome(option);
                    const result = outcome ? this.mergeChanges(option.result, outcome.result) : option.result;
                    const startsCareer = this.state.career.track === 'unemployed' && !!((_a = result.career) === null || _a === void 0 ? void 0 : _a.track) && result.career.track !== 'unemployed';
                    if (result.projectInvestment)
                        this.industryProjects.invest(this.state, result.projectInvestment.projectId, result.projectInvestment.amount);
                    this.stateManager.applyChange(this.state, result);
                    if (startsCareer)
                        this.state.lifeFocus = 'work';
                    this.latestOutcome = outcome === null || outcome === void 0 ? void 0 : outcome.text;
                    if (event.id === 'education-subject-direction')
                        this.education.resolveHighSchool(this.state);
                    if (event.id === 'education-entrance-exam')
                        this.education.resolveUniversity(this.state);
                    this.finance.refresh(this.state);
                    if (!this.state.triggeredEventIds.includes(event.id))
                        this.state.triggeredEventIds.push(event.id);
                    const requiredFlags = ((_b = event.prerequisites) !== null && _b !== void 0 ? _b : []).filter(item => item.startsWith('flags.')).map(item => item.slice(6));
                    const cause = [...this.state.lifeLog].reverse().find(entry => { var _a, _b; return (_b = (_a = entry.result) === null || _a === void 0 ? void 0 : _a.addFlags) === null || _b === void 0 ? void 0 : _b.some(flag => requiredFlags.includes(flag)); });
                    this.state.lifeLog.push({ year: this.state.year, eventId: event.id, optionId: option.id,
                        title: event.title, choice: option.label, outcome: outcome === null || outcome === void 0 ? void 0 : outcome.text, result: this.recordedChange(before, result),
                        cause: cause ? { year: cause.year, title: (_c = cause.title) !== null && _c !== void 0 ? _c : '早年的选择', choice: (_e = (_d = cause.choice) === null || _d === void 0 ? void 0 : _d.split('｜')[0]) !== null && _e !== void 0 ? _e : '一段经历' } : undefined });
                    this.currentEvent = undefined;
                    this.state.activeEventId = undefined;
                }
                resolveDynamic(event, option, action) {
                    const before = this.snapshot();
                    this.latestOutcome = undefined;
                    action();
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    const entry = this.state.lifeLog[this.state.lifeLog.length - 1];
                    if (this.state.lifeLog.length > before.lifeLog.length && entry) {
                        entry.title = event.title;
                        entry.choice = option.label;
                        entry.result = this.recordedChange(before, option.result);
                        entry.outcome = this.latestOutcome;
                    }
                    this.save();
                    return this.snapshot();
                }
                recordedChange(before, result = {}) {
                    if (!this.state)
                        return result;
                    const actual = Object.assign(Object.assign({}, result), { attributes: {}, skills: {}, stats: {} });
                    for (const group of ['attributes', 'skills', 'stats']) {
                        for (const [key, value] of Object.entries(this.state[group])) {
                            const amount = Math.round((value - before[group][key]) * 10000) / 10000;
                            if (amount)
                                actual[group][key] = amount;
                        }
                    }
                    return actual;
                }
                pickOutcome(option) {
                    var _a;
                    if (!((_a = option.outcomes) === null || _a === void 0 ? void 0 : _a.length))
                        return undefined;
                    const total = option.outcomes.reduce((sum, item) => sum + item.weight, 0);
                    let cursor = this.random.next() * total;
                    for (const outcome of option.outcomes) {
                        cursor -= outcome.weight;
                        if (cursor <= 0)
                            return outcome;
                    }
                    return option.outcomes[option.outcomes.length - 1];
                }
                mergeChanges(base, extra) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                    const mergeNumbers = (left, right) => {
                        var _a;
                        if (!left && !right)
                            return undefined;
                        const merged = Object.assign({}, (left !== null && left !== void 0 ? left : {}));
                        for (const [key, value] of Object.entries(right !== null && right !== void 0 ? right : {}))
                            merged[key] = ((_a = merged[key]) !== null && _a !== void 0 ? _a : 0) + value;
                        return merged;
                    };
                    const education = base.education || extra.education ? Object.assign(Object.assign(Object.assign({}, base.education), extra.education), { admissionScore: ((_b = (_a = base.education) === null || _a === void 0 ? void 0 : _a.admissionScore) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = extra.education) === null || _c === void 0 ? void 0 : _c.admissionScore) !== null && _d !== void 0 ? _d : 0), studyHabit: ((_f = (_e = base.education) === null || _e === void 0 ? void 0 : _e.studyHabit) !== null && _f !== void 0 ? _f : 0) + ((_h = (_g = extra.education) === null || _g === void 0 ? void 0 : _g.studyHabit) !== null && _h !== void 0 ? _h : 0), academicScore: ((_k = (_j = base.education) === null || _j === void 0 ? void 0 : _j.academicScore) !== null && _k !== void 0 ? _k : 0) + ((_m = (_l = extra.education) === null || _l === void 0 ? void 0 : _l.academicScore) !== null && _m !== void 0 ? _m : 0), studyYears: ((_p = (_o = base.education) === null || _o === void 0 ? void 0 : _o.studyYears) !== null && _p !== void 0 ? _p : 0) + ((_r = (_q = extra.education) === null || _q === void 0 ? void 0 : _q.studyYears) !== null && _r !== void 0 ? _r : 0) }) : undefined;
                    return Object.assign(Object.assign(Object.assign({}, base), extra), { attributes: mergeNumbers(base.attributes, extra.attributes), skills: mergeNumbers(base.skills, extra.skills), stats: mergeNumbers(base.stats, extra.stats), education, addFlags: [...((_s = base.addFlags) !== null && _s !== void 0 ? _s : []), ...((_t = extra.addFlags) !== null && _t !== void 0 ? _t : [])], assetChanges: [...((_u = base.assetChanges) !== null && _u !== void 0 ? _u : []), ...((_v = extra.assetChanges) !== null && _v !== void 0 ? _v : [])] });
                }
                resolveAcquisition(option) {
                    var _a;
                    if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.pendingAcquisition))
                        throw new Error('收购要约已经失效。');
                    const offer = this.state.pendingAcquisition;
                    if (option.id === 'accept') {
                        if (offer.assetType === 'project')
                            this.industryProjects.acceptAcquisition(this.state, offer.holdingId, offer.multiplier);
                        else
                            this.housing.acceptAcquisition(this.state, offer.holdingId, offer.multiplier);
                    }
                    this.state.lifeLog.push({ year: this.state.year, eventId: `asset-acquisition-${offer.id}`, optionId: option.id });
                    this.state.pendingAcquisition = undefined;
                    this.currentEvent = undefined;
                    this.state.activeEventId = undefined;
                    this.finance.refresh(this.state);
                    this.save();
                    return this.snapshot();
                }
                resolveMarketSignal(option) {
                    var _a;
                    if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.pendingMarketSignal))
                        throw new Error('这条市场预告已经失效。');
                    this.state.lifeLog.push({ year: this.state.year, eventId: this.state.pendingMarketSignal.id, optionId: option.id });
                    this.state.pendingMarketSignal = undefined;
                    this.currentEvent = undefined;
                    this.state.activeEventId = undefined;
                    this.save();
                    return this.snapshot();
                }
                resolveFinancialRisk(option) {
                    var _a;
                    if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.pendingFinancialRisk))
                        throw new Error('这条风险事件已经失效。');
                    this.state.lifeLog.push({ year: this.state.year, eventId: this.state.pendingFinancialRisk.id, optionId: option.id });
                    this.state.pendingFinancialRisk = undefined;
                    this.currentEvent = undefined;
                    this.state.activeEventId = undefined;
                    this.save();
                    return this.snapshot();
                }
                resolveLiquidityCrisis(option) {
                    var _a;
                    if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.liquidityCrisis))
                        throw new Error('当前没有流动性危机。');
                    if (option.id === 'end') {
                        if (!this.state.flags.includes('cashflow-collapse'))
                            this.state.flags.push('cashflow-collapse');
                        this.completeLife();
                        this.save();
                        return this.snapshot();
                    }
                    const [type, holdingId] = option.id.split(':');
                    if (!holdingId || (type !== 'project' && type !== 'housing'))
                        throw new Error('变卖资产的选择无效。');
                    if (type === 'project')
                        this.industryProjects.exit(this.state, holdingId, true);
                    else
                        this.housing.sell(this.state, holdingId, true);
                    const crisis = this.state.liquidityCrisis;
                    const paid = Math.min(this.state.stats.funds, crisis.remainingDeficit);
                    this.state.stats.funds = Math.round((this.state.stats.funds - paid) * 100) / 100;
                    crisis.remainingDeficit = Math.round((crisis.remainingDeficit - paid) * 100) / 100;
                    this.state.lifeLog.push({ year: this.state.year, eventId: 'liquidity-crisis', optionId: option.id });
                    this.currentEvent = undefined;
                    this.state.activeEventId = undefined;
                    if (crisis.remainingDeficit <= .001)
                        this.state.liquidityCrisis = undefined;
                    this.finance.refresh(this.state);
                    this.matchNextEvent(true);
                    this.save();
                    return this.snapshot();
                }
                optionCashCost(option) {
                    var _a, _b, _c, _d;
                    const directCost = Math.max(0, -((_b = (_a = option.result.stats) === null || _a === void 0 ? void 0 : _a.funds) !== null && _b !== void 0 ? _b : 0));
                    const projectCost = (_d = (_c = option.result.projectInvestment) === null || _c === void 0 ? void 0 : _c.amount) !== null && _d !== void 0 ? _d : 0;
                    return Math.round((directCost + projectCost) * 100) / 100;
                }
                ensureCareerOptionEligible(option) {
                    var _a, _b;
                    if (!this.state || ((_a = this.currentEvent) === null || _a === void 0 ? void 0 : _a.id) !== 'career-first-job' || !((_b = option.result.career) === null || _b === void 0 ? void 0 : _b.track))
                        return;
                    const status = this.careers.entryStatus(this.state, option.result.career.track);
                    if (!status.eligible)
                        throw new Error(`暂时无法进入这个岗位：${status.unmet.join('，')}。`);
                }
                finishYear(requestedYears = this.random.int(1, 3)) {
                    if (!this.state)
                        return;
                    if (this.state.age >= MAX_AGE) {
                        this.completeLife();
                        return;
                    }
                    let yearsToAdvance = Math.min(requestedYears, MAX_AGE - this.state.age);
                    if (this.state.year < 2026 && this.state.year + yearsToAdvance > 2026)
                        yearsToAdvance = 2026 - this.state.year;
                    const requiredYear = this.nextRequiredYear();
                    if (requiredYear !== undefined && this.state.year < requiredYear && this.state.year + yearsToAdvance > requiredYear)
                        yearsToAdvance = requiredYear - this.state.year;
                    for (let index = 0; index < yearsToAdvance; index += 1) {
                        this.applyLifeFocus();
                        this.stateManager.advanceYears(this.state, 1);
                        const financialRisk = this.cashManagement.maybeRiskEvent(this.state, this.random);
                        if (financialRisk)
                            this.state.pendingFinancialRisk = financialRisk;
                        if (this.state.age >= 18 && this.state.stats.funds < 0) {
                            this.state.liquidityCrisis = { remainingDeficit: Math.round(-this.state.stats.funds * 100) / 100 };
                            this.state.stats.funds = 0;
                            break;
                        }
                        if (this.state.stats.happiness <= 0) {
                            if (!this.state.flags.includes('happiness-collapse'))
                                this.state.flags.push('happiness-collapse');
                            this.completeLife();
                            break;
                        }
                    }
                    if (this.state.age >= MAX_AGE)
                        this.completeLife();
                }
                matchNextEvent(includeOrdinary = false) {
                    var _a;
                    if (!this.state || this.state.age >= MAX_AGE || this.state.completed)
                        return;
                    this.market.revealFutureInstrument(this.state, this.random);
                    this.industryProjects.refreshListings(this.state, this.random);
                    if (this.state.liquidityCrisis) {
                        this.currentEvent = this.liquidityCrisisEvent();
                        this.state.activeEventId = this.currentEvent.id;
                        return;
                    }
                    if (this.state.pendingAcquisition) {
                        this.currentEvent = this.acquisitionEvent(this.state.pendingAcquisition);
                        this.state.activeEventId = this.currentEvent.id;
                        return;
                    }
                    if (this.state.pendingFinancialRisk) {
                        this.currentEvent = this.financialRiskEvent(this.state.pendingFinancialRisk);
                        this.state.activeEventId = this.currentEvent.id;
                        return;
                    }
                    if (includeOrdinary) {
                        const signal = this.market.maybeCreateSignal(this.state, this.random);
                        if (signal) {
                            this.state.pendingMarketSignal = signal;
                            this.currentEvent = this.marketSignalEvent(signal);
                            this.state.activeEventId = this.currentEvent.id;
                            return;
                        }
                    }
                    if (includeOrdinary && this.careers.canOfferPromotion(this.state)) {
                        const requirement = this.careers.requirement(this.state);
                        if ((requirement === null || requirement === void 0 ? void 0 : requirement.guaranteed) || this.random.next() < .35) {
                            this.currentEvent = this.promoteAndCreateNotice();
                            this.state.activeEventId = this.currentEvent.id;
                            return;
                        }
                    }
                    if (includeOrdinary && this.maybeCreateAcquisitionOffer()) {
                        this.currentEvent = this.acquisitionEvent(this.state.pendingAcquisition);
                        this.state.activeEventId = this.currentEvent.id;
                        return;
                    }
                    const ownedProjects = new Set(this.state.industryProjects.map((holding) => holding.projectId));
                    const availableEvents = GameEvents_1.GAME_EVENTS.filter((event) => !event.options.some((option) => option.result.projectInvestment && ownedProjects.has(option.result.projectInvestment.projectId)));
                    const forced = this.eventMatcher.pick(this.state, availableEvents.filter((event) => event.forced), this.random);
                    if (forced)
                        this.currentEvent = forced;
                    else {
                        const delayed = this.delayedEvents.takeDue(this.state);
                        if (delayed)
                            this.currentEvent = GameEvents_1.GAME_EVENTS.find((event) => event.id === delayed.eventId);
                        else if (includeOrdinary && this.random.next() < this.eventDensity) {
                            const major = this.random.next() < 0.28
                                ? this.eventMatcher.pick(this.state, availableEvents.filter((event) => event.interaction === 'opportunity'), this.random)
                                : undefined;
                            this.currentEvent = major !== null && major !== void 0 ? major : this.eventMatcher.pick(this.state, availableEvents.filter((event) => !event.forced && event.interaction !== 'opportunity'), this.random);
                        }
                        else
                            this.currentEvent = undefined;
                    }
                    this.state.activeEventId = (_a = this.currentEvent) === null || _a === void 0 ? void 0 : _a.id;
                }
                promoteAndCreateNotice() {
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    const current = this.state.career.level;
                    const next = this.careers.promote(this.state);
                    const names = { junior: '初级', middle: '中级', senior: '高级', core: '核心' };
                    this.state.lifeLog.push({ year: this.state.year, eventId: 'career-promotion', optionId: 'auto-promote' });
                    this.finance.refresh(this.state);
                    return {
                        id: 'career-promotion-notice', title: '晋升通知', description: `你从${names[current]}职级晋升为${names[next]}职级，基础年薪已提高 15%。`,
                        yearMin: this.state.year, yearMax: this.state.year, weight: 100, interaction: 'information', informational: true,
                        options: [{ id: 'acknowledge', label: '已知悉', result: {} }],
                    };
                }
                maybeCreateAcquisitionOffer() {
                    if (!this.state || this.state.age < 18 || this.random.next() >= .12)
                        return false;
                    const assets = [
                        ...this.state.industryProjects.filter((holding) => holding.status === 'active').map((holding) => ({ type: 'project', id: holding.id, name: holding.name, value: holding.currentValue })),
                        ...this.state.housingHoldings.map((holding) => ({ type: 'housing', id: holding.id, name: holding.name, value: holding.currentValue })),
                    ].filter((asset) => asset.value > 0);
                    if (assets.length === 0)
                        return false;
                    const asset = assets[this.random.int(0, assets.length - 1)];
                    const roll = this.random.next();
                    const multiplier = roll < .65 ? 1.2 + this.random.next() * .6
                        : roll < .9 ? 1.8 + this.random.next() * 1.2
                            : roll < .98 ? 3 + this.random.next() * 2 : 5 + this.random.next() * 3;
                    this.state.pendingAcquisition = {
                        id: `${asset.type}-${asset.id}-${this.state.year}`,
                        assetType: asset.type, holdingId: asset.id, assetName: asset.name, marketValue: asset.value,
                        multiplier: Math.round(multiplier * 100) / 100, offeredYear: this.state.year,
                    };
                    return true;
                }
                acquisitionEvent(offer) {
                    const price = Math.round(offer.marketValue * offer.multiplier * 100) / 100;
                    return {
                        id: `asset-acquisition-${offer.id}`, title: `${offer.assetType === 'project' ? '项目' : '房产'}收购要约`,
                        description: `有人提出以当前市场估值的 ${offer.multiplier.toFixed(2)} 倍收购「${offer.assetName}」。市场价 ${this.money(offer.marketValue)}，报价 ${this.money(price)}。`,
                        yearMin: offer.offeredYear, yearMax: offer.offeredYear, weight: 100, interaction: 'opportunity', declineAllowed: true,
                        options: [{ id: 'accept', label: `接受收购｜到账 ${this.money(price)}`, result: {} }, { id: 'decline', label: '拒绝报价，继续持有', result: {} }],
                    };
                }
                marketSignalEvent(signal) {
                    return { id: 'market-signal', title: signal.title, description: signal.description, yearMin: signal.createdYear, yearMax: signal.createdYear, weight: 100, informational: true, interaction: 'information', options: [{ id: 'acknowledge', label: '记下这条可靠消息', result: {} }] };
                }
                financialRiskEvent(risk) {
                    return { id: 'financial-risk', title: risk.title, description: risk.description, yearMin: risk.createdYear, yearMax: risk.createdYear, weight: 100, informational: true, interaction: 'information', options: [{ id: 'acknowledge', label: '查看并调整资产配置', result: {} }] };
                }
                liquidityCrisisEvent() {
                    var _a;
                    if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.liquidityCrisis))
                        throw new Error('当前没有流动性危机。');
                    const deficit = this.state.liquidityCrisis.remainingDeficit;
                    const projectChoices = this.state.industryProjects.filter((holding) => holding.status === 'active').map((holding) => ({ id: `project:${holding.id}`, label: `变卖项目「${holding.name}」｜六折约 ${this.money(holding.currentValue * .6)}`, result: {} }));
                    const housingChoices = this.state.housingHoldings.map((holding) => ({ id: `housing:${holding.id}`, label: `变卖房产「${holding.name}」｜六折约 ${this.money(holding.currentValue * .6)}`, result: {} }));
                    const options = [...projectChoices, ...housingChoices];
                    if (options.length === 0)
                        options.push({ id: 'end', label: '无可变卖资产，结束这段人生', result: {} });
                    return {
                        id: 'liquidity-crisis', title: '流动性危机', description: `年度现金流无法覆盖支出，仍需筹集 ${this.money(deficit)}。你可以在危机中以市场估值六折变卖资产；资产不足时，这段人生将结束。`,
                        yearMin: this.state.year, yearMax: this.state.year, weight: 100, forced: true, interaction: 'milestone', options,
                    };
                }
                get eventDensity() {
                    if (!this.state)
                        return 0;
                    if (this.state.age < 18)
                        return 1;
                    if (this.state.age < 22)
                        return 0.9;
                    return 1;
                }
                applyLifeFocus() {
                    if (!this.state)
                        return;
                    const focus = this.state.lifeFocus;
                    if (focus === 'study') {
                        this.stateManager.applyChange(this.state, this.state.age < 18
                            ? { education: { admissionScore: 2 }, skills: { learning: 2 }, stats: { knowledge: 2, pressure: 4, happiness: -1 } }
                            : { skills: { learning: 2, information: 1 }, stats: { knowledge: 2, pressure: 2, happiness: -1 } });
                    }
                    else if (focus === 'work') {
                        if (this.state.career.track === 'unemployed') {
                            this.stateManager.applyChange(this.state, this.state.age < 18
                                ? { skills: { business: 1, management: 1 }, education: { admissionScore: -1 }, stats: { pressure: 2, happiness: -1 } }
                                : { skills: { management: 1, business: 1, information: 1 }, stats: { pressure: 3, happiness: -1 } });
                        }
                        else {
                            const skill = this.state.career.track === 'technology' ? { technology: 2, information: 1 }
                                : this.state.career.track === 'product' ? { management: 2, business: 1, information: 1 }
                                    : this.state.career.track === 'sales' ? { business: 2, expression: 1 }
                                        : this.state.career.track === 'education' ? { learning: 2, expression: 1 }
                                            : this.state.career.track === 'media' ? { expression: 2, information: 1 }
                                                : { management: 1, learning: 1, information: 1 };
                            const knowledge = this.state.career.track === 'education' ? 2 : 0;
                            this.stateManager.applyChange(this.state, { skills: skill, stats: { pressure: 3, happiness: -1, knowledge } });
                        }
                    }
                    else if (focus === 'rest') {
                        this.stateManager.applyChange(this.state, { education: this.state.age < 18 ? { admissionScore: -1 } : undefined, stats: { health: 3, pressure: -8, happiness: 5 } });
                    }
                    else if (focus === 'social') {
                        this.stateManager.applyChange(this.state, { education: this.state.age < 18 ? { admissionScore: -1 } : undefined, stats: { happiness: 6, pressure: -4 }, skills: { expression: 1 }, addFlags: ['social-circle'] });
                    }
                }
                money(amount) { return `¥${Math.round(amount * 10000).toLocaleString('zh-CN')}`; }
                save() {
                    if (this.state) {
                        this.openOpportunities.syncPermanentUnlocks(this.state);
                        this.saves.save(this.state);
                    }
                }
                useAnnualAction(key, repeatedMessage, action, title = '为自己安排时间') {
                    if (!this.state)
                        throw new Error('人生尚未开始。');
                    if (this.state.annualActionYears[key] === this.state.year)
                        throw new Error(repeatedMessage);
                    const before = this.snapshot();
                    action();
                    this.latestOutcome = undefined;
                    const result = this.recordedChange(before);
                    result.addFlags = this.state.flags.filter(flag => !before.flags.includes(flag));
                    this.state.lifeLog.push({ year: this.state.year, eventId: `annual-action-${key}`, optionId: title, title, choice: title, result });
                    this.state.annualActionYears[key] = this.state.year;
                    this.save();
                    return this.snapshot();
                }
                completeLife() {
                    if (!this.state || this.state.completed)
                        return;
                    this.state.completed = true;
                    this.state.ending = this.endings.resolve(this.state);
                    this.newlyUnlockedFamilyIds = this.familyUnlocks.evaluate(this.state);
                    this.currentEvent = undefined;
                    this.state.activeEventId = undefined;
                }
                nextRequiredYear() {
                    if (!this.state)
                        return undefined;
                    if (!this.state.flags.includes('high-school-placement'))
                        return 2008;
                    if (!this.state.flags.includes('university-entry'))
                        return 2010;
                    if (!this.state.flags.includes('career-started'))
                        return 2014;
                    return undefined;
                }
            };
            exports_1("GameSession", GameSession);
        }
    };
});












































System.register("chunks:///_virtual/GameStateManager.ts",["./SeededRandom.ts", "./AssetSystem.ts", "./HealthSystem.ts", "./OpportunitySystem.ts", "./FinanceSystem.ts", "./HousingSystem.ts", "./IndustryProjectSystem.ts", "./CareerSystem.ts", "./GrowthSystem.ts", "./CashManagementSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var __rest = (this && this.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    var SeededRandom_1, AssetSystem_1, HealthSystem_1, OpportunitySystem_1, FinanceSystem_1, HousingSystem_1, IndustryProjectSystem_1, CareerSystem_1, GrowthSystem_1, CashManagementSystem_1, BASE_ATTRIBUTES, BASE_SKILLS, BASE_STATS, GameStateManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SeededRandom_1_1) {
                SeededRandom_1 = SeededRandom_1_1;
            },
            function (AssetSystem_1_1) {
                AssetSystem_1 = AssetSystem_1_1;
            },
            function (HealthSystem_1_1) {
                HealthSystem_1 = HealthSystem_1_1;
            },
            function (OpportunitySystem_1_1) {
                OpportunitySystem_1 = OpportunitySystem_1_1;
            },
            function (FinanceSystem_1_1) {
                FinanceSystem_1 = FinanceSystem_1_1;
            },
            function (HousingSystem_1_1) {
                HousingSystem_1 = HousingSystem_1_1;
            },
            function (IndustryProjectSystem_1_1) {
                IndustryProjectSystem_1 = IndustryProjectSystem_1_1;
            },
            function (CareerSystem_1_1) {
                CareerSystem_1 = CareerSystem_1_1;
            },
            function (GrowthSystem_1_1) {
                GrowthSystem_1 = GrowthSystem_1_1;
            },
            function (CashManagementSystem_1_1) {
                CashManagementSystem_1 = CashManagementSystem_1_1;
            }
        ],
        execute: function () {
            BASE_ATTRIBUTES = { intelligence: 50, execution: 50 };
            BASE_SKILLS = { learning: 10, technology: 10, business: 10, expression: 10, management: 10, information: 10 };
            BASE_STATS = { funds: 0, familyResources: 0, health: 85, pressure: 10, happiness: 60, knowledge: 10, familyBond: 0 };
            GameStateManager = class GameStateManager {
                constructor() {
                    this.assets = new AssetSystem_1.AssetSystem();
                    this.health = new HealthSystem_1.HealthSystem();
                    this.opportunities = new OpportunitySystem_1.OpportunitySystem();
                    this.finance = new FinanceSystem_1.FinanceSystem();
                    this.housing = new HousingSystem_1.HousingSystem();
                    this.industryProjects = new IndustryProjectSystem_1.IndustryProjectSystem();
                    this.careers = new CareerSystem_1.CareerSystem();
                    this.cashManagement = new CashManagementSystem_1.CashManagementSystem();
                }
                createNewGame(mode, identity, seed = Date.now()) {
                    var _a;
                    const random = new SeededRandom_1.SeededRandom(seed);
                    const attributes = Object.assign({}, BASE_ATTRIBUTES);
                    for (const key of Object.keys(attributes)) {
                        attributes[key] = this.clamp(attributes[key] + ((_a = identity.attributeModifiers[key]) !== null && _a !== void 0 ? _a : 0) + random.int(-5, 5));
                    }
                    const skills = this.applyRecord(Object.assign({}, BASE_SKILLS), identity.skillModifiers);
                    const stats = this.applyRecord(Object.assign(Object.assign({}, BASE_STATS), { familyResources: identity.initialFamilyResources }), identity.dynamicModifiers);
                    return { version: 2, seed, mode, year: 2000, age: 8, identityId: identity.id, attributes, skills, stats, flags: [...identity.familyFlags, 'project-investment-v2', 'market-share-unit-v2'], triggeredEventIds: [], unlockedAchievementIds: [], lastWellbeingYear: -1, annualActionYears: {}, delayedEvents: [], education: { level: 'primary', city: identity.region, admissionScore: 50, studyHabit: 0, academicScore: 0, studyYears: 0 }, finance: FinanceSystem_1.FinanceSystem.initial(identity.familyAllowanceAnnual), career: { track: 'unemployed', level: 'junior', workIntensity: 'normal', industry: '', yearsAtLevel: 0, salaryMultiplier: 1 }, lifeFocus: 'study', startup: { active: false }, assets: [], housingHoldings: [], industryProjects: [], projectMarket: { listingProjectIds: [], unreadProjectIds: [], seenProjectIds: [], lastRefreshYear: -1 }, market: { discoveredInstrumentIds: [], positions: [], realizedProfit: 0, insightIds: [], generatedInstruments: [] }, cashManagement: this.cashManagement.initial(), discoveredSignalIds: [], opportunities: [], lifeLog: [], completed: false };
                }
                applyChange(state, change) {
                    var _a, _b, _c;
                    this.applyGrowthRecord(state.skills, change.skills, 0, 100);
                    this.applyDynamicStats(state.stats, change.stats);
                    if (change.education) {
                        const _d = change.education, { admissionScore, studyHabit, academicScore, studyYears } = _d, categorical = __rest(_d, ["admissionScore", "studyHabit", "academicScore", "studyYears"]);
                        Object.assign(state.education, categorical);
                        if (admissionScore !== undefined)
                            state.education.admissionScore = this.clamp(state.education.admissionScore + admissionScore, 0, 100);
                        if (academicScore !== undefined)
                            state.education.admissionScore = this.clamp(state.education.admissionScore + academicScore, 0, 100);
                        if (studyHabit !== undefined)
                            state.education.studyHabit = this.clamp(state.education.studyHabit + studyHabit, 0, 100);
                        if (academicScore !== undefined)
                            state.education.academicScore = this.clamp(state.education.academicScore + academicScore, 0, 100);
                        if (studyYears !== undefined)
                            state.education.studyYears = this.clamp(state.education.studyYears + studyYears, 0);
                    }
                    if (change.career)
                        Object.assign(state.career, change.career);
                    if (change.startup)
                        Object.assign(state.startup, change.startup);
                    for (const changeItem of (_a = change.assetChanges) !== null && _a !== void 0 ? _a : [])
                        this.assets.apply(state.assets, changeItem.type, changeItem.amount);
                    for (const signalId of (_b = change.signalIds) !== null && _b !== void 0 ? _b : [])
                        if (!state.discoveredSignalIds.includes(signalId))
                            state.discoveredSignalIds.push(signalId);
                    if (change.opportunity)
                        this.opportunities.applyProgress(state, change.opportunity);
                    for (const flag of (_c = change.addFlags) !== null && _c !== void 0 ? _c : [])
                        if (!state.flags.includes(flag))
                            state.flags.push(flag);
                }
                advanceYear(state) {
                    this.settleYear(state);
                    state.year += 1;
                    state.age += 1;
                    state.stats.pressure = this.clamp(state.stats.pressure - 1, 0, 100);
                }
                advanceYears(state, years) {
                    for (let index = 0; index < years; index += 1)
                        this.advanceYear(state);
                }
                settleYear(state) {
                    this.health.applyYearlyCost(state.stats, state.age);
                    this.finance.settleYear(state);
                    this.housing.settleRent(state);
                    this.cashManagement.settleYear(state);
                    this.finance.syncClosingCash(state);
                    this.housing.appreciate(state);
                    this.industryProjects.settleYear(state);
                    this.careers.evaluateAnnual(state);
                    this.applyChildhoodStudyLoad(state);
                    this.applyPressureConsequences(state);
                }
                applyChildhoodStudyLoad(state) {
                    if (state.age >= 18)
                        return;
                    const intensity = state.lifeFocus === 'study' ? 1 : 0;
                    if (intensity === 0)
                        return;
                    state.stats.pressure = this.clamp(state.stats.pressure + Math.max(1, intensity - 1), 0, 100);
                    if (intensity >= 2)
                        state.stats.happiness = this.clamp(state.stats.happiness - 1, 0, 100);
                }
                applyPressureConsequences(state) {
                    const pressure = state.stats.pressure;
                    if (pressure < 40)
                        return;
                    if (pressure < 60) {
                        state.stats.happiness = this.clamp(state.stats.happiness - 1, 0, 100);
                        return;
                    }
                    if (pressure < 80) {
                        state.stats.happiness = this.clamp(state.stats.happiness - 4, 0, 100);
                        state.stats.health = this.clamp(state.stats.health - 2, 0, 100);
                        return;
                    }
                    state.stats.happiness = this.clamp(state.stats.happiness - 8, 0, 100);
                    state.stats.health = this.clamp(state.stats.health - 5, 0, 100);
                    state.stats.knowledge = this.clamp(state.stats.knowledge - 2, 0, 100);
                }
                applyRecord(target, delta, min, max) {
                    var _a;
                    if (!delta)
                        return target;
                    for (const [key, value] of Object.entries(delta)) {
                        const numericTarget = target;
                        if (!(key in numericTarget))
                            continue;
                        const current = (_a = numericTarget[key]) !== null && _a !== void 0 ? _a : 0;
                        numericTarget[key] = this.clamp(current + Number(value !== null && value !== void 0 ? value : 0), min, max);
                    }
                    return target;
                }
                applyDynamicStats(target, delta) {
                    if (!delta)
                        return;
                    for (const [key, value] of Object.entries(delta)) {
                        if (!(key in target))
                            continue;
                        if (key === 'familyBond')
                            continue;
                        const applied = key === 'knowledge' && value > 0 ? GrowthSystem_1.growthGain(target[key], value) : value;
                        const next = target[key] + applied;
                        target[key] = key === 'funds' ? this.clamp(next, 0) : this.clamp(next, 0, 100);
                    }
                }
                applyGrowthRecord(target, delta, min, max) {
                    var _a;
                    if (!delta)
                        return target;
                    for (const [key, value] of Object.entries(delta)) {
                        const numericTarget = target;
                        const current = (_a = numericTarget[key]) !== null && _a !== void 0 ? _a : 0;
                        const numericValue = Number(value !== null && value !== void 0 ? value : 0);
                        const applied = numericValue > 0 ? GrowthSystem_1.growthGain(current, numericValue) : numericValue;
                        numericTarget[key] = this.clamp(current + applied, min, max);
                    }
                    return target;
                }
                clamp(value, min, max) {
                    return Math.min(max !== null && max !== void 0 ? max : Number.POSITIVE_INFINITY, Math.max(min !== null && min !== void 0 ? min : Number.NEGATIVE_INFINITY, value));
                }
            };
            exports_1("GameStateManager", GameStateManager);
        }
    };
});












































System.register("chunks:///_virtual/GameTypes.ts",[], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});












































System.register("chunks:///_virtual/GrowthSystem.ts",[], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function growthGain(current, gain) {
        if (gain <= 0)
            return gain;
        const multiplier = current >= 80 ? .25 : current >= 60 ? .5 : current >= 40 ? .75 : 1;
        return Math.max(.25, Math.round(gain * multiplier * 4) / 4);
    }
    exports_1("growthGain", growthGain);
    function growValue(current, gain, min = 0, max = 100) {
        return Math.min(max, Math.max(min, current + growthGain(current, gain)));
    }
    exports_1("growValue", growValue);
    return {
        setters: [],
        execute: function () {
        }
    };
});












































System.register("chunks:///_virtual/HealthSystem.ts",[], function (exports_1, context_1) {
    "use strict";
    var HealthSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HealthSystem = class HealthSystem {
                applyYearlyCost(stats, age) {
                    const pressureCost = stats.pressure >= 80 ? 4 : stats.pressure >= 60 ? 2 : 0;
                    const ageCost = age >= 65 ? 2 : age >= 45 ? 1 : 0;
                    stats.health = Math.max(0, Math.min(100, stats.health - pressureCost - ageCost));
                }
            };
            exports_1("HealthSystem", HealthSystem);
        }
    };
});












































System.register("chunks:///_virtual/HousingSystem.ts",[], function (exports_1, context_1) {
    "use strict";
    var HOUSING_PRODUCTS, HousingSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("HOUSING_PRODUCTS", HOUSING_PRODUCTS = [
                { id: 'rural-entry', city: 'rural', name: '乡镇旧居', tier: 'entry', basePrice: 8, rentalYield: .018, description: '价格低，出租需求和流动性一般。' },
                { id: 'rural-standard', city: 'rural', name: '自建住宅', tier: 'standard', basePrice: 20, rentalYield: .021, description: '出租稳定性尚可，出售周期较长。' },
                { id: 'rural-improved', city: 'rural', name: '改善型乡居', tier: 'improved', basePrice: 35, rentalYield: .024, description: '租金与增值依赖本地发展。' },
                { id: 'county-entry', city: 'county', name: '县城小户型', tier: 'entry', basePrice: 20, rentalYield: .022, description: '总价较低，租住需求较稳定。' },
                { id: 'county-standard', city: 'county', name: '县城标准住宅', tier: 'standard', basePrice: 45, rentalYield: .026, description: '兼顾租金与本地流动性。' },
                { id: 'county-improved', city: 'county', name: '县城改善住宅', tier: 'improved', basePrice: 70, rentalYield: .028, description: '面积较大，租金回报相对更高。' },
                { id: 'city-entry', city: 'city', name: '城市老旧小户型', tier: 'entry', basePrice: 45, rentalYield: .026, description: '维护成本较高，但出租需求稳定。' },
                { id: 'city-standard', city: 'city', name: '城市标准住宅', tier: 'standard', basePrice: 85, rentalYield: .030, description: '就业和公共服务完善，租金稳定。' },
                { id: 'city-improved', city: 'city', name: '城市改善住宅', tier: 'improved', basePrice: 140, rentalYield: .032, description: '居住体验好，出租客群更稳定。' },
                { id: 'metropolis-entry', city: 'metropolis', name: '大城市老旧小户型', tier: 'entry', basePrice: 90, rentalYield: .024, description: '总价高，核心区出租需求较强。' },
                { id: 'metropolis-standard', city: 'metropolis', name: '大城市标准住宅', tier: 'standard', basePrice: 180, rentalYield: .028, description: '租住稳定，但资金占用高。' },
                { id: 'metropolis-improved', city: 'metropolis', name: '大城市改善住宅', tier: 'improved', basePrice: 320, rentalYield: .031, description: '高总价资产，依靠高质量租客。' },
            ]);
            HousingSystem = class HousingSystem {
                products(city) { return HOUSING_PRODUCTS.filter((item) => item.city === city); }
                price(product, year, seed = 0) {
                    let factor = 1;
                    for (let cursor = 2010; cursor < year; cursor += 1)
                        factor *= 1 + this.annualRate(product.city, cursor, product.id, seed);
                    for (let cursor = year; cursor < 2010; cursor += 1)
                        factor /= 1 + this.annualRate(product.city, cursor, product.id, seed);
                    return Math.max(1, Math.round(product.basePrice * factor * 10) / 10);
                }
                buy(state, productId) {
                    const product = HOUSING_PRODUCTS.find((item) => item.id === productId);
                    if (!product)
                        throw new Error('未找到该住房。');
                    if (product.city !== state.education.city)
                        throw new Error('只能购买当前所在城市的住房。');
                    const price = this.price(product, state.year, state.seed);
                    const transactionCost = Math.round(price * .03 * 10) / 10;
                    const total = price + transactionCost;
                    if (state.stats.funds < total)
                        throw new Error(`购房及税费共需 ¥${(total * 10000).toLocaleString('zh-CN')} 现金。`);
                    state.stats.funds -= total;
                    const holding = { id: `${productId}-${state.year}-${state.housingHoldings.length + 1}`, productId, city: product.city, name: product.name, purchaseYear: state.year, purchasePrice: price, currentValue: price, lastAnnualRent: 0, cumulativeRent: 0 };
                    state.housingHoldings.push(holding);
                    this.syncLegacyAsset(state);
                    return holding;
                }
                sell(state, holdingId, distressed = false) {
                    const index = state.housingHoldings.findIndex((item) => item.id === holdingId);
                    if (index < 0)
                        throw new Error('当前没有这套住房。');
                    const holding = state.housingHoldings[index];
                    const proceeds = Math.max(0, Math.round(holding.currentValue * (distressed ? .6 : .7) * 100) / 100);
                    state.stats.funds += proceeds;
                    state.housingHoldings.splice(index, 1);
                    this.syncLegacyAsset(state);
                    return holding;
                }
                acceptAcquisition(state, holdingId, multiplier) {
                    const index = state.housingHoldings.findIndex((item) => item.id === holdingId);
                    if (index < 0)
                        throw new Error('这套房产已经无法接受收购。');
                    const holding = state.housingHoldings[index];
                    state.stats.funds = Math.round((state.stats.funds + holding.currentValue * multiplier) * 100) / 100;
                    state.housingHoldings.splice(index, 1);
                    this.syncLegacyAsset(state);
                    return holding;
                }
                appreciate(state) {
                    for (const holding of state.housingHoldings)
                        holding.currentValue = Math.max(0, Math.round(holding.currentValue * (1 + this.annualRate(holding.city, state.year, holding.productId, state.seed)) * 10) / 10);
                    this.syncLegacyAsset(state);
                }
                rentalIncome(state) {
                    return Math.round(state.housingHoldings.reduce((sum, holding) => sum + holding.currentValue * this.rentalYield(holding), 0) * 100) / 100;
                }
                settleRent(state) {
                    for (const holding of state.housingHoldings) {
                        const income = Math.round(holding.currentValue * this.rentalYield(holding) * 100) / 100;
                        holding.lastAnnualRent = income;
                        holding.cumulativeRent = Math.round((holding.cumulativeRent + income) * 100) / 100;
                    }
                }
                rentalYield(holding) { var _a, _b; return (_b = (_a = HOUSING_PRODUCTS.find((item) => item.id === holding.productId)) === null || _a === void 0 ? void 0 : _a.rentalYield) !== null && _b !== void 0 ? _b : .02; }
                annualRate(city, year, id = '', seed = 0) {
                    if (year <= 2015)
                        return { rural: .02, county: .05, city: .08, metropolis: .10 }[city];
                    if (year <= 2020)
                        return { rural: .01, county: .025, city: .04, metropolis: .05 }[city];
                    if (year <= 2026)
                        return { rural: 0, county: -.01, city: -.015, metropolis: -.02 }[city];
                    const base = { rural: .005, county: .01, city: .015, metropolis: .018 }[city];
                    const hash = this.hash(`${id}:${seed}:${year}`) / 0xffffffff;
                    return base + (hash - .5) * .18;
                }
                hash(value) { let hash = 2166136261; for (let index = 0; index < value.length; index += 1) {
                    hash ^= value.charCodeAt(index);
                    hash = Math.imul(hash, 16777619);
                } return hash >>> 0; }
                syncLegacyAsset(state) {
                    const total = Math.round(state.housingHoldings.reduce((sum, item) => sum + item.currentValue, 0) * 10) / 10;
                    const existing = state.assets.find((asset) => asset.type === 'housing');
                    if (existing)
                        existing.value = total;
                    else if (total > 0)
                        state.assets.push({ type: 'housing', value: total });
                    state.assets = state.assets.filter((asset) => asset.type !== 'housing' || asset.value > 0);
                }
            };
            exports_1("HousingSystem", HousingSystem);
        }
    };
});












































System.register("chunks:///_virtual/IdentityConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var IDENTITIES, STARTER_FAMILY_IDS;
    var __moduleName = context_1 && context_1.id;
    function familyFlagsFor(identityId) {
        var _a, _b;
        return (_b = (_a = IDENTITIES.find((identity) => identity.id === identityId)) === null || _a === void 0 ? void 0 : _a.familyFlags) !== null && _b !== void 0 ? _b : [];
    }
    exports_1("familyFlagsFor", familyFlagsFor);
    return {
        setters: [],
        execute: function () {
            exports_1("IDENTITIES", IDENTITIES = [
                {
                    id: 'migrant-rural', name: '农村务工家庭', region: 'rural', difficulty: '较难', initiallyUnlocked: true,
                    opportunityFocus: '同乡、务工、技能培训与城市迁移', familyFlags: ['family-rural', 'family-labor-network', 'family-capital-low'],
                    initialFamilyResources: 5, familyAllowanceAnnual: 0.03, skillModifiers: { management: 6 }, attributeModifiers: {}, dynamicModifiers: {},
                },
                {
                    id: 'small-town', name: '小城普通家庭', region: 'county', difficulty: '标准', initiallyUnlocked: true,
                    opportunityFocus: '本地教育、稳定就业与生活服务', familyFlags: ['family-small-town', 'family-local-network', 'family-capital-low'],
                    initialFamilyResources: 10, familyAllowanceAnnual: 0.1, attributeModifiers: {}, dynamicModifiers: { happiness: 5 },
                },
                {
                    id: 'county-business', name: '县城个体家庭', region: 'county', difficulty: '标准偏波动', initiallyUnlocked: false,
                    unlockDescription: '完成一局人生，并达到商业45与总资产30万元。',
                    opportunityFocus: '店铺、货源、渠道、电商与县域物流', familyFlags: ['family-county-business', 'family-commerce', 'family-capital-middle'],
                    initialFamilyResources: 15, familyAllowanceAnnual: 0.18, attributeModifiers: {}, skillModifiers: { business: 8 }, dynamicModifiers: {},
                },
                {
                    id: 'metro-salaried', name: '大城市工薪家庭', region: 'metropolis', difficulty: '优势', initiallyUnlocked: false,
                    unlockDescription: '在一局人生中迁入大城市，并达到高级或核心职业层级。',
                    opportunityFocus: '城市教育、企业实习、科技岗位与职业跳槽', familyFlags: ['family-metro-salaried', 'family-corporate', 'family-capital-middle'],
                    initialFamilyResources: 15, familyAllowanceAnnual: 0.2, attributeModifiers: {}, skillModifiers: { information: 8 }, dynamicModifiers: {},
                },
                {
                    id: 'scholar-family', name: '知识分子家庭', region: 'city', difficulty: '优势', initiallyUnlocked: false,
                    unlockDescription: '在一局人生中进入985/研究生阶段，或同时达到知识85与学习70。',
                    opportunityFocus: '重点教育、高校科研、专业人士与成果转化', familyFlags: ['family-scholar', 'family-academic', 'family-capital-middle'],
                    initialFamilyResources: 10, familyAllowanceAnnual: 0.15, attributeModifiers: {}, skillModifiers: { learning: 4, information: 4 }, dynamicModifiers: {},
                },
                {
                    id: 'wealthy-business', name: '富裕经商家庭', region: 'metropolis', difficulty: '高优势', initiallyUnlocked: false,
                    unlockDescription: '达成创业传奇；或商业70、资产200万且成功进入至少3条机遇。',
                    opportunityFocus: '家族企业、供应链、股权投资与大额项目', familyFlags: ['family-wealthy-business', 'family-commerce', 'family-capital-high', 'family-credit-high'],
                    initialFamilyResources: 35, familyAllowanceAnnual: 1, attributeModifiers: {}, skillModifiers: { business: 5, information: 5 },
                },
            ]);
            exports_1("STARTER_FAMILY_IDS", STARTER_FAMILY_IDS = ['migrant-rural', 'small-town']);
        }
    };
});












































System.register("chunks:///_virtual/IndependentLifeEvents.ts",[], function (exports_1, context_1) {
    "use strict";
    var INDEPENDENT_LIFE_EVENTS, INDEPENDENT_LIFE_CONTENT_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("INDEPENDENT_LIFE_EVENTS", INDEPENDENT_LIFE_EVENTS = [
                {
                    id: 'career-first-job', title: '第一份正式工作', description: '完成大学阶段后，第一份工作决定初期收入结构、行业信息和可进入的后续路线。', yearMin: 2014, yearMax: 2016, weight: 110, forced: true, interaction: 'milestone',
                    options: [
                        { id: 'tech-job', label: '技术研发｜工资较高，技术行业信息', result: { career: { track: 'technology', level: 'junior', industry: '软件与互联网', workIntensity: 'normal', yearsAtLevel: 0 }, skills: { technology: 4 }, addFlags: ['career-started'] } },
                        { id: 'product-job', label: '产品运营｜项目奖金，用户与流量信息', result: { career: { track: 'product', level: 'junior', industry: '平台服务', workIntensity: 'normal', yearsAtLevel: 0 }, skills: { management: 3, business: 2 }, addFlags: ['career-started'] } },
                        { id: 'sales-job', label: '销售外贸｜底薪较低，订单佣金波动', result: { career: { track: 'sales', level: 'junior', industry: '销售与外贸', workIntensity: 'normal', yearsAtLevel: 0 }, skills: { business: 4, expression: 2 }, addFlags: ['career-started'] } },
                        { id: 'education-job', label: '教育研究｜收入稳定，长期知识积累', result: { career: { track: 'education', level: 'junior', industry: '教育与科研', workIntensity: 'normal', yearsAtLevel: 0 }, skills: { learning: 4, expression: 2 }, addFlags: ['career-started'] } },
                        { id: 'media-job', label: '内容传媒｜项目收入波动，注意力信息', result: { career: { track: 'media', level: 'junior', industry: '内容传媒', workIntensity: 'hard', yearsAtLevel: 0 }, stats: { pressure: 3 }, skills: { expression: 5 }, addFlags: ['career-started'] } },
                        { id: 'public-job', label: '公共服务｜收入稳定，公开政策视角', result: { career: { track: 'public-service', level: 'junior', industry: '公共服务', workIntensity: 'normal', yearsAtLevel: 0 }, skills: { management: 3, learning: 2 }, addFlags: ['career-started'] } },
                    ],
                },
                {
                    id: 'career-work-intensity', title: '工作节奏调整', description: '这一年度的投入会改变工资、能力、压力和健康，结果会进入年度现金流。', yearMin: 2014, yearMax: 2026, weight: 75, interaction: 'life-choice', prerequisites: ['flags.career-started'],
                    options: [
                        { id: 'balanced', label: '保持正常节奏', result: { career: { workIntensity: 'normal' }, stats: { pressure: 2 }, skills: { management: 1 } } },
                        { id: 'hard', label: '全力投入工作', result: { career: { workIntensity: 'hard' }, stats: { pressure: 7, health: -2 }, attributes: { execution: 2 } } },
                        { id: 'rest', label: '降低强度，保留生活空间', result: { career: { workIntensity: 'relaxed' }, stats: { pressure: -4, happiness: 4, health: 1 } } },
                    ],
                },
                {
                    id: 'relationship-family', title: '家人需要照顾', description: '家人遇到健康和生活困难。不同方式会消耗不同的时间、现金和情绪。', yearMin: 2016, yearMax: 2032, weight: 70, interaction: 'life-choice',
                    options: [
                        { id: 'accompany', label: '亲自回家陪伴｜现金-2万', result: { stats: { familyBond: 8, happiness: 5, funds: -2, pressure: -3 } } },
                        { id: 'care-service', label: '安排照护并定期探望｜现金-6万', result: { skills: { management: 3 }, stats: { familyBond: 4, funds: -6, pressure: -7, health: 2 } } },
                        { id: 'brief', label: '只能短暂探望', result: { stats: { familyBond: 1, happiness: -2 }, skills: { management: 1 } } },
                    ],
                },
                {
                    id: 'health-burnout', title: '身体发出的信号', description: '连续高压后，你需要在收入和健康之间做出明确安排。', yearMin: 2017, yearMax: 2045, weight: 65, interaction: 'life-choice', prerequisites: ['stats.health<75'],
                    options: [
                        { id: 'exercise', label: '体检并建立运动计划｜现金-5万', result: { stats: { funds: -5, health: 7, pressure: -6 }, addFlags: ['health-routine'] } },
                        { id: 'push-through', label: '继续保持高强度工作', result: { stats: { health: -6, pressure: 8 }, attributes: { execution: 2 } } },
                    ],
                },
            ]);
            exports_1("INDEPENDENT_LIFE_CONTENT_EVENTS", INDEPENDENT_LIFE_CONTENT_EVENTS = []);
        }
    };
});












































System.register("chunks:///_virtual/IndustryOpportunityEvents.ts",["./IndustryProjectConfig.ts"], function (exports_1, context_1) {
    "use strict";
    var IndustryProjectConfig_1, INDUSTRY_OPPORTUNITY_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (IndustryProjectConfig_1_1) {
                IndustryProjectConfig_1 = IndustryProjectConfig_1_1;
            }
        ],
        execute: function () {
            exports_1("INDUSTRY_OPPORTUNITY_EVENTS", INDUSTRY_OPPORTUNITY_EVENTS = IndustryProjectConfig_1.INDUSTRY_PROJECTS.map((project) => ({
                id: `industry-opportunity-${project.id}`,
                title: `${project.industry}｜${project.name}`,
                description: `${project.description} 当前进入年份会直接影响后续估值；越接近拥挤期，回报越不确定。最低投入 ¥${(project.minimumInvestment * 10000).toLocaleString('zh-CN')}，风险 ${project.risk}。`,
                yearMin: project.yearMin,
                yearMax: project.yearMax,
                weight: project.yearMin <= 2026 ? 72 : 64,
                interaction: 'opportunity',
                declineAllowed: true,
                options: [
                    {
                        id: 'invest',
                        label: `投入 ${project.minimumInvestment} 万元并建立项目持仓`,
                        result: {
                            projectInvestment: { projectId: project.id, amount: project.minimumInvestment },
                            stats: { pressure: project.risk === '高' ? 4 : 2 },
                            skills: { business: 2, information: 2 },
                            addFlags: [`industry-invested-${project.id}`],
                        },
                    },
                    {
                        id: 'research',
                        label: '暂不投入，记录行业和风险',
                        result: { skills: { information: 3 }, stats: { pressure: -1 }, addFlags: [`industry-researched-${project.id}`] },
                    },
                ],
            })));
        }
    };
});












































System.register("chunks:///_virtual/IndustryProjectConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var INDUSTRY_PROJECTS;
    var __moduleName = context_1 && context_1.id;
    function industryProject(id) {
        const item = INDUSTRY_PROJECTS.find((candidate) => candidate.id === id);
        if (!item)
            throw new Error('未找到对应的行业项目。');
        return item;
    }
    exports_1("industryProject", industryProject);
    return {
        setters: [],
        execute: function () {
            exports_1("INDUSTRY_PROJECTS", INDUSTRY_PROJECTS = [
                { id: 'online-retail-fulfillment', name: '区域网店仓配中心', industry: '电子商务与物流', description: '为早期网店提供仓储、包装和跨城发货。', yearMin: 2010, idealUntil: 2013, crowdedFrom: 2016, yearMax: 2020, minimumInvestment: 10, growthRate: .22, matureRate: .07, declineRate: -.08, risk: '中' },
                { id: 'smartphone-app-studio', name: '智能手机应用工作室', industry: '移动互联网', description: '开发工具、生活服务和移动内容应用。', yearMin: 2010, idealUntil: 2014, crowdedFrom: 2017, yearMax: 2021, minimumInvestment: 15, growthRate: .26, matureRate: .05, declineRate: -.16, risk: '高' },
                { id: 'mobile-payment-service', name: '商户移动支付服务', industry: '金融科技', description: '帮助线下商户接入移动支付和数字化账务。', yearMin: 2013, idealUntil: 2016, crowdedFrom: 2019, yearMax: 2023, minimumInvestment: 20, growthRate: .20, matureRate: .06, declineRate: -.10, risk: '中' },
                { id: 'local-delivery-platform', name: '本地生活配送平台', industry: 'O2O本地服务', description: '依靠补贴和运力连接餐饮商户与消费者。', yearMin: 2014, idealUntil: 2015, crowdedFrom: 2017, yearMax: 2020, minimumInvestment: 20, growthRate: .30, matureRate: -.02, declineRate: -.28, risk: '高' },
                { id: 'cross-border-brand', name: '跨境消费品牌', industry: '跨境零售', description: '围绕细分消费品打造出海品牌与供应链。', yearMin: 2015, idealUntil: 2019, crowdedFrom: 2023, yearMax: 2030, minimumInvestment: 18, growthRate: .19, matureRate: .06, declineRate: -.11, risk: '高' },
                { id: 'short-video-studio', name: '短视频内容工作室', industry: '内容传媒', description: '通过短视频、广告和直播建立内容品牌。', yearMin: 2016, idealUntil: 2019, crowdedFrom: 2022, yearMax: 2028, minimumInvestment: 12, growthRate: .24, matureRate: .08, declineRate: -.12, risk: '高' },
                { id: 'battery-materials-line', name: '动力电池材料产线', industry: '新能源', description: '为新能源汽车产业链提供电池材料和回收服务。', yearMin: 2017, idealUntil: 2021, crowdedFrom: 2024, yearMax: 2032, minimumInvestment: 40, growthRate: .23, matureRate: .04, declineRate: -.18, risk: '高' },
                { id: 'chip-equipment-supplier', name: '半导体设备供应商', industry: '半导体', description: '提供设备零部件、检测和工程服务，研发周期较长。', yearMin: 2018, idealUntil: 2025, crowdedFrom: 2032, yearMax: 2040, minimumInvestment: 35, growthRate: .18, matureRate: .09, declineRate: -.08, risk: '高' },
                { id: 'remote-collaboration-suite', name: '远程协作软件', industry: '云服务', description: '为企业提供远程办公和在线协作工具。', yearMin: 2020, idealUntil: 2021, crowdedFrom: 2023, yearMax: 2027, minimumInvestment: 18, growthRate: .28, matureRate: .02, declineRate: -.22, risk: '高' },
                { id: 'pet-health-chain', name: '宠物健康服务连锁', industry: '宠物经济', description: '结合宠物医疗、保险、护理与社区服务。', yearMin: 2021, idealUntil: 2027, crowdedFrom: 2032, yearMax: 2040, minimumInvestment: 16, growthRate: .16, matureRate: .08, declineRate: -.07, risk: '中' },
                { id: 'vertical-ai-service', name: '垂直行业AI服务', industry: '人工智能', description: '把生成式AI用于企业流程、客服和专业生产。', yearMin: 2022, idealUntil: 2028, crowdedFrom: 2033, yearMax: 2042, minimumInvestment: 25, growthRate: .22, matureRate: .08, declineRate: -.12, risk: '高' },
                { id: 'low-altitude-operations', name: '低空设备运维服务', industry: '低空经济', description: '提供无人机检测、维修、调度和行业运营。', yearMin: 2024, idealUntil: 2030, crowdedFrom: 2036, yearMax: 2045, minimumInvestment: 30, growthRate: .17, matureRate: .08, declineRate: -.10, risk: '高' },
                { id: 'industrial-agent-platform', name: '工业智能体平台', industry: '企业智能化', description: '将智能体接入生产、供应链和企业决策。', yearMin: 2027, idealUntil: 2034, crowdedFrom: 2040, yearMax: 2048, minimumInvestment: 30, growthRate: .18, matureRate: .07, declineRate: -.12, risk: '高' },
                { id: 'circular-materials-service', name: '循环材料服务网络', industry: '循环经济', description: '为制造业回收、分拣与再利用关键材料。', yearMin: 2028, idealUntil: 2036, crowdedFrom: 2044, yearMax: 2053, minimumInvestment: 26, growthRate: .15, matureRate: .08, declineRate: -.06, risk: '中' },
                { id: 'distributed-storage-network', name: '分布式储能网络', industry: '能源基础设施', description: '聚合工商业储能并参与电力调度。', yearMin: 2029, idealUntil: 2037, crowdedFrom: 2045, yearMax: 2055, minimumInvestment: 45, growthRate: .16, matureRate: .08, declineRate: -.07, risk: '中' },
                { id: 'active-aging-service', name: '主动养老服务平台', industry: '银发经济', description: '围绕居住、照护、康复和文化生活提供长期服务。', yearMin: 2031, idealUntil: 2040, crowdedFrom: 2050, yearMax: 2062, minimumInvestment: 22, growthRate: .14, matureRate: .09, declineRate: -.05, risk: '中' },
                { id: 'robot-maintenance-network', name: '机器人维护网络', industry: '机器人服务', description: '为家庭和企业机器人提供维修、零件和升级。', yearMin: 2034, idealUntil: 2042, crowdedFrom: 2050, yearMax: 2060, minimumInvestment: 28, growthRate: .17, matureRate: .08, declineRate: -.09, risk: '中' },
                { id: 'digital-therapy-platform', name: '数字疗愈服务平台', industry: '健康科技', description: '将心理支持、慢病随访与数字工具整合为长期服务。', yearMin: 2035, idealUntil: 2043, crowdedFrom: 2051, yearMax: 2061, minimumInvestment: 24, growthRate: .15, matureRate: .08, declineRate: -.08, risk: '中' },
                { id: 'bio-manufacturing-materials', name: '生物制造材料项目', industry: '生物制造', description: '利用生物工艺生产新材料，审批和研发风险较高。', yearMin: 2037, idealUntil: 2045, crowdedFrom: 2053, yearMax: 2064, minimumInvestment: 40, growthRate: .19, matureRate: .07, declineRate: -.15, risk: '高' },
                { id: 'climate-adaptation-engineering', name: '气候适应工程服务', industry: '城市韧性', description: '为城市提供防灾、节水、降温和基础设施改造。', yearMin: 2041, idealUntil: 2050, crowdedFrom: 2058, yearMax: 2070, minimumInvestment: 35, growthRate: .14, matureRate: .08, declineRate: -.05, risk: '中' },
                { id: 'precision-agriculture-network', name: '精准农业服务网络', industry: '农业科技', description: '为农业生产提供传感、智能设备和产销协同服务。', yearMin: 2043, idealUntil: 2052, crowdedFrom: 2060, yearMax: 2072, minimumInvestment: 24, growthRate: .14, matureRate: .08, declineRate: -.05, risk: '中' },
                { id: 'urban-renewal-services', name: '老城更新综合服务', industry: '城市更新', description: '参与老旧社区改造、适老化和公共设施运营。', yearMin: 2046, idealUntil: 2055, crowdedFrom: 2063, yearMax: 2072, minimumInvestment: 30, growthRate: .13, matureRate: .07, declineRate: -.04, risk: '中' },
                { id: 'longevity-health-management', name: '长期健康管理网络', industry: '健康服务', description: '围绕慢病管理、康复和个体化健康建立持续服务。', yearMin: 2051, idealUntil: 2060, crowdedFrom: 2068, yearMax: 2072, minimumInvestment: 25, growthRate: .13, matureRate: .08, declineRate: -.04, risk: '中' },
                { id: 'succession-advisory', name: '家业传承顾问服务', industry: '专业服务', description: '帮助家庭企业完成治理、接班和资产安排。', yearMin: 2058, idealUntil: 2066, crowdedFrom: 2070, yearMax: 2072, minimumInvestment: 20, growthRate: .12, matureRate: .07, declineRate: -.03, risk: '中' },
                { id: 'regional-cold-chain', name: '区域冷链仓储网络', industry: '供应链基础设施', description: '为区域食品、生鲜和医药配送提供仓储与温控服务。', yearMin: 2022, idealUntil: 2030, crowdedFrom: 2038, yearMax: 2045, minimumInvestment: 120, scale: 'growth', growthRate: .18, matureRate: .08, declineRate: -.08, risk: '中' },
                { id: 'chain-health-centers', name: '连锁健康服务中心', industry: '医疗服务', description: '布局城市社区健康、康复与长期照护服务。', yearMin: 2027, idealUntil: 2036, crowdedFrom: 2045, yearMax: 2055, minimumInvestment: 360, scale: 'growth', growthRate: .16, matureRate: .09, declineRate: -.08, risk: '中' },
                { id: 'edge-compute-campus', name: '边缘算力园区', industry: '数字基础设施', description: '为企业和城市服务提供分布式算力与能源协同。', yearMin: 2028, idealUntil: 2037, crowdedFrom: 2046, yearMax: 2058, minimumInvestment: 900, scale: 'expansion', growthRate: .22, matureRate: .10, declineRate: -.15, risk: '高' },
                { id: 'energy-storage-operator', name: '区域储能运营商', industry: '能源基础设施', description: '建设并运营工商业储能，收入与电力市场价格相关。', yearMin: 2031, idealUntil: 2041, crowdedFrom: 2050, yearMax: 2062, minimumInvestment: 1800, scale: 'expansion', growthRate: .19, matureRate: .09, declineRate: -.10, risk: '中' },
                { id: 'urban-renewal-consortium', name: '城市更新综合体', industry: '城市更新', description: '参与旧城改造、公共服务与长期租赁资产运营。', yearMin: 2036, idealUntil: 2048, crowdedFrom: 2058, yearMax: 2070, minimumInvestment: 6200, scale: 'strategic', growthRate: .15, matureRate: .08, declineRate: -.06, risk: '中' },
                { id: 'national-green-grid', name: '绿色电网协同平台', industry: '能源网络', description: '大型跨区域能源调度和基础设施运营机会。', yearMin: 2043, idealUntil: 2055, crowdedFrom: 2065, yearMax: 2072, minimumInvestment: 10000, scale: 'strategic', growthRate: .14, matureRate: .07, declineRate: -.05, risk: '中' },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/IndustryProjectSystem.ts",["./IndustryProjectConfig.ts", "./WealthSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var IndustryProjectConfig_1, WealthSystem_1, IndustryProjectSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (IndustryProjectConfig_1_1) {
                IndustryProjectConfig_1 = IndustryProjectConfig_1_1;
            },
            function (WealthSystem_1_1) {
                WealthSystem_1 = WealthSystem_1_1;
            }
        ],
        execute: function () {
            IndustryProjectSystem = class IndustryProjectSystem {
                listings(state) {
                    return state.projectMarket.listingProjectIds.map((id) => IndustryProjectConfig_1.industryProject(id));
                }
                refreshListings(state, random) {
                    if (state.age < 18 || state.projectMarket.lastRefreshYear === state.year)
                        return [];
                    state.projectMarket.lastRefreshYear = state.year;
                    state.projectMarket.listingProjectIds = [];
                    state.projectMarket.unreadProjectIds = [];
                    const accessibleCapital = Math.max(100, WealthSystem_1.totalAssetValue(state) * 3 + Math.max(0, state.finance.loanLimit - state.finance.loanBalance));
                    const candidates = IndustryProjectConfig_1.INDUSTRY_PROJECTS.filter((item) => state.year >= item.yearMin && state.year <= item.yearMax
                        && !state.projectMarket.seenProjectIds.includes(item.id)
                        && !state.industryProjects.some((holding) => holding.projectId === item.id)
                        && item.minimumInvestment <= accessibleCapital);
                    if (candidates.length === 0 || random.next() < .25)
                        return [];
                    const count = random.int(1, Math.min(2, candidates.length));
                    const selected = [...candidates].sort((left, right) => this.listingWeight(right, state) - this.listingWeight(left, state) + random.next() - .5).slice(0, count);
                    const ids = selected.map((item) => item.id);
                    state.projectMarket.listingProjectIds = ids;
                    state.projectMarket.unreadProjectIds = [...ids];
                    state.projectMarket.seenProjectIds.push(...ids);
                    return ids;
                }
                markListingsRead(state) { state.projectMarket.unreadProjectIds = []; }
                hasUnreadListings(state) { return state.projectMarket.unreadProjectIds.length > 0; }
                phase(project, year) {
                    if (year <= project.yearMin + 1)
                        return '萌芽';
                    if (year <= project.idealUntil)
                        return '上升';
                    if (year < project.crowdedFrom)
                        return '火热';
                    if (year <= project.yearMax)
                        return '拥挤';
                    return '衰退';
                }
                scaleName(project) {
                    var _a;
                    const scale = (_a = project.scale) !== null && _a !== void 0 ? _a : (project.minimumInvestment < 100 ? 'small' : project.minimumInvestment < 500 ? 'growth' : project.minimumInvestment < 2000 ? 'expansion' : 'strategic');
                    return ({ small: '小型项目', growth: '成长型项目', expansion: '扩张型项目', strategic: '战略型项目' })[scale];
                }
                annualCashflowRange(project, year) {
                    const phase = this.phase(project, year);
                    const rates = phase === '萌芽' ? [-.08, .04] : phase === '上升' ? [.02, .12] : phase === '火热' ? [.06, .18] : phase === '拥挤' ? [-.04, .08] : [-.12, .02];
                    return { min: this.roundMoney(project.minimumInvestment * rates[0]), max: this.roundMoney(project.minimumInvestment * rates[1]) };
                }
                invest(state, projectId, amount) {
                    const project = IndustryProjectConfig_1.industryProject(projectId);
                    if (state.age < 18)
                        throw new Error('年满18岁后才能以本人名义投资行业项目。');
                    if (!state.projectMarket.listingProjectIds.includes(projectId))
                        throw new Error('该项目报价已经失效，请等待新的项目市场刷新。');
                    if (state.industryProjects.filter((item) => item.status === 'active').length >= IndustryProjectSystem.MAX_ACTIVE_PROJECTS)
                        throw new Error('最多同时持有5个项目，请先出售一个项目。');
                    if (state.industryProjects.some((item) => item.projectId === projectId))
                        throw new Error('这个项目在本局中已经出现过。');
                    if (Math.abs(amount - project.minimumInvestment) > .001)
                        throw new Error(`买断价格为 ¥${(project.minimumInvestment * 10000).toLocaleString('zh-CN')}。`);
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
                        lastAnnualCashflow: 0,
                        cumulativeCashflow: 0,
                        lastValuationRate: 0,
                        lastChangeReason: `${this.phase(project, state.year)}期买入`,
                    };
                    state.industryProjects.push(holding);
                    state.projectMarket.listingProjectIds = state.projectMarket.listingProjectIds.filter((id) => id !== projectId);
                    state.projectMarket.unreadProjectIds = state.projectMarket.unreadProjectIds.filter((id) => id !== projectId);
                    return holding;
                }
                settleYear(state) {
                    var _a;
                    const active = state.industryProjects.filter((item) => item.status === 'active');
                    const forecastOperatingCashflow = active.reduce((sum, holding) => { var _a; return sum + ((_a = holding.lastAnnualCashflow) !== null && _a !== void 0 ? _a : 0); }, 0);
                    let totalOperatingCashflow = 0;
                    for (const holding of active) {
                        const config = IndustryProjectConfig_1.industryProject(holding.projectId);
                        const baseRate = state.year <= config.idealUntil
                            ? config.growthRate
                            : state.year < config.crowdedFrom
                                ? config.matureRate
                                : config.declineRate;
                        const lateEntryPenalty = holding.startYear >= config.crowdedFrom ? -.08 : 0;
                        const variance = state.year <= 2026 ? 0 : this.deterministicVariance(state.seed, holding.projectId, state.year, config.risk);
                        const rate = Math.max(-.65, baseRate + lateEntryPenalty + variance);
                        const phase = this.phase(config, state.year);
                        const cashflowBase = phase === '萌芽' ? -.02 : phase === '上升' ? .06 : phase === '火热' ? .11 : phase === '拥挤' ? .02 : -.06;
                        const operatingCashflow = this.roundMoney(holding.investedPrincipal * (cashflowBase + variance * .25));
                        holding.lastAnnualCashflow = operatingCashflow;
                        holding.cumulativeCashflow = this.roundMoney(((_a = holding.cumulativeCashflow) !== null && _a !== void 0 ? _a : 0) + operatingCashflow);
                        holding.lastValuationRate = Math.round(rate * 1000) / 1000;
                        holding.lastChangeReason = `${phase}期${baseRate >= .1 ? '需求增长' : baseRate >= 0 ? '经营趋稳' : '竞争加剧'}${lateEntryPenalty < 0 ? '，入场偏晚' : ''}`;
                        totalOperatingCashflow += operatingCashflow;
                        holding.currentValue = Math.max(0, Math.round(holding.currentValue * (1 + rate) * 10) / 10);
                        if (holding.currentValue <= holding.investedPrincipal * .08) {
                            const salvage = this.roundMoney(holding.investedPrincipal * .1);
                            state.stats.funds = this.roundMoney(state.stats.funds + salvage);
                            holding.currentValue = 0;
                            holding.realizedReturn = this.roundMoney(salvage + holding.cumulativeCashflow - holding.investedPrincipal);
                            holding.lastChangeReason = '经营失败，回收一成残值';
                            holding.status = 'failed';
                        }
                    }
                    const adjustment = this.roundMoney(totalOperatingCashflow - forecastOperatingCashflow);
                    state.stats.funds = this.roundMoney(state.stats.funds + adjustment);
                    if (Math.abs(adjustment) > .001)
                        this.addCashflowToLatestRecord(state, adjustment);
                }
                exit(state, holdingId, distressed = false) {
                    var _a;
                    const holding = state.industryProjects.find((item) => item.id === holdingId);
                    if (!holding || holding.status !== 'active')
                        throw new Error('该项目当前无法退出。');
                    const proceeds = Math.max(0, Math.round(holding.currentValue * (distressed ? .6 : .7) * 100) / 100);
                    state.stats.funds = this.roundMoney(state.stats.funds + proceeds);
                    holding.realizedReturn = this.roundMoney(proceeds + ((_a = holding.cumulativeCashflow) !== null && _a !== void 0 ? _a : 0) - holding.investedPrincipal);
                    holding.lastChangeReason = distressed ? '流动性危机中以估值六折变卖' : '主动退出，以估值七折变卖';
                    holding.status = 'exited';
                    return holding;
                }
                acceptAcquisition(state, holdingId, multiplier) {
                    const holding = state.industryProjects.find((item) => item.id === holdingId);
                    if (!holding || holding.status !== 'active')
                        throw new Error('该项目已经无法接受收购。');
                    const proceeds = this.roundMoney(holding.currentValue * multiplier);
                    state.stats.funds = this.roundMoney(state.stats.funds + proceeds);
                    holding.realizedReturn = this.roundMoney(proceeds + holding.cumulativeCashflow - holding.investedPrincipal);
                    holding.status = 'exited';
                    holding.lastChangeReason = `接受 ${multiplier.toFixed(2)} 倍估值收购`;
                    return holding;
                }
                deterministicVariance(seed, id, year, risk) {
                    let hash = (seed ^ year) >>> 0;
                    for (const char of id)
                        hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
                    const normalized = (hash % 10001) / 10000 - .5;
                    return normalized * (risk === '高' ? .24 : .12);
                }
                listingWeight(project, state) {
                    const capital = Math.max(1, WealthSystem_1.totalAssetValue(state));
                    const ratio = project.minimumInvestment / capital;
                    return Math.max(.1, 1.6 - Math.abs(Math.log10(Math.max(.1, ratio))));
                }
                addCashflowToLatestRecord(state, cashflow) {
                    var _a;
                    const record = [...state.finance.history].reverse().find((item) => item.year === state.year);
                    state.finance.lastCashflow = this.roundMoney(state.finance.lastCashflow + cashflow);
                    if (!record)
                        return;
                    record.projectIncome = this.roundMoney(((_a = record.projectIncome) !== null && _a !== void 0 ? _a : 0) + cashflow);
                    record.otherIncome = this.roundMoney(record.otherIncome + cashflow);
                    record.netCashflow = this.roundMoney(record.netCashflow + cashflow);
                    record.closingCash = this.roundMoney(state.stats.funds);
                }
                roundMoney(value) { return Math.round(value * 100) / 100; }
            };
            exports_1("IndustryProjectSystem", IndustryProjectSystem);
            IndustryProjectSystem.MAX_ACTIVE_PROJECTS = 5;
        }
    };
});












































System.register("chunks:///_virtual/InheritanceConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var INHERITANCE_REWARDS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("INHERITANCE_REWARDS", INHERITANCE_REWARDS = [
                { id: 'legacy-learning', name: '学习传承', description: '下一局学习能力 +3。', result: { skills: { learning: 3 } } },
                { id: 'legacy-information', name: '信息传承', description: '下一局信息能力 +3。', result: { skills: { information: 3 } } },
                { id: 'legacy-health', name: '健康传承', description: '下一局初始健康 +5。', result: { stats: { health: 5 } } },
                { id: 'legacy-family', name: '温暖传承', description: '下一局初始幸福 +5。', result: { stats: { happiness: 5 }, addFlags: ['family-time'] } },
                { id: 'legacy-execution', name: '行动传承', description: '下一局管理能力 +2。', result: { skills: { management: 2 } } },
                { id: 'legacy-funds', name: '资源传承', description: '下一局个人资金 +5。', result: { stats: { funds: 5 } } },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/InvestmentMemoryManager.ts",["cc"], function (exports_1, context_1) {
    "use strict";
    var cc_1, INVESTMENT_MEMORY_KEY, InvestmentMemoryManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            }
        ],
        execute: function () {
            INVESTMENT_MEMORY_KEY = 'restart-life.investment-insights.v1';
            InvestmentMemoryManager = class InvestmentMemoryManager {
                load() {
                    var _a;
                    try {
                        const value = JSON.parse((_a = cc_1.sys.localStorage.getItem(INVESTMENT_MEMORY_KEY)) !== null && _a !== void 0 ? _a : '[]');
                        return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];
                    }
                    catch (_b) {
                        return [];
                    }
                }
                remember(ids) {
                    const merged = [...new Set([...this.load(), ...ids])];
                    cc_1.sys.localStorage.setItem(INVESTMENT_MEMORY_KEY, JSON.stringify(merged));
                    return merged;
                }
            };
            exports_1("InvestmentMemoryManager", InvestmentMemoryManager);
        }
    };
});












































System.register("chunks:///_virtual/LaterLifeEvents.ts",[], function (exports_1, context_1) {
    "use strict";
    var LATER_LIFE_EVENTS, LATER_LIFE_CONTENT_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("LATER_LIFE_EVENTS", LATER_LIFE_EVENTS = [
                { id: 'later-professional-track', title: '专业路线还是管理路线', description: '工作经验已经形成，你需要确定下一阶段主要依靠专业深度还是组织管理。', yearMin: 2027, yearMax: 2035, weight: 80, interaction: 'life-choice', prerequisites: ['flags.career-started'], options: [
                        { id: 'expert', label: '继续深耕专业', result: { skills: { technology: 5, learning: 3 }, stats: { pressure: 2 } } },
                        { id: 'manager', label: '转向团队管理', result: { skills: { management: 6, expression: 2 }, stats: { pressure: 4 } } },
                    ] },
                { id: 'later-career-transition', title: '行业增长开始放缓', description: '原行业的增长空间收窄。转型需要重新学习，留下则能利用既有经验。', yearMin: 2033, yearMax: 2042, weight: 72, interaction: 'life-choice', prerequisites: ['flags.career-started'], options: [
                        { id: 'reskill', label: '投入一年学习新方向', result: { skills: { learning: 5, information: 4, technology: 3 }, stats: { pressure: 4, happiness: -1 } } },
                        { id: 'stay', label: '利用经验提高效率', result: { skills: { management: 4 }, stats: { pressure: -2, happiness: 2 } } },
                    ] },
                { id: 'later-parent-care', title: '父母进入长期照护阶段', description: '照护不再是一次探望，而是持续的时间和现金安排。', yearMin: 2036, yearMax: 2048, weight: 76, interaction: 'life-choice', options: [
                        { id: 'time', label: '减少工作，承担主要照护', result: { stats: { familyBond: 10, happiness: 4, pressure: -2, funds: -4 } } },
                        { id: 'service', label: '购买长期照护服务｜现金-12万', result: { stats: { familyBond: 5, funds: -12, pressure: -8, health: 3 }, skills: { management: 3 } } },
                    ] },
                { id: 'later-midlife-health', title: '中年健康检查', description: '体检指标提示长期工作方式需要调整，继续透支会影响之后的承受力。', yearMin: 2040, yearMax: 2050, weight: 82, interaction: 'life-choice', prerequisites: ['stats.health<75'], options: [
                        { id: 'change', label: '系统治疗并降低强度｜现金-8万', result: { stats: { funds: -8, health: 10, pressure: -7, happiness: 3 }, } },
                        { id: 'delay', label: '暂时只做基础干预｜现金-2万', result: { stats: { funds: -2, health: 3, pressure: -2 } } },
                    ] },
                { id: 'later-second-career', title: '第二职业的入口', description: '多年经验可以转化为咨询、教学或独立服务，但收入稳定性会下降。', yearMin: 2046, yearMax: 2058, weight: 68, interaction: 'opportunity', declineAllowed: true, prerequisites: ['career.level==core'], options: [
                        { id: 'consult', label: '建立专业咨询业务', result: { skills: { expression: 5, business: 4, management: 3 }, stats: { pressure: 3 }, addFlags: ['second-career-consulting'] } },
                        { id: 'teach', label: '把经验转化为课程', result: { skills: { expression: 6, learning: 3 }, stats: { happiness: 4 }, addFlags: ['second-career-teaching'] } },
                    ] },
                { id: 'later-successor', title: '经验交接', description: '年轻同事开始承担主力工作。你可以系统传授方法，也可以把精力留给自己的下一阶段。', yearMin: 2051, yearMax: 2062, weight: 65, interaction: 'life-choice', options: [
                        { id: 'teach', label: '完成系统交接', result: { skills: { expression: 4, management: 4 }, stats: { happiness: 4 }, addFlags: ['mentor-legacy'] } },
                        { id: 'personal', label: '逐步减少职业责任', result: { stats: { health: 5, pressure: -6, happiness: 3 } } },
                    ] },
                { id: 'later-retirement-plan', title: '退休现金流安排', description: '工资收入将逐步下降，需要在现金储备、资产风险和生活质量之间重新平衡。', yearMin: 2056, yearMax: 2066, weight: 85, interaction: 'milestone', forced: true, options: [
                        { id: 'stable', label: '降低风险，保留三年生活现金', result: { stats: { pressure: -5, happiness: 2 }, skills: { information: 2 }, addFlags: ['retirement-stable'] } },
                        { id: 'active', label: '保留部分经营和投资', result: { skills: { business: 3, information: 3 }, stats: { pressure: 3 }, addFlags: ['retirement-active'] } },
                    ] },
                { id: 'later-housing-choice', title: '晚年住房选择', description: '当前住房的维护、医疗便利和家人距离开始比面积更重要。', yearMin: 2061, yearMax: 2070, weight: 70, interaction: 'life-choice', options: [
                        { id: 'accessible', label: '为适老化投入｜现金-10万', result: { stats: { funds: -10, health: 5, happiness: 4 }, addFlags: ['accessible-home'] } },
                        { id: 'remain', label: '继续住在熟悉的地方', result: { stats: { familyBond: 3, happiness: 3, pressure: -2 } } },
                    ] },
                { id: 'later-life-record', title: '整理一生的经验', description: '接近人生终点时，你决定如何保存自己的判断、经历和遗憾。', yearMin: 2067, yearMax: 2072, weight: 95, interaction: 'milestone', forced: true, options: [
                        { id: 'record', label: '整理成完整的人生档案', result: { stats: { happiness: 5 }, skills: { expression: 3 }, addFlags: ['life-archive-complete'] } },
                        { id: 'family', label: '把时间留给家人', result: { stats: { familyBond: 8, happiness: 7, pressure: -4 }, addFlags: ['life-family-finale'] } },
                    ] },
            ]);
            exports_1("LATER_LIFE_CONTENT_EVENTS", LATER_LIFE_CONTENT_EVENTS = [
                { id: 'later-advisory-contract', title: '经验开始变现', description: '有人希望把你的行业经验转化为长期顾问服务。收入更稳定，但会占用一部分生活节奏。', yearMin: 2037, yearMax: 2062, weight: 44, repeatable: true, interaction: 'opportunity', declineAllowed: true, prerequisites: ['flags.career-started'], options: [
                        { id: 'accept', label: '接下顾问合约｜现金+6万', result: { stats: { funds: 6, pressure: 3 }, skills: { management: 2, expression: 2 }, addFlags: ['advisory-experience'] } },
                        { id: 'decline', label: '保留时间给自己', result: { stats: { happiness: 3, pressure: -2 } } },
                    ] },
                { id: 'later-asset-rebalance', title: '资产配置需要调整', description: '新的利率和行业周期让旧配置不再舒服。你可以提高流动性，或继续承担波动。', yearMin: 2038, yearMax: 2062, weight: 38, repeatable: true, interaction: 'life-choice', options: [
                        { id: 'liquid', label: '保留更多现金', result: { stats: { happiness: 2, pressure: -3 }, addFlags: ['rebalance-liquid'] } },
                        { id: 'risk', label: '维持进攻配置', result: { skills: { business: 2, information: 2 }, stats: { pressure: 3 } } },
                    ] },
                { id: 'later-community-project', title: '社区更新邀约', description: '熟悉的社区需要有人整合资源。它未必带来高收益，却可能留下长期影响。', yearMin: 2045, yearMax: 2063, weight: 36, repeatable: true, interaction: 'life-choice', options: [
                        { id: 'join', label: '投入时间支持项目', result: { skills: { management: 3, expression: 2 }, stats: { happiness: 4, pressure: 2 }, addFlags: ['community-contribution'] } },
                        { id: 'pass', label: '暂时婉拒', result: { stats: { pressure: -1 } } },
                    ] },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/LegacyManager.ts",["cc"], function (exports_1, context_1) {
    "use strict";
    var cc_1, LEGACY_KEY, LegacyManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            }
        ],
        execute: function () {
            LEGACY_KEY = 'restart-life.inheritance.v1';
            LegacyManager = class LegacyManager {
                save(reward) { cc_1.sys.localStorage.setItem(LEGACY_KEY, JSON.stringify(reward)); }
                load() {
                    const raw = cc_1.sys.localStorage.getItem(LEGACY_KEY);
                    if (!raw)
                        return undefined;
                    try {
                        return JSON.parse(raw);
                    }
                    catch (_a) {
                        return undefined;
                    }
                }
            };
            exports_1("LegacyManager", LegacyManager);
        }
    };
});












































System.register("chunks:///_virtual/CashManagementSystem.ts",[], function (exports_1, context_1) {
    "use strict";
    var CASH_PRODUCTS, CashManagementSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("CASH_PRODUCTS", CASH_PRODUCTS = [
                { kind: 'term-deposit', name: '1年定期存款', years: 1, annualRate: .018, risk: '低', description: '到期返还本金与利息；提前取出按活期利率结算。' },
                { kind: 'term-deposit', name: '3年定期存款', years: 3, annualRate: .026, risk: '低', description: '锁定较高利率；提前取出按活期利率结算。' },
                { kind: 'term-deposit', name: '5年定期存款', years: 5, annualRate: .032, risk: '低', description: '期限最长、收益最高，适合长期不用的现金。' },
                { kind: 'wealth-management', name: '稳健固收理财', years: 2, annualRate: .048, risk: '中', description: '非保本产品，到期收益更高，也会受随机信用事件影响。' },
            ]);
            CashManagementSystem = class CashManagementSystem {
                initial() { return { demandBalance: 0, demandRate: .006, holdings: [], lastAnnualIncome: 0 }; }
                products() { return CASH_PRODUCTS; }
                depositDemand(state, amount) {
                    this.requireAdult(state);
                    const value = this.round(amount);
                    if (value <= 0 || state.stats.funds + .001 < value)
                        throw new Error('现金不足，无法转入活期。');
                    state.stats.funds = this.round(state.stats.funds - value);
                    state.cashManagement.demandBalance = this.round(state.cashManagement.demandBalance + value);
                }
                withdrawDemand(state, amount) {
                    const value = this.round(amount);
                    if (value <= 0 || state.cashManagement.demandBalance + .001 < value)
                        throw new Error('活期余额不足。');
                    state.cashManagement.demandBalance = this.round(state.cashManagement.demandBalance - value);
                    state.stats.funds = this.round(state.stats.funds + value);
                }
                purchase(state, name, amount) {
                    this.requireAdult(state);
                    const product = CASH_PRODUCTS.find((item) => item.name === name);
                    if (!product)
                        throw new Error('未找到该现金管理产品。');
                    const principal = this.round(amount);
                    if (principal < 1)
                        throw new Error('单笔定期或理财至少需要 ¥10,000。');
                    if (state.stats.funds + .001 < principal)
                        throw new Error('现金不足，无法购买。');
                    state.stats.funds = this.round(state.stats.funds - principal);
                    const holding = {
                        id: `${product.kind}-${state.year}-${state.cashManagement.holdings.length + 1}`,
                        kind: product.kind, name: product.name, principal, annualRate: product.annualRate,
                        startYear: state.year, maturityYear: state.year + product.years, risk: product.risk,
                        lastAnnualIncome: 0, cumulativeIncome: 0,
                    };
                    state.cashManagement.holdings.push(holding);
                    return holding;
                }
                redeemEarly(state, holdingId) {
                    const holding = this.find(state, holdingId);
                    const proceeds = this.round(holding.principal * (1 + state.cashManagement.demandRate * Math.max(0, state.year - holding.startYear)));
                    state.stats.funds = this.round(state.stats.funds + proceeds);
                    state.cashManagement.holdings = state.cashManagement.holdings.filter((item) => item !== holding);
                }
                settleYear(state) {
                    const demandIncome = this.round(state.cashManagement.demandBalance * state.cashManagement.demandRate);
                    let income = demandIncome;
                    for (const holding of [...state.cashManagement.holdings]) {
                        const yearIncome = this.round(holding.principal * holding.annualRate);
                        holding.lastAnnualIncome = yearIncome;
                        holding.cumulativeIncome = this.round(holding.cumulativeIncome + yearIncome);
                        income = this.round(income + yearIncome);
                        if (state.year >= holding.maturityYear) {
                            state.stats.funds = this.round(state.stats.funds + holding.principal);
                            state.cashManagement.holdings = state.cashManagement.holdings.filter((item) => item !== holding);
                        }
                    }
                    state.cashManagement.lastAnnualIncome = income;
                    return income;
                }
                expectedIncome(state) {
                    return this.round(state.cashManagement.demandBalance * state.cashManagement.demandRate + state.cashManagement.holdings.reduce((sum, item) => sum + item.principal * item.annualRate, 0));
                }
                maybeRiskEvent(state, random) {
                    if (state.year <= 2026 || state.pendingFinancialRisk || random.next() >= .07)
                        return undefined;
                    const candidates = state.cashManagement.holdings.filter((item) => item.kind === 'wealth-management');
                    if (candidates.length === 0)
                        return undefined;
                    const holding = candidates[random.int(0, candidates.length - 1)];
                    const recovery = .35 + random.next() * .4;
                    const loss = this.round(holding.principal * (1 - recovery));
                    holding.principal = this.round(holding.principal * recovery);
                    return { id: `wealth-risk-${holding.id}-${state.year}`, title: '稳健理财发生信用事件', description: `你持有的「${holding.name}」出现延期与折价兑付，已确认损失 ${Math.round(loss * 10000).toLocaleString('zh-CN')} 元本金。剩余本金将继续等待到期。`, createdYear: state.year };
                }
                totalValue(state) { return this.round(state.cashManagement.demandBalance + state.cashManagement.holdings.reduce((sum, item) => sum + item.principal, 0)); }
                find(state, id) { const holding = state.cashManagement.holdings.find((item) => item.id === id); if (!holding)
                    throw new Error('这笔产品已经到期或不存在。'); return holding; }
                requireAdult(state) { if (state.age < 18)
                    throw new Error('年满18岁后开放现金管理。'); }
                round(value) { return Math.round(value * 100) / 100; }
            };
            exports_1("CashManagementSystem", CashManagementSystem);
        }
    };
});





























System.register("chunks:///_virtual/YouthTemptationEvents.ts",[], function (exports_1, context_1) {
    "use strict";
    var youth, uncertain, YOUTH_TEMPTATION_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            youth = (id, title, description, yearMin, yearMax, options, weight = 88) => ({
                id, title, description, yearMin, yearMax, weight, interaction: 'life-choice', options,
            });
            uncertain = (id, label, result, outcomes) => ({ id, label, result, outcomes });
            exports_1("YOUTH_TEMPTATION_EVENTS", YOUTH_TEMPTATION_EVENTS = [
                youth('youth-old-computer', '旧电脑里的秘密', '亲戚送来一台旧电脑。有人说里面全是游戏，也有人说它能通向一个比学校更大的世界。', 2000, 2001, [
                    uncertain('explore', '自己摸索到很晚', { stats: { pressure: 1 }, addFlags: ['youth-computer-curious'] }, [
                        { id: 'spark', weight: 48, text: '你误打误撞学会了几个实用功能，开始对技术产生兴趣。', result: { skills: { technology: 5, information: 3 }, stats: { knowledge: 3 }, addFlags: ['computer-intro'] } },
                        { id: 'games', weight: 34, text: '大部分时间变成了游戏，但你也因此在同学中有了共同话题。', result: { stats: { happiness: 4, pressure: -1 }, skills: { expression: 1 } } },
                        { id: 'scolded', weight: 18, text: '你被发现熬夜，电脑被暂时收走，留下了一点遗憾。', result: { stats: { health: -1, happiness: -2 } } },
                    ]),
                    uncertain('leave', '把时间留给院子里的朋友', { addFlags: ['youth-outdoor-circle'] }, [
                        { id: 'team', weight: 65, text: '你在玩耍中交到真朋友，情绪更稳定。', result: { stats: { happiness: 5, health: 1, pressure: -2 }, skills: { expression: 2 } } },
                        { id: 'conflict', weight: 35, text: '一次小冲突让你闷闷不乐，不过很快也学会了和好。', result: { stats: { happiness: -1, pressure: 1 }, skills: { expression: 1 } } },
                    ]),
                ]),
                youth('youth-pocket-money', '口袋钱的去向', '同学们都在讨论新出的卡片、零食和游戏点卡。你攒下的零花钱刚好够参与一次。', 2001, 2002, [
                    uncertain('join', '跟大家一起买', { stats: { happiness: 1 }, addFlags: ['youth-consumer-temptation'] }, [
                        { id: 'bond', weight: 55, text: '你融进了同学的话题，也懂得了分享的快乐。', result: { stats: { happiness: 4, pressure: -1 }, skills: { expression: 1 } } },
                        { id: 'regret', weight: 45, text: '热闹很快过去，你发现钱花得比想象中更快。', result: { stats: { happiness: -1 }, skills: { business: 1 } } },
                    ]),
                    uncertain('save', '先把钱收好', { addFlags: ['youth-delayed-gratification'] }, [
                        { id: 'purpose', weight: 60, text: '后来这笔钱正好帮你买到了真正想要的东西。', result: { stats: { happiness: 2 }, skills: { business: 2 } } },
                        { id: 'lonely', weight: 40, text: '你没有参与那次热闹，短暂感到格格不入。', result: { stats: { happiness: -2, pressure: 1 }, skills: { information: 1 } } },
                    ]),
                ]),
                youth('youth-after-school', '放学后的岔路', '老师留下了一套额外练习，朋友则约你去操场。', 2001, 2003, [
                    uncertain('practice', '留下做完练习', { stats: { pressure: 2 }, addFlags: ['youth-practice-choice'] }, [
                        { id: 'method', weight: 58, text: '你找到了适合自己的方法，升学评估稳步提升。', result: { education: { admissionScore: 4 }, skills: { learning: 2 }, stats: { knowledge: 2 } } },
                        { id: 'tired', weight: 42, text: '练习没有立刻见效，反而让你觉得疲惫。', result: { education: { admissionScore: 1 }, stats: { happiness: -2, pressure: 2 } } },
                    ]),
                    uncertain('play', '去操场看看', { addFlags: ['youth-sports-choice'] }, [
                        { id: 'talent', weight: 52, text: '你发现自己很擅长这项运动，身体和心情都变好了。', result: { stats: { health: 4, happiness: 4, pressure: -2 }, skills: { management: 1 } } },
                        { id: 'injury', weight: 16, text: '一次摔倒让你休息了几天，但没有留下大碍。', result: { stats: { health: -2, happiness: -1 } } },
                        { id: 'ordinary', weight: 32, text: '你只是痛快地玩了一场，第二天仍要面对作业。', result: { stats: { happiness: 3, pressure: -1 } } },
                    ]),
                ]),
                youth('youth-family-weekend', '周末的家庭安排', '家里临时需要人搭把手，而同学约你参加一个并不确定有没有收获的校外活动。', 2002, 2004, [
                    uncertain('family', '先帮家里解决事情', { addFlags: ['youth-family-responsibility'] }, [
                        { id: 'trust', weight: 62, text: '家人开始愿意和你讨论真实的困难，你学到一点处事方法。', result: { skills: { business: 2, management: 2 }, stats: { happiness: 2 } } },
                        { id: 'missed', weight: 38, text: '活动结束后同学聊得兴高采烈，你有些失落。', result: { stats: { happiness: -2, pressure: 1 } } },
                    ]),
                    uncertain('activity', '去参加校外活动', { stats: { pressure: 1 }, addFlags: ['youth-community-activity'] }, [
                        { id: 'mentor', weight: 42, text: '一位老师注意到你的表达，鼓励你以后多尝试。', result: { skills: { expression: 4 }, stats: { happiness: 3 } } },
                        { id: 'ordinary', weight: 58, text: '活动没有改变什么，但你见到了不同的人和生活。', result: { skills: { information: 2 }, stats: { happiness: 1 } } },
                    ]),
                ]),
                youth('youth-new-circle', '新圈子的邀请', '进入初中前后，一群更会玩也更有主见的同学向你发出邀请。你听不出这会把你带向哪里。', 2003, 2005, [
                    uncertain('join', '跟着他们试试看', { addFlags: ['youth-new-circle'] }, [
                        { id: 'confidence', weight: 42, text: '你变得敢说话，也学会了在群体中表达自己。', result: { skills: { expression: 4, information: 2 }, stats: { happiness: 3 } } },
                        { id: 'distraction', weight: 38, text: '你开始把太多精力放在同伴评价上，学习节奏被打乱。', result: { education: { admissionScore: -3 }, stats: { pressure: 3, happiness: -1 } } },
                        { id: 'trouble', weight: 20, text: '一次跟风惹来老师批评，你得花时间收拾残局。', result: { education: { admissionScore: -5 }, stats: { pressure: 5, happiness: -3 } } },
                    ]),
                    uncertain('keep-distance', '保持一点距离', { addFlags: ['youth-independent'] }, [
                        { id: 'focus', weight: 58, text: '你保住了自己的节奏，渐渐更知道自己要什么。', result: { education: { admissionScore: 3 }, skills: { learning: 2 }, stats: { knowledge: 2 } } },
                        { id: 'quiet', weight: 42, text: '你错过了一些共同话题，但也有了更多独处时间。', result: { skills: { information: 2 }, stats: { happiness: -1 } } },
                    ]),
                ]),
                youth('youth-school-transfer', '一张转学申请', '家里得到一个转去资源更好学校的机会，但新的环境、通勤和竞争都未知。', 2004, 2006, [
                    uncertain('transfer', '去新的学校', { stats: { pressure: 2 }, addFlags: ['youth-school-transfer'] }, [
                        { id: 'adapt', weight: 55, text: '你适应得比预想快，新的课程和同学拉高了升学评估。', result: { education: { admissionScore: 5 }, skills: { information: 2 }, stats: { knowledge: 2 } } },
                        { id: 'lonely', weight: 30, text: '新环境让你一度孤单，成绩没有立刻变化。', result: { education: { admissionScore: 1 }, stats: { happiness: -3, pressure: 2 } } },
                        { id: 'overload', weight: 15, text: '竞争节奏超出预期，你需要一段时间重新找回方法。', result: { education: { admissionScore: -2 }, stats: { pressure: 4, happiness: -2 } } },
                    ]),
                    uncertain('stay', '留在熟悉的学校', { addFlags: ['youth-local-school'] }, [
                        { id: 'leader', weight: 48, text: '你在熟悉的环境里更敢承担责任，得到老师信任。', result: { skills: { management: 3, expression: 2 }, stats: { happiness: 2 } } },
                        { id: 'steady', weight: 52, text: '生活没有戏剧性变化，但你维持了自己的节奏。', result: { education: { admissionScore: 2 }, stats: { pressure: -1 } } },
                    ]),
                ]),
                youth('youth-competition', '一场不确定的比赛', '老师说有一个比赛名额。准备会占用周末，也没人能保证它值得。', 2005, 2007, [
                    uncertain('enter', '报名并认真准备', { stats: { pressure: 3 }, addFlags: ['youth-competition'] }, [
                        { id: 'award', weight: 35, text: '你取得了超出预期的成绩，开始相信长期投入。', result: { education: { admissionScore: 6 }, skills: { learning: 3 }, stats: { knowledge: 3, happiness: 3 } } },
                        { id: 'growth', weight: 48, text: '你没有获奖，却学会了比名次更扎实的方法。', result: { education: { admissionScore: 3 }, skills: { learning: 3 }, stats: { knowledge: 2 } } },
                        { id: 'burnout', weight: 17, text: '准备过程消耗过大，结果不如意，你需要缓一缓。', result: { education: { admissionScore: -1 }, stats: { pressure: 5, happiness: -3 } } },
                    ]),
                    uncertain('decline', '把周末留给自己', { addFlags: ['youth-competition-decline'] }, [
                        { id: 'recharge', weight: 65, text: '你恢复了状态，也找到一个让自己持续投入的兴趣。', result: { stats: { health: 2, happiness: 4, pressure: -3 }, skills: { expression: 2 } } },
                        { id: 'regret', weight: 35, text: '听到比赛结果时，你有一点后悔，但也更清楚下次想争取什么。', result: { stats: { happiness: -1 }, skills: { learning: 1 } } },
                    ]),
                ]),
                youth('youth-online-world', '屏幕另一端的机会', '网上有人邀请你一起做攻略、剪视频或帮忙维护小论坛。它像兴趣，也像一条容易失控的岔路。', 2006, 2008, [
                    uncertain('create', '加入并持续产出', { stats: { pressure: 2 }, addFlags: ['youth-online-creator'] }, [
                        { id: 'portfolio', weight: 48, text: '你做出了一些拿得出手的作品，技术和表达都有所增长。', result: { skills: { technology: 4, expression: 3, information: 2 }, stats: { happiness: 2 } } },
                        { id: 'drift', weight: 35, text: '投入变成了刷屏和熬夜，作品没有留下多少。', result: { education: { admissionScore: -3 }, stats: { health: -1, pressure: 3 } } },
                        { id: 'conflict', weight: 17, text: '一次网络争吵让你受挫，但也学会了辨别信息。', result: { skills: { information: 3 }, stats: { happiness: -3, pressure: 2 } } },
                    ]),
                    uncertain('observe', '只偶尔看看', { addFlags: ['youth-online-observer'] }, [
                        { id: 'insight', weight: 60, text: '你保持了距离，却逐渐学会从信息里分辨真假。', result: { skills: { information: 4 }, stats: { knowledge: 2 } } },
                        { id: 'missed', weight: 40, text: '你没有深入参与，生活仍按原来的轨道前进。', result: { stats: { pressure: -1, happiness: 1 } } },
                    ]),
                ]),
                youth('youth-temp-income', '一份临时赚钱的路子', '有人说假期能靠帮忙、代练或摆摊挣到钱。听起来很诱人，但没人能告诉你会付出什么。', 2007, 2009, [
                    uncertain('earn', '试着赚一笔', { stats: { pressure: 2 }, addFlags: ['youth-early-earning'] }, [
                        { id: 'trade', weight: 42, text: '你确实赚到了零花钱，也第一次理解交易和服务。', result: { stats: { funds: .4, happiness: 2 }, skills: { business: 4, expression: 2 } } },
                        { id: 'waste', weight: 38, text: '忙了很久却没攒下多少，复习计划也被耽误。', result: { education: { admissionScore: -3 }, stats: { happiness: -1, pressure: 3 }, skills: { business: 1 } } },
                        { id: 'caught', weight: 20, text: '这件事惹来家长和老师担心，你被要求暂停。', result: { education: { admissionScore: -2 }, stats: { pressure: 4, happiness: -3 } } },
                    ]),
                    uncertain('prepare', '把假期留给准备', { addFlags: ['youth-exam-preparation'] }, [
                        { id: 'breakthrough', weight: 52, text: '你补上了一个长期短板，升学评估有明显进展。', result: { education: { admissionScore: 5 }, skills: { learning: 3 }, stats: { knowledge: 3 } } },
                        { id: 'flat', weight: 48, text: '努力没有立刻开花，但你把节奏稳定了下来。', result: { education: { admissionScore: 2 }, stats: { pressure: 1 } } },
                    ]),
                ]),
                youth('youth-highschool-friend', '高中里的新朋友', '有人带你进入一个很有活力的圈子：竞赛、社团、游戏和秘密都混在一起。', 2008, 2009, [
                    uncertain('immerse', '彻底融进去', { addFlags: ['youth-highschool-circle'] }, [
                        { id: 'partner', weight: 43, text: '你遇到能互相督促的伙伴，困难时有人拉你一把。', result: { education: { admissionScore: 3 }, skills: { expression: 3 }, stats: { happiness: 4, pressure: -1 } } },
                        { id: 'drift', weight: 40, text: '热闹占据了很多夜晚，模拟考成绩开始波动。', result: { education: { admissionScore: -4 }, stats: { pressure: 3, happiness: 1 } } },
                        { id: 'fallout', weight: 17, text: '一场关系冲突让你分心很久。', result: { education: { admissionScore: -2 }, stats: { happiness: -4, pressure: 4 } } },
                    ]),
                    uncertain('choose-team', '只加入一个明确的团队', { addFlags: ['youth-highschool-team'] }, [
                        { id: 'stage', weight: 58, text: '你在有限投入中找到舞台，能力和节奏都没有失衡。', result: { skills: { management: 3, expression: 2 }, education: { admissionScore: 2 }, stats: { happiness: 2 } } },
                        { id: 'narrow', weight: 42, text: '你保住了时间，但也错过一些探索。', result: { education: { admissionScore: 3 }, stats: { happiness: -1 } } },
                    ]),
                ]),
                youth('youth-tutoring-choice', '补习班的承诺', '一门昂贵的补习班承诺快速提分。它也可能只是把焦虑卖给每个家庭。', 2008, 2010, [
                    uncertain('enroll', '报名试一试', { stats: { pressure: 3 }, addFlags: ['youth-tutoring'] }, [
                        { id: 'fit', weight: 48, text: '老师的方法正好适合你，升学评估取得突破。', result: { education: { admissionScore: 6 }, skills: { learning: 2 }, stats: { knowledge: 2 } } },
                        { id: 'ordinary', weight: 35, text: '课程有用但不神奇，你只是比以前更规律。', result: { education: { admissionScore: 3 }, stats: { pressure: 2 } } },
                        { id: 'exhaust', weight: 17, text: '额外课程压垮了休息时间，短期状态反而下降。', result: { education: { admissionScore: -2 }, stats: { health: -2, happiness: -3, pressure: 5 } } },
                    ]),
                    uncertain('self-plan', '自己制定冲刺计划', { addFlags: ['youth-self-directed'] }, [
                        { id: 'discipline', weight: 52, text: '你坚持了下来，逐步找回对学习的掌控感。', result: { education: { admissionScore: 5 }, skills: { learning: 3 }, stats: { knowledge: 2 } } },
                        { id: 'loose', weight: 48, text: '计划写得很好，却没有完全执行，你至少看清了自己的问题。', result: { education: { admissionScore: 1 }, stats: { pressure: 1 }, skills: { management: 1 } } },
                    ]),
                ]),
                youth('youth-city-camp', '陌生城市的夏令营', '一个短期夏令营提供了离开熟悉环境的机会。它可能打开眼界，也可能只是一段昂贵的旅行。', 2009, 2010, [
                    uncertain('go', '争取参加', { stats: { pressure: 1 }, addFlags: ['youth-city-camp'] }, [
                        { id: 'vision', weight: 50, text: '你第一次看见不同的教育和生活方式，目标变得具体。', result: { education: { admissionScore: 4 }, skills: { information: 3 }, stats: { knowledge: 2, happiness: 2 } } },
                        { id: 'ordinary', weight: 34, text: '旅程很开心，但回家后仍要面对原来的题目。', result: { stats: { happiness: 4, pressure: -2 }, skills: { expression: 1 } } },
                        { id: 'pressure', weight: 16, text: '比较带来了焦虑，你需要重新定义自己的节奏。', result: { stats: { happiness: -3, pressure: 4 }, skills: { information: 1 } } },
                    ]),
                    uncertain('stay', '留在家里收尾复习', { addFlags: ['youth-stay-review'] }, [
                        { id: 'solid', weight: 58, text: '你把基础问题逐一补完，评估分数更稳了。', result: { education: { admissionScore: 4 }, stats: { knowledge: 3 } } },
                        { id: 'restless', weight: 42, text: '你完成了计划，却仍会想象另一种暑假。', result: { education: { admissionScore: 2 }, stats: { happiness: -1 } } },
                    ]),
                ]),
                youth('youth-final-choice', '考前最后的邀请', '大考前，一个重要活动和最后的冲刺安排撞在同一周。无论怎么选，都可能留下遗憾。', 2010, 2010, [
                    uncertain('sprint', '把这一周留给冲刺', { stats: { pressure: 3 }, addFlags: ['youth-final-sprint'] }, [
                        { id: 'calm', weight: 52, text: '你把关键问题理顺，走进考场时更有底气。', result: { education: { admissionScore: 5 }, stats: { knowledge: 2 } } },
                        { id: 'overwork', weight: 25, text: '最后冲刺让你疲惫，但仍保住了基本发挥。', result: { education: { admissionScore: 2 }, stats: { health: -1, pressure: 3 } } },
                        { id: 'panic', weight: 23, text: '越临近越焦虑，你需要在考场前停下来喘口气。', result: { education: { admissionScore: -2 }, stats: { happiness: -2, pressure: 5 } } },
                    ]),
                    uncertain('attend', '去参加那次活动', { addFlags: ['youth-final-memory'] }, [
                        { id: 'release', weight: 48, text: '你意外放松下来，回来后反而能专注完成最后准备。', result: { education: { admissionScore: 3 }, stats: { happiness: 4, pressure: -3 } } },
                        { id: 'regret', weight: 34, text: '活动很热闹，但你回来时发现自己有些心虚。', result: { education: { admissionScore: -2 }, stats: { happiness: 1, pressure: 2 } } },
                        { id: 'memory', weight: 18, text: '它没有改变成绩，却成为你多年后仍记得的一晚。', result: { stats: { happiness: 5, pressure: -2 }, skills: { expression: 1 } } },
                    ]),
                ], 115),
            ]);
        }
    };
});



























System.register("chunks:///_virtual/AnnualLifeEvents.ts",[], function (exports_1, context_1) {
    "use strict";
    var ANNUAL_LIFE_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("ANNUAL_LIFE_EVENTS", ANNUAL_LIFE_EVENTS = [
                {
                    id: 'echo-training-project', title: '训练营里认识的人',
                    description: '当年训练营里的一位同学再次联系你。他正在整理一份行业资料，想邀你一起完成。那次学习留下的，不只有笔记。',
                    yearMin: 2011, yearMax: 2072, weight: 35, prerequisites: ['flags.annual-skill-training'], interaction: 'life-choice',
                    options: [
                        { id: 'collaborate', label: '一起完成资料', result: { skills: { information: 3, expression: 2 }, stats: { pressure: 3 }, addFlags: ['echo-training-collaborated'] } },
                        { id: 'share', label: '分享笔记，保留自己的时间', result: { skills: { information: 1 }, stats: { happiness: 2 }, addFlags: ['echo-training-shared'] } },
                    ],
                },
                {
                    id: 'echo-contract-return', title: '老客户再次找来',
                    description: '你曾接下的短期合作有了下文。对方认可那次交付，想再请你做一单，但你也记得赶工时被挤走的休息。',
                    yearMin: 2015, yearMax: 2072, weight: 35, prerequisites: ['flags.annual-side-contract'], interaction: 'opportunity', declineAllowed: true,
                    options: [
                        { id: 'accept', label: '再合作一次', result: { stats: { funds: 4, pressure: 7, health: -2 }, skills: { business: 2 }, addFlags: ['echo-returning-client'] } },
                        { id: 'refer', label: '介绍给朋友', result: { stats: { happiness: 3, pressure: -2 }, skills: { expression: 1 }, addFlags: ['echo-referred-client'] } },
                    ],
                },
                {
                    id: 'echo-family-tradition', title: '下一次相聚',
                    description: '上次相聚后，家人又提起一起吃饭的约定。你可以把它变成一段固定的时间，也可以先用一通电话联系。',
                    yearMin: 2010, yearMax: 2072, weight: 32, prerequisites: ['flags.social-support'], interaction: 'life-choice',
                    options: [
                        { id: 'visit', label: '留一个周末回家', result: { stats: { funds: -.3, happiness: 5, pressure: -3 }, addFlags: ['echo-family-tradition'] } },
                        { id: 'call', label: '今晚打个电话', result: { stats: { happiness: 2, pressure: -1 }, addFlags: ['echo-family-call'] } },
                    ],
                },
                {
                    id: 'annual-skill-invitation', title: '一个周末训练营', description: '行业朋友邀请你参加一个紧凑的周末训练营。它能补足短板，但会占用休息和一笔预算。',
                    yearMin: 2010, yearMax: 2072, weight: 28, repeatable: true, interaction: 'life-choice', options: [
                        { id: 'attend', label: '报名参加｜现金-¥8,000', result: { stats: { funds: -.8, pressure: 2 }, skills: { learning: 2, information: 2 }, addFlags: ['annual-skill-training'] } },
                        { id: 'rest', label: '把周末留给自己', result: { stats: { health: 2, happiness: 3, pressure: -3 } } },
                    ],
                },
                {
                    id: 'annual-side-contract', title: '一份短期合作邀约', description: '熟人介绍了一份短期合作。收入可观，但交付周期会压缩你的生活空间。',
                    yearMin: 2014, yearMax: 2072, weight: 30, repeatable: true, interaction: 'opportunity', prerequisites: ['flags.career-started'], options: [
                        { id: 'take', label: '接下合作｜现金+¥30,000', result: { stats: { funds: 3, pressure: 4, happiness: -1 }, skills: { expression: 2, business: 1 }, addFlags: ['annual-side-contract'] } },
                        { id: 'pass', label: '婉拒，维持当前节奏', result: { stats: { happiness: 2, pressure: -2 } } },
                    ],
                },
                {
                    id: 'annual-network-dinner', title: '一场行业晚餐', description: '几位同行约你交流近况。也许能得到合作信息，也可能只是花掉一个晚上。',
                    yearMin: 2014, yearMax: 2072, weight: 26, repeatable: true, interaction: 'life-choice', options: [
                        { id: 'go', label: '赴约交流｜现金-¥3,000', result: { stats: { funds: -.3, happiness: 2, pressure: 1 }, skills: { expression: 2, information: 2 }, addFlags: ['annual-networking'] } },
                        { id: 'decline', label: '留在家里休整', result: { stats: { health: 1, happiness: 3, pressure: -2 } } },
                    ],
                },
                {
                    id: 'annual-spending-choice', title: '想犒劳自己的一天', description: '这一年的紧绷终于有了空隙。你可以为自己花一笔钱，或者把它留在账户里。',
                    yearMin: 2014, yearMax: 2072, weight: 24, repeatable: true, interaction: 'life-choice', options: [
                        { id: 'enjoy', label: '安排一次小旅行｜现金-¥12,000', result: { stats: { funds: -1.2, health: 1, happiness: 6, pressure: -5 }, addFlags: ['annual-short-trip'] } },
                        { id: 'save', label: '把钱留给未来', result: { stats: { happiness: 1, pressure: -1 }, skills: { business: 1 } } },
                    ],
                },
                {
                    id: 'annual-professional-choice', title: '更难的工作任务', description: '团队里出现一项复杂任务。承担它会积累能力与声望，也会带来更高压力。',
                    yearMin: 2014, yearMax: 2072, weight: 30, repeatable: true, interaction: 'life-choice', prerequisites: ['flags.career-started'], options: [
                        { id: 'lead', label: '主动承担', result: { skills: { management: 2, information: 1 }, stats: { pressure: 4, health: -1 }, addFlags: ['annual-hard-task'] } },
                        { id: 'support', label: '完成自己负责的部分', result: { skills: { learning: 1 }, stats: { happiness: 1, pressure: 1 } } },
                    ],
                },
                {
                    id: 'annual-life-adjustment', title: '生活安排需要重排', description: '通勤、家务和休息开始挤占彼此。改变安排需要成本，不改变则要承受持续消耗。',
                    yearMin: 2014, yearMax: 2072, weight: 27, repeatable: true, interaction: 'life-choice', options: [
                        { id: 'pay', label: '花钱换取便利｜现金-¥10,000', result: { stats: { funds: -1, health: 2, happiness: 3, pressure: -4 } } },
                        { id: 'adapt', label: '自己重新安排时间', result: { skills: { management: 2 }, stats: { pressure: 1, happiness: 1 } } },
                    ],
                },
            ]);
        }
    };
});

























System.register("chunks:///_virtual/LifePresentation.ts",["./AbilityConfig.ts"], function (exports_1, context_1) {
    "use strict";
    var AbilityConfig_1;
    var __moduleName = context_1 && context_1.id;
    function uncertaintyPreview(option) {
        var _a;
        if (!((_a = option.outcomes) === null || _a === void 0 ? void 0 : _a.length))
            return '';
        const ranges = [];
        for (const group of ['stats', 'skills']) {
            const keys = new Set();
            option.outcomes.forEach(outcome => { var _a; return Object.keys((_a = outcome.result[group]) !== null && _a !== void 0 ? _a : {}).forEach(key => keys.add(key)); });
            for (const key of keys) {
                if (!AbilityConfig_1.STAT_NAMES[key])
                    continue;
                const values = option.outcomes.map(outcome => { var _a, _b; return (_b = (_a = outcome.result[group]) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : 0; });
                const low = Math.min(...values), high = Math.max(...values);
                const format = (value) => key === 'funds' || key === 'familyResources' ? AbilityConfig_1.signedMoneyText(value) : `${value >= 0 ? '+' : ''}${value}`;
                ranges.push(`${AbilityConfig_1.STAT_NAMES[key]} ${format(low)}${low !== high ? '～' + format(high) : ''}`);
            }
        }
        return ranges.length ? `可能的额外变化：${ranges.join(' · ')}\n具体结果在选择后揭晓。` : '后续结果有不确定性，作出选择后揭晓。';
    }
    exports_1("uncertaintyPreview", uncertaintyPreview);
    function chapter(age) {
        return age < 12 ? '童年的窗' : age < 22 ? '走向世界' : age < 35 ? '独自生长' : age < 55 ? '生活的重量' : '日子慢下来';
    }
    exports_1("chapter", chapter);
    function situation(s) {
        if (s.stats.health < 30)
            return '身体已经亮起警报。下一步，也许该先照顾自己。';
        if (s.stats.pressure > 70)
            return '事情一件接着一件，你需要给生活留一点空隙。';
        if (s.stats.happiness < 30)
            return '日子照常向前，但你开始想找回自己的快乐。';
        if (s.age < 12)
            return '窗外的世界还很远，你的故事才刚刚开始。';
        if (s.age < 18)
            return '书桌前的每一次坚持，都在为未来多留一个选择。';
        if (s.age < 22)
            return '熟悉的路渐渐走到尽头，你开始决定自己的方向。';
        if (s.age >= 55)
            return '走过许多路以后，你开始在意日子本身的模样。';
        if (s.career.track === 'unemployed')
            return '下一站还没有确定，时间也留给了新的可能。';
        if (s.lifeFocus === 'rest')
            return '你把脚步放慢了一些，留出时间重新照看自己。';
        if (s.lifeFocus === 'social')
            return '工作之外，你也开始为生活里的相聚留出位置。';
        return s.age < 35 ? '你正在建立自己的生活，也在学习如何安放野心。' : '生活有了积累。往后怎么过，仍然由你选择。';
    }
    exports_1("situation", situation);
    function focusName(s, focus) {
        if (focus === 'study')
            return s.age < 22 ? '认真求学' : '继续学习';
        if (focus === 'work')
            return s.age < 18 ? '参与实践' : s.career.track === 'unemployed' ? '尝试兼职' : '专注事业';
        if (focus === 'rest')
            return '照顾自己';
        return s.age < 18 ? '和朋友相处' : '留时间给生活';
    }
    exports_1("focusName", focusName);
    return {
        setters: [
            function (AbilityConfig_1_1) {
                AbilityConfig_1 = AbilityConfig_1_1;
            }
        ],
        execute: function () {
        }
    };
});







System.register("chunks:///_virtual/LifeScene.ts",["cc"], function (exports_1, context_1) {
    "use strict";
    var cc_1, LifeScene;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            }
        ],
        execute: function () {
            LifeScene = class LifeScene {
                static draw(parent, width, height, age, city = 'city') {
                    const node = new cc_1.Node('LifeScene');
                    node.layer = parent.layer;
                    node.addComponent(cc_1.UITransform).setContentSize(width, height);
                    parent.addChild(node);
                    const g = node.addComponent(cc_1.Graphics);
                    const color = (r, green, b) => new cc_1.Color(r, green, b, 255);
                    const rect = (x, y, w, h, c, radius = 0) => {
                        g.fillColor = c;
                        g.roundRect(x, y, w, h, radius);
                        g.fill();
                    };
                    const line = (x, y, x2, y2, c, size = 2) => {
                        g.strokeColor = c;
                        g.lineWidth = size;
                        g.moveTo(x, y);
                        g.lineTo(x2, y2);
                        g.stroke();
                    };
                    const left = -width / 2, bottom = -height / 2;
                    const night = age >= 22 && age < 55;
                    rect(left, bottom, width, height, night ? color(28, 48, 56) : color(83, 113, 113), 12);
                    const wx = left + width * .38, wy = bottom + height * .32, ww = width * .52, wh = height * .57;
                    rect(wx - 8, wy - 8, ww + 16, wh + 16, color(20, 38, 44), 3);
                    rect(wx, wy, ww, wh, night ? color(82, 117, 130) : color(190, 211, 203));
                    for (let i = 0; i < 8; i++) {
                        const bw = ww / 8 - 4, bh = wh * (.18 + ((i * 7 + 3) % 9) / 18) * (city === 'rural' ? .5 : 1);
                        rect(wx + i * ww / 8, wy, bw, bh, night ? color(43, 72, 82) : color(133, 164, 157));
                        if (night)
                            for (let j = 0; j < 3; j++)
                                rect(wx + i * ww / 8 + 5, wy + 9 + j * 12, 4, 5, color(186, 166, 117));
                    }
                    line(wx + ww / 2, wy, wx + ww / 2, wy + wh, color(28, 48, 56), 7);
                    line(wx, wy + wh * .58, wx + ww, wy + wh * .58, color(28, 48, 56), 5);
                    rect(left + 26, bottom + 26, width - 52, 15, color(154, 124, 92), 3);
                    rect(left + 45, bottom + 8, 12, 18, color(78, 69, 58));
                    rect(width / 2 - 57, bottom + 8, 12, 18, color(78, 69, 58));
                    rect(left + 57, bottom + 42, 70, 7, color(211, 178, 108), 3);
                    line(left + 91, bottom + 49, left + 104, bottom + height * .65, color(211, 178, 108), 5);
                    rect(left + 66, bottom + height * .61, 91, 21, color(225, 198, 139), 8);
                    rect(left + 170, bottom + 43, 100, 17, color(221, 217, 198), 2);
                    line(left + 220, bottom + 44, left + 220, bottom + 58, color(158, 150, 132));
                    rect(width / 2 - 106, bottom + 42, 24, 28, color(204, 205, 186), 5);
                    if (age >= 55) {
                        rect(left + 285, bottom + 41, 30, 26, color(168, 121, 92), 4);
                        line(left + 300, bottom + 67, left + 300, bottom + 108, color(102, 148, 117), 5);
                        rect(left + 276, bottom + 85, 24, 12, color(123, 163, 127), 6);
                        rect(left + 301, bottom + 98, 24, 12, color(123, 163, 127), 6);
                    }
                    return node;
                }
            };
            exports_1("LifeScene", LifeScene);
        }
    };
});







System.register("chunks:///_virtual/main",["./DeviceLayout.ts","./GameBootstrap.ts","./Motion.ts","./PortraitGameUI.ts","./StatChangeAnimator.ts","./UITheme.ts","./AbilityConfig.ts","./AchievementConfig.ts","./CareerPathEvents.ts","./EducationEvents.ts","./EndingConfig.ts","./EventTemplates.ts","./ExplorationConfig.ts","./FamilyOpportunityEvents.ts","./FutureTransitionEvents.ts","./GameEvents.ts","./IdentityConfig.ts","./IndependentLifeEvents.ts","./IndustryOpportunityEvents.ts","./IndustryProjectConfig.ts","./InheritanceConfig.ts","./LaterLifeEvents.ts","./MajorOpportunityEvents.ts","./MarketConfig.ts","./MarketInsightConfig.ts","./MidLifeEvents.ts","./OpportunityConfig.ts","./OpportunityEvents.ts","./StarterEvents.ts","./StartupConfig.ts","./YearConfig.ts","./GameSession.ts","./GameStateManager.ts","./GameTypes.ts","./SeededRandom.ts","./AchievementSystem.ts","./AssetSystem.ts","./CareerSystem.ts","./CitySystem.ts","./ConditionEvaluator.ts","./DelayedEventQueue.ts","./EducationProgressionSystem.ts","./EducationSystem.ts","./EndingResolver.ts","./EventMatcher.ts","./FamilyUnlockManager.ts","./FinanceSystem.ts","./GrowthSystem.ts","./HealthSystem.ts","./HousingSystem.ts","./IndustryProjectSystem.ts","./InvestmentMemoryManager.ts","./LegacyManager.ts","./MarketSystem.ts","./OpenOpportunitySystem.ts","./OpportunitySystem.ts","./ReportGenerator.ts","./RequirementFormatter.ts","./SaveManager.ts","./WealthSystem.ts"],(function(){return{setters:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/MajorOpportunityEvents.ts",[], function (exports_1, context_1) {
    "use strict";
    var MAJOR_OPPORTUNITY_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("MAJOR_OPPORTUNITY_EVENTS", MAJOR_OPPORTUNITY_EVENTS = [
                {
                    id: 'major-venture-investment',
                    title: '高风险项目跟投机会',
                    description: '一支小团队邀请你以现金跟投。项目可能带来数倍回报，也可能几乎归零；这是一次真正会改变资产曲线的选择。',
                    yearMin: 2016,
                    yearMax: 2072,
                    weight: 45,
                    prerequisites: ['stats.funds>=50'],
                    options: [
                        { id: 'commit', label: '投入 ¥500,000 跟投（成功约四成，成功后回收 ¥2,400,000）', result: { stats: { funds: -50, pressure: 8 }, addFlags: ['venture-investor'] } },
                        { id: 'decline', label: '放弃，保留现金与选择权', result: { skills: { information: 1 }, stats: { pressure: -1 } } },
                    ],
                },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/MarketConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var MARKET_INSTRUMENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("MARKET_INSTRUMENTS", MARKET_INSTRUMENTS = [
                {
                    id: 'housing-developer', name: '安居开发', kind: 'stock', sector: '地产开发', risk: '高', chainId: 'urban-housing', description: '城市化上行期受益明显；高杠杆也意味着周期反转时跌幅可能更深。',
                    publicFromYear: 2005, startingPrice: 10, prices: { 2005: 10, 2008: 13, 2012: 26, 2015: 42, 2018: 38, 2020: 31, 2022: 16, 2024: 11, 2026: 9 }, prerequisites: ['skills.information>=15'], clue: '住房需求与信贷扩张正在同时出现。',
                },
                {
                    id: 'web-portal', name: '万象门户', kind: 'stock', sector: '个人电脑互联网', risk: '高', chainId: 'pc-internet', description: '早期门户与软件服务的代表；先发优势会随移动时代到来而衰减。',
                    publicFromYear: 2006, startingPrice: 8, prices: { 2006: 8, 2009: 15, 2012: 28, 2015: 33, 2018: 24, 2020: 19, 2024: 16, 2026: 14 }, prerequisites: ['flags.computer-intro'], clue: '电脑正在从少数人的工具变成基础设施。',
                },
                {
                    id: 'commerce-platform', name: '千帆商贸', kind: 'stock', sector: '电子商务', risk: '中', chainId: 'ecommerce', description: '线上交易、物流与支付网络共同推动增长；竞争会持续吞噬利润。',
                    publicFromYear: 2010, startingPrice: 12, prices: { 2010: 12, 2013: 20, 2016: 48, 2019: 74, 2021: 68, 2024: 92, 2026: 105 }, prerequisites: ['skills.business>=20'], clue: '网购订单与仓配网络正在同步扩张。',
                },
                {
                    id: 'mobile-service', name: '掌中服务', kind: 'stock', sector: '移动互联网', risk: '高', chainId: 'mobile-internet', description: '应用、支付与本地服务的高速扩张期；增长放缓时估值会剧烈波动。',
                    publicFromYear: 2013, startingPrice: 10, prices: { 2013: 10, 2015: 24, 2018: 61, 2020: 88, 2022: 57, 2024: 73, 2026: 80 }, prerequisites: ['skills.information>=22'], clue: '用户开始把更多生活环节交给手机。',
                },
                {
                    id: 'content-platform', name: '回声内容', kind: 'stock', sector: '内容平台', risk: '高', chainId: 'content-industry', description: '注意力能够变现，但流量、监管与创作成本让收益充满不确定。',
                    publicFromYear: 2016, startingPrice: 9, prices: { 2016: 9, 2018: 18, 2020: 44, 2022: 27, 2024: 31, 2026: 36 }, prerequisites: ['skills.expression>=20'], clue: '短内容与直播正在改变广告和消费。',
                },
                {
                    id: 'ai-toolmaker', name: '智造工具', kind: 'stock', sector: '人工智能', risk: '高', chainId: 'artificial-intelligence', description: '生成式工具带来效率想象，也伴随高估值、技术替代和商业化兑现风险。',
                    publicFromYear: 2022, startingPrice: 18, prices: { 2022: 18, 2023: 46, 2024: 31, 2026: 58, 2030: 42, 2035: 95 }, prerequisites: ['skills.technology>=30', 'skills.information>=25'], clue: '模型能力提升快于多数企业的适应速度。',
                },
                {
                    id: 'virtual-reality', name: '幻界互动', kind: 'stock', sector: '沉浸式娱乐', risk: '高', description: '概念先于盈利。热潮之中容易被追捧，兑现不足时也会快速回落。',
                    publicFromYear: 2021, startingPrice: 20, prices: { 2021: 20, 2022: 39, 2023: 14, 2024: 11, 2026: 13 }, prerequisites: ['skills.information>=25'], clue: '所有人都在谈论下一个入口，但还没人能说清收入从哪里来。',
                },
                {
                    id: 'urban-index', name: '城镇发展指数', kind: 'fund', sector: '综合指数', risk: '中', description: '覆盖基础设施、消费与城市服务的公开指数基金。',
                    publicFromYear: 2008, startingPrice: 10, prices: { 2008: 10, 2012: 14, 2016: 19, 2020: 24, 2024: 30, 2026: 32, 2035: 42, 2045: 55, 2055: 68, 2070: 82 },
                },
                {
                    id: 'cloud-pioneer', name: '云端先驱', kind: 'stock', sector: '云计算', risk: '高', description: '早期软件服务公司，波动较大，依赖技术与信息判断。',
                    publicFromYear: 2012, startingPrice: 8, prices: { 2012: 8, 2015: 11, 2018: 18, 2020: 35, 2022: 22, 2024: 48, 2026: 55, 2035: 38, 2045: 75, 2055: 96, 2070: 130 },
                    prerequisites: ['skills.technology>=25'], clue: '技术论坛中持续出现“企业上云”的讨论。',
                },
                {
                    id: 'green-grid', name: '绿网能源', kind: 'stock', sector: '新能源设备', risk: '高', description: '新能源设备企业，需较高信息能力才能识别周期风险。',
                    publicFromYear: 2016, startingPrice: 12, prices: { 2016: 12, 2018: 10, 2020: 17, 2022: 33, 2024: 21, 2026: 29, 2035: 46, 2045: 34, 2055: 72, 2070: 110 },
                    prerequisites: ['skills.information>=25'], clue: '行业报告提到电网改造将形成长期订单。',
                },
                {
                    id: 'innovation-bond', name: '创新城债', kind: 'bond', sector: '城市建设债', risk: '低', description: '收益平稳的城市建设债券，适合建立第一笔可控投资。',
                    publicFromYear: 2005, startingPrice: 10, prices: { 2005: 10, 2010: 11, 2015: 12, 2020: 13, 2024: 14, 2026: 15, 2035: 18, 2045: 22, 2055: 27, 2070: 34 },
                },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/MarketInsightConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var MARKET_INSIGHTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("MARKET_INSIGHTS", MARKET_INSIGHTS = [
                { id: 'long-term-compounding', name: '时间复利', description: '理解长期持有与稳定收益的累积价值。' },
                { id: 'diversification', name: '分散配置', description: '理解单一行业并不能代表整个市场。' },
                { id: 'cycle-awareness', name: '周期意识', description: '理解增长、回撤与情绪会反复出现。' },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/MarketSystem.ts",["./MarketConfig.ts"], function (exports_1, context_1) {
    "use strict";
    var MarketConfig_1, FUTURE_STOCK_TEMPLATES, MarketSystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (MarketConfig_1_1) {
                MarketConfig_1 = MarketConfig_1_1;
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
                instruments(state) {
                    this.migrateShareUnits(state);
                    const held = new Set(state.market.positions.map((position) => position.instrumentId));
                    const discovered = new Set(state.market.discoveredInstrumentIds);
                    return this.catalog(state)
                        .filter((item) => item.publicFromYear <= state.year && (!item.closeYear || state.year <= item.closeYear || held.has(item.id) || discovered.has(item.id)))
                        .sort((left, right) => right.publicFromYear - left.publicFromYear || left.id.localeCompare(right.id));
                }
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
                price(item, year, seed = 0) {
                    const futureAnchor = item.publicFromYear > 2026 ? item.publicFromYear : 2026;
                    if (year > futureAnchor)
                        return this.futurePrice(item, year, seed, futureAnchor);
                    return this.historicalPrice(item, year);
                }
                historicalPrice(item, year) {
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
                change(item, year, seed = 0) {
                    const current = this.price(item, year, seed);
                    const previous = this.price(item, Math.max(item.publicFromYear, year - 1), seed);
                    const amount = Math.round((current - previous) * 100) / 100;
                    return { amount, percent: previous === 0 ? 0 : Math.round(amount / previous * 1000) / 10 };
                }
                history(item, year, years = 5, seed = 0) {
                    const start = Math.max(item.publicFromYear, year - years + 1);
                    return Array.from({ length: year - start + 1 }, (_, index) => ({ year: start + index, price: this.price(item, start + index, seed) }));
                }
                canTrade(state) { return state.age >= 18; }
                buy(state, instrumentId, quantity) {
                    this.migrateShareUnits(state);
                    if (!this.canTrade(state))
                        throw new Error('未成年只能查看行情，不能买卖。');
                    const item = this.find(instrumentId, state);
                    if (item.closeYear && state.year > item.closeYear)
                        throw new Error('该标的已停止新增买入，但历史持仓仍可查看和卖出。');
                    const lotSize = this.lotSize(item);
                    if (!Number.isInteger(quantity) || quantity < lotSize || quantity % lotSize !== 0)
                        throw new Error(`买入数量需要符合当前市场的最小成交单位。`);
                    const price = this.price(item, state.year, state.seed);
                    const cost = this.roundMoney(price * quantity / 10000);
                    if (state.stats.funds < cost)
                        throw new Error('资金不足，无法完成本次购买。');
                    const position = state.market.positions.find((entry) => entry.instrumentId === item.id);
                    if (position) {
                        position.averageCost = Math.round((position.averageCost * position.quantity + price * quantity) / (position.quantity + quantity) * 100) / 100;
                        position.quantity = this.roundQuantity(position.quantity + quantity);
                    }
                    else
                        state.market.positions.push({ instrumentId: item.id, quantity, averageCost: price });
                    state.stats.funds = this.roundMoney(state.stats.funds - cost);
                }
                buyAmount(state, instrumentId, amount) {
                    const item = this.find(instrumentId, state);
                    const lotSize = this.lotSize(item);
                    const quantity = Math.floor(amount * 10000 / this.price(item, state.year, state.seed) / lotSize) * lotSize;
                    if (quantity < lotSize)
                        throw new Error('资金不足，无法完成本次购买。');
                    this.buy(state, instrumentId, quantity);
                }
                sell(state, instrumentId, quantity) {
                    this.migrateShareUnits(state);
                    if (!this.canTrade(state))
                        throw new Error('未成年只能查看行情，不能买卖。');
                    const position = this.position(state, instrumentId);
                    if (!Number.isFinite(quantity) || quantity <= 0 || position.quantity + .000001 < quantity)
                        throw new Error('持仓数量不足。');
                    const soldQuantity = Math.min(position.quantity, quantity);
                    const proceeds = this.roundMoney(this.price(this.find(instrumentId, state), state.year, state.seed) * soldQuantity / 10000);
                    state.stats.funds = this.roundMoney(state.stats.funds + proceeds);
                    state.market.realizedProfit = this.roundMoney(state.market.realizedProfit + proceeds - position.averageCost * soldQuantity / 10000);
                    position.quantity = this.roundQuantity(position.quantity - soldQuantity);
                    if (position.quantity <= .000001)
                        state.market.positions = state.market.positions.filter((entry) => entry !== position);
                }
                sellFraction(state, instrumentId, fraction) {
                    if (!Number.isFinite(fraction) || fraction <= 0 || fraction > 1)
                        throw new Error('卖出比例必须在0%到100%之间。');
                    const position = this.position(state, instrumentId);
                    this.sell(state, instrumentId, this.roundQuantity(position.quantity * fraction));
                }
                position(state, instrumentId) { const item = state.market.positions.find((entry) => entry.instrumentId === instrumentId); if (!item)
                    throw new Error('暂无该标的持仓。'); return item; }
                portfolioValue(state) {
                    this.migrateShareUnits(state);
                    return this.roundMoney(state.market.positions.reduce((sum, position) => sum + this.price(this.find(position.instrumentId, state), state.year, state.seed) * position.quantity / 10000, 0));
                }
                find(id, state) { const item = this.catalog(state).find((entry) => entry.id === id); if (!item)
                    throw new Error('当前投资品种尚未开放。'); return item; }
                maybeCreateSignal(state, random) {
                    if (state.year <= 2026 || state.age < 18 || state.pendingMarketSignal)
                        return undefined;
                    const chance = Math.min(.4, .06 + (state.skills.business + state.skills.information) * .002);
                    if (random.next() >= chance)
                        return undefined;
                    const stocks = this.instruments(state).filter((item) => item.kind === 'stock' && item.publicFromYear <= state.year);
                    if (stocks.length === 0)
                        return undefined;
                    const item = stocks[random.int(0, stocks.length - 1)];
                    const targetYear = state.year + random.int(1, 3);
                    const current = this.price(item, state.year, state.seed);
                    const target = this.price(item, targetYear, state.seed);
                    const change = target / Math.max(.01, current) - 1;
                    const direction = Math.abs(change) >= .38 ? '剧烈波动' : change >= 0 ? '上涨' : '下跌';
                    const detail = direction === '剧烈波动' ? '未来将经历明显的大幅波动。' : `未来更可能${direction}。`;
                    return { id: `market-signal-${item.id}-${state.year}`, instrumentId: item.id, title: `${item.name}的市场预告`, description: `你从可靠渠道获得消息：${item.name}在 ${targetYear} 年前${detail}`, direction, targetYear, createdYear: state.year };
                }
                catalog(state) { return [...MarketConfig_1.MARKET_INSTRUMENTS, ...state.market.generatedInstruments]; }
                lotSize(item) { return item.kind === 'stock' ? 100 : 10; }
                migrateShareUnits(state) {
                    const flag = 'market-share-unit-v2';
                    if (state.flags.includes(flag))
                        return;
                    state.market.positions.forEach((position) => { position.quantity = Math.round(position.quantity * 10000); });
                    state.flags.push(flag);
                }
                roundMoney(value) { return Math.round(value * 1000000) / 1000000; }
                roundQuantity(value) { return Math.round(value * 1000000) / 1000000; }
                futurePrice(item, year, seed, anchorYear) {
                    let price = this.historicalPrice(item, anchorYear);
                    for (let cursor = anchorYear + 1; cursor <= year; cursor += 1)
                        price = Math.max(.25, price * this.futureFactor(item.id, cursor, seed));
                    return Math.round(price * 100) / 100;
                }
                futureFactor(id, year, seed) {
                    const regime = this.hash(`${id}:${seed}:${Math.floor((year - 2027) / 3)}`) % 5;
                    const noise = this.hash(`${id}:${seed}:${year}:noise`) / 0xffffffff;
                    if (regime === 0)
                        return 1.12 + noise * .24;
                    if (regime === 1)
                        return .64 + noise * .24;
                    if (regime === 2)
                        return year % 2 ? 1.12 + noise * .34 : .68 + noise * .22;
                    if (regime === 3)
                        return .78 + noise * .62;
                    return noise > .72 ? 1.42 + noise * .38 : .82 + noise * .26;
                }
                hash(value) { let hash = 2166136261; for (let index = 0; index < value.length; index += 1) {
                    hash ^= value.charCodeAt(index);
                    hash = Math.imul(hash, 16777619);
                } return hash >>> 0; }
            };
            exports_1("MarketSystem", MarketSystem);
        }
    };
});












































System.register("chunks:///_virtual/MidLifeEvents.ts",["./EventTemplates.ts"], function (exports_1, context_1) {
    "use strict";
    var EventTemplates_1, MID_LIFE_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EventTemplates_1_1) {
                EventTemplates_1 = EventTemplates_1_1;
            }
        ],
        execute: function () {
            exports_1("MID_LIFE_EVENTS", MID_LIFE_EVENTS = EventTemplates_1.buildTemplateEvents('midlife', [
                ...EventTemplates_1.seedSeries('career', 2026, 5, 8), ...EventTemplates_1.seedSeries('investment', 2027, 4, 8), ...EventTemplates_1.seedSeries('care', 2028, 4, 8),
                ...EventTemplates_1.seedSeries('health', 2029, 3, 8), ...EventTemplates_1.seedSeries('reflection', 2030, 2, 8), ...EventTemplates_1.seedSeries('opportunity', 2031, 2, 7),
            ]));
        }
    };
});












































System.register("chunks:///_virtual/Motion.ts",["cc"], function (exports_1, context_1) {
    "use strict";
    var cc_1, Motion;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            }
        ],
        execute: function () {
            Motion = class Motion {
                static screenEnter(node, delay = 0) {
                    var _a;
                    const opacity = (_a = node.getComponent(cc_1.UIOpacity)) !== null && _a !== void 0 ? _a : node.addComponent(cc_1.UIOpacity);
                    opacity.opacity = 0;
                    const end = node.position.clone();
                    node.setPosition(end.x, end.y - 14, end.z);
                    cc_1.tween(node).delay(delay).parallel(cc_1.tween(node).to(.32, { position: end }, { easing: 'quadOut' }), cc_1.tween(opacity).to(.28, { opacity: 255 }, { easing: 'quadOut' })).start();
                }
                static modalEnter(node) {
                    var _a;
                    if (typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches)
                        return;
                    const opacity = (_a = node.getComponent(cc_1.UIOpacity)) !== null && _a !== void 0 ? _a : node.addComponent(cc_1.UIOpacity);
                    opacity.opacity = 0;
                    node.setScale(new cc_1.Vec3(.96, .96, 1));
                    cc_1.tween(node).parallel(cc_1.tween(opacity).to(.24, { opacity: 255 }), cc_1.tween(node).to(.28, { scale: cc_1.Vec3.ONE }, { easing: 'backOut' })).start();
                }
                static pulse(node) {
                    cc_1.tween(node).repeatForever(cc_1.tween(node).sequence(cc_1.tween(node).to(.7, { scale: new cc_1.Vec3(1.035, 1.035, 1) }), cc_1.tween(node).to(.7, { scale: cc_1.Vec3.ONE }))).start();
                }
                static notice(node, onComplete) {
                    var _a;
                    const opacity = (_a = node.getComponent(cc_1.UIOpacity)) !== null && _a !== void 0 ? _a : node.addComponent(cc_1.UIOpacity);
                    opacity.opacity = 0;
                    const end = node.position.clone();
                    node.setPosition(end.x, end.y - 12, end.z);
                    cc_1.tween(node).sequence(cc_1.tween(node).parallel(cc_1.tween(node).to(.18, { position: end }, { easing: 'quadOut' }), cc_1.tween(opacity).to(.16, { opacity: 255 })), cc_1.tween(node).delay(1.15), cc_1.tween(opacity).to(.22, { opacity: 0 }), cc_1.tween(node).call(onComplete)).start();
                }
                static autoCard(node, onComplete, holdSeconds = 1.2) {
                    var _a;
                    const opacity = (_a = node.getComponent(cc_1.UIOpacity)) !== null && _a !== void 0 ? _a : node.addComponent(cc_1.UIOpacity);
                    opacity.opacity = 0;
                    const end = node.position.clone();
                    node.setPosition(end.x, end.y - 18, end.z);
                    node.setScale(new cc_1.Vec3(.95, .95, 1));
                    cc_1.tween(node).sequence(cc_1.tween(node).parallel(cc_1.tween(node).to(.22, { position: end, scale: cc_1.Vec3.ONE }, { easing: 'backOut' }), cc_1.tween(opacity).to(.18, { opacity: 255 })), cc_1.tween(node).delay(holdSeconds), cc_1.tween(node).parallel(cc_1.tween(node).to(.2, { scale: new cc_1.Vec3(1.025, 1.025, 1) }, { easing: 'quadIn' }), cc_1.tween(opacity).to(.2, { opacity: 0 })), cc_1.tween(node).call(onComplete)).start();
                }
                static progress(node, duration = 1.35) {
                    node.setScale(new cc_1.Vec3(.02, 1, 1));
                    cc_1.tween(node).to(duration, { scale: cc_1.Vec3.ONE }, { easing: 'quadOut' }).start();
                }
            };
            exports_1("Motion", Motion);
        }
    };
});












































System.register("chunks:///_virtual/OpenOpportunitySystem.ts",["./ExplorationConfig.ts", "./ConditionEvaluator.ts", "./RequirementFormatter.ts"], function (exports_1, context_1) {
    "use strict";
    var ExplorationConfig_1, ConditionEvaluator_1, RequirementFormatter_1, OpenOpportunitySystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ExplorationConfig_1_1) {
                ExplorationConfig_1 = ExplorationConfig_1_1;
            },
            function (ConditionEvaluator_1_1) {
                ConditionEvaluator_1 = ConditionEvaluator_1_1;
            },
            function (RequirementFormatter_1_1) {
                RequirementFormatter_1 = RequirementFormatter_1_1;
            }
        ],
        execute: function () {
            OpenOpportunitySystem = class OpenOpportunitySystem {
                constructor() {
                    this.conditions = new ConditionEvaluator_1.ConditionEvaluator();
                    this.formatter = new RequirementFormatter_1.RequirementFormatter();
                }
                actions(state) { return ExplorationConfig_1.EXPLORATION_ACTIONS.filter((action) => this.isAvailable(state, action)); }
                isAvailable(state, action) {
                    if (action.permanentUnlock && state.flags.includes(this.unlockFlag(action)))
                        return true;
                    return (action.yearMin === undefined || state.year >= action.yearMin)
                        && (action.yearMax === undefined || state.year <= action.yearMax)
                        && this.conditions.matchesAll(state, action.prerequisites);
                }
                syncPermanentUnlocks(state) {
                    let changed = false;
                    for (const action of ExplorationConfig_1.EXPLORATION_ACTIONS.filter((item) => item.permanentUnlock)) {
                        const flag = this.unlockFlag(action);
                        const currentlyQualifies = (action.yearMin === undefined || state.year >= action.yearMin)
                            && (action.yearMax === undefined || state.year <= action.yearMax)
                            && this.conditions.matchesAll(state, action.prerequisites);
                        if ((currentlyQualifies || (action.domain === 'housing' && state.housingHoldings.length > 0)) && !state.flags.includes(flag)) {
                            state.flags.push(flag);
                            changed = true;
                        }
                    }
                    return changed;
                }
                lockedReason(state, action) {
                    if (this.isAvailable(state, action))
                        return undefined;
                    return this.requirementText(action);
                }
                requirementText(action) {
                    const requirements = [
                        action.yearMin === undefined ? '' : `${action.yearMin}年后`,
                        this.formatter.formatAll(action.prerequisites),
                    ].filter(Boolean);
                    return requirements.join(' · ') || '无额外条件';
                }
                unlockFlag(action) { return `exploration-${action.id}-unlocked`; }
            };
            exports_1("OpenOpportunitySystem", OpenOpportunitySystem);
        }
    };
});












































System.register("chunks:///_virtual/OpportunityConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var LIFE_CYCLE, OPPORTUNITY_CHAINS, SIGNALS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            LIFE_CYCLE = ['emergence', 'growth', 'boom', 'maturity', 'adjustment'];
            exports_1("OPPORTUNITY_CHAINS", OPPORTUNITY_CHAINS = [
                { id: 'urban-development', name: '城市发展', category: 'era', stages: [...LIFE_CYCLE], description: '迁移、教育资源和工作机会逐渐向城市集中。' },
                { id: 'urban-housing', name: '城市住房', category: 'era', stages: [...LIFE_CYCLE], description: '居住需求、资产价格与家庭负担共同变化。' },
                { id: 'pc-internet', name: '个人电脑互联网', category: 'era', stages: [...LIFE_CYCLE], description: '从家用电脑、社区到软件和互联网公司。' },
                { id: 'ecommerce', name: '电子商务', category: 'era', stages: [...LIFE_CYCLE], description: '从网购习惯、开店到品牌和供应链竞争。' },
                { id: 'mobile-internet', name: '移动互联网', category: 'era', stages: [...LIFE_CYCLE], description: '智能设备、应用服务与移动支付改变生活。' },
                { id: 'content-industry', name: '内容产业', category: 'era', stages: [...LIFE_CYCLE], description: '论坛、博客、自媒体、直播和短视频的演进。' },
                { id: 'new-energy', name: '新能源', category: 'era', stages: [...LIFE_CYCLE], description: '技术积累、支持政策与产业扩张带来新机会。' },
                { id: 'artificial-intelligence', name: '人工智能', category: 'era', stages: [...LIFE_CYCLE], description: '自动化、算法应用和生成式工具改变职业。' },
                { id: 'education-life', name: '教育与专业', category: 'life', stages: [...LIFE_CYCLE], description: '学习与专业选择会长期影响职业入口。' },
                { id: 'family-health-life', name: '家庭健康与陪伴', category: 'life', stages: [...LIFE_CYCLE], description: '健康和陪伴具有长期且不可逆的价值。' },
            ]);
            exports_1("SIGNALS", SIGNALS = [
                { id: 'signal-city-resource', chainId: 'urban-development', text: '更多教育和就业资源正在向城市集中。', confidence: 65 },
                { id: 'signal-pc-home', chainId: 'pc-internet', text: '越来越多家庭开始接触电脑和网络。', confidence: 60 },
                { id: 'signal-ecommerce-orders', chainId: 'ecommerce', text: '身边有人开始通过网络购买商品。', confidence: 65 },
                { id: 'signal-mobile-users', chainId: 'mobile-internet', text: '智能设备用户增长，应用服务开始增加。', confidence: 75 },
                { id: 'signal-content-creators', chainId: 'content-industry', text: '个人表达开始积累稳定的关注者。', confidence: 70 },
                { id: 'signal-housing-demand', chainId: 'urban-housing', text: '城市居住需求与通勤成本正在变化。', confidence: 60 },
                { id: 'signal-energy-policy', chainId: 'new-energy', text: '新能源技术和产业支持被频繁讨论。', confidence: 60 },
                { id: 'signal-ai-tooling', chainId: 'artificial-intelligence', text: '智能工具开始帮助人们完成重复和创作工作。', confidence: 80 },
                { id: 'signal-family-time', chainId: 'family-health-life', text: '家人需要的陪伴比想象中更难替代。', confidence: 85 },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/OpportunityEvents.ts",["./EventTemplates.ts"], function (exports_1, context_1) {
    "use strict";
    var EventTemplates_1, OPPORTUNITY_EVENTS, OPPORTUNITY_CONTENT_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EventTemplates_1_1) {
                EventTemplates_1 = EventTemplates_1_1;
            }
        ],
        execute: function () {
            exports_1("OPPORTUNITY_EVENTS", OPPORTUNITY_EVENTS = [
                { id: 'signal-city', title: '城市的消息', description: '亲戚谈起城市里更多的学校和工作机会。', yearMin: 2004, yearMax: 2008, weight: 55, options: [
                        { id: 'notice', label: '认真整理城市信息', result: { signalIds: ['signal-city-resource'], skills: { information: 3 }, stats: { pressure: 2, happiness: -1 }, opportunity: { chainId: 'urban-development', stage: 'emergence', entered: false } } },
                        { id: 'ignore', label: '把时间留给眼前生活', result: { stats: { happiness: 3, pressure: -2 } } },
                    ] },
                { id: 'signal-pc-internet', title: '电脑与网络的声音', description: '网吧、论坛和个人网站开始出现在同学们的谈话里。', yearMin: 2003, yearMax: 2007, weight: 60, options: [
                        { id: 'observe', label: '投入课余时间研究', result: { signalIds: ['signal-pc-home'], skills: { technology: 3, information: 2 }, stats: { pressure: 3, happiness: -2 }, opportunity: { chainId: 'pc-internet', stage: 'emergence', entered: false } } },
                        { id: 'pass', label: '和同学轻松体验', result: { skills: { expression: 2 }, stats: { happiness: 2, pressure: -1 } } },
                    ] },
                { id: 'opportunity-pc-entry', title: '互联网行业的入口', description: '一个小团队需要愿意学习网站和软件的人。未成年阶段只能学习和参与体验，不能以本人名义投资。', yearMin: 2007, yearMax: 2011, weight: 60, interaction: 'life-choice', prerequisites: ['flags.computer-intro'], options: [
                        { id: 'learn', label: '投入时间学习技术', result: { skills: { technology: 8 }, stats: { pressure: 3 }, opportunity: { chainId: 'pc-internet', stage: 'growth', entered: true }, addFlags: ['pc-industry-entry'] } },
                        { id: 'watch', label: '继续观察行业', result: { skills: { information: 3 }, opportunity: { chainId: 'pc-internet', stage: 'growth', entered: false } } },
                    ] },
                { id: 'signal-ecommerce', title: '新的购物方式', description: '有人开始在网上买东西，也有人尝试把商品卖给陌生人。', yearMin: 2008, yearMax: 2012, weight: 65, options: [
                        { id: 'research', label: '花时间研究交易和物流', result: { signalIds: ['signal-ecommerce-orders'], skills: { business: 3, information: 2 }, stats: { pressure: 3, happiness: -1 }, opportunity: { chainId: 'ecommerce', stage: 'emergence', entered: false } } },
                        { id: 'ignore', label: '保留精力，等待更多证据', result: { stats: { happiness: 2, pressure: -2 }, skills: { information: 1 } } },
                    ] },
                { id: 'opportunity-ecommerce-entry', title: '标准商品网店试营', description: '日用小商品的线上订单正在增长，货源、包装和配送决定能否持续经营。', yearMin: 2011, yearMax: 2015, weight: 55, interaction: 'opportunity', declineAllowed: true, options: [
                        { id: 'store', label: '投入20万元建立仓配与网店持仓', result: { projectInvestment: { projectId: 'online-retail-fulfillment', amount: 20 }, stats: { pressure: 5 }, skills: { business: 6, management: 2 }, opportunity: { chainId: 'ecommerce', stage: 'growth', entered: true }, addFlags: ['ecommerce-entry', 'industry-invested-online-retail-fulfillment'] } },
                        { id: 'supply', label: '先学习供应链', result: { skills: { business: 4 }, opportunity: { chainId: 'ecommerce', stage: 'growth', entered: false } } },
                    ] },
                { id: 'signal-mobile', title: '口袋里的屏幕', description: '越来越多人通过手机获取服务、付款和社交。', yearMin: 2011, yearMax: 2014, weight: 75, options: [
                        { id: 'follow', label: '持续跟踪用户变化', result: { signalIds: ['signal-mobile-users'], skills: { information: 4 }, stats: { pressure: 2 }, opportunity: { chainId: 'mobile-internet', stage: 'emergence', entered: false } } },
                        { id: 'wait', label: '等行业成熟再投入', result: { stats: { happiness: 2, pressure: -2 }, skills: { business: 1 } } },
                    ] },
                { id: 'opportunity-mobile-entry', title: '移动生活服务团队岗位', description: '一家移动生活服务团队正在招聘产品、技术和运营人员。', yearMin: 2014, yearMax: 2017, weight: 65, interaction: 'opportunity', declineAllowed: true, options: [
                        { id: 'join', label: '进入移动服务团队', result: { skills: { technology: 4, management: 3 }, stats: { funds: 18, pressure: 4 }, opportunity: { chainId: 'mobile-internet', stage: 'growth', entered: true }, addFlags: ['mobile-entry'] } },
                        { id: 'study', label: '先补足能力', result: { skills: { technology: 5 }, opportunity: { chainId: 'mobile-internet', stage: 'growth', entered: false } } },
                    ] },
                { id: 'signal-content', title: '个人表达的机会', description: '有人靠持续创作获得了大量关注，但收入仍不稳定。', yearMin: 2014, yearMax: 2018, weight: 70, options: [
                        { id: 'signal', label: '分析内容趋势并试做', result: { signalIds: ['signal-content-creators'], skills: { expression: 3, information: 2 }, stats: { pressure: 3 }, opportunity: { chainId: 'content-industry', stage: 'growth', entered: false } } },
                        { id: 'pass', label: '暂不投入，维持生活节奏', result: { stats: { happiness: 2, pressure: -2 } } },
                    ] },
                { id: 'opportunity-content-entry', title: '建立垂直内容账号', description: '你可以围绕一个具体领域持续创作，通过广告和项目合作尝试变现。', yearMin: 2016, yearMax: 2021, weight: 60, interaction: 'opportunity', declineAllowed: true, options: [
                        { id: 'create', label: '投入12万元建立内容工作室持仓', result: { projectInvestment: { projectId: 'short-video-studio', amount: 12 }, skills: { expression: 6, business: 3 }, stats: { pressure: 5 }, opportunity: { chainId: 'content-industry', stage: 'boom', entered: true }, addFlags: ['content-entry', 'industry-invested-short-video-studio'] } },
                        { id: 'observe', label: '继续观察', result: { skills: { information: 3 } } },
                    ] },
                { id: 'signal-housing', title: '居住成本的变化', description: '租金、通勤和住房讨论开始影响身边人的选择。', yearMin: 2014, yearMax: 2020, weight: 55, options: [
                        { id: 'notice', label: '记录成本和趋势', result: { signalIds: ['signal-housing-demand'], skills: { information: 3 }, opportunity: { chainId: 'urban-housing', stage: 'growth', entered: false } } },
                        { id: 'ignore', label: '以后再考虑', result: { stats: { happiness: 1 } } },
                    ] },
                { id: 'signal-energy', title: '新能源的产业消息', description: '技术、政策和产业投资开始在新闻中频繁出现。', yearMin: 2017, yearMax: 2022, weight: 55, options: [
                        { id: 'research', label: '追踪产业消息', result: { signalIds: ['signal-energy-policy'], skills: { information: 4, technology: 2 }, opportunity: { chainId: 'new-energy', stage: 'growth', entered: false } } },
                        { id: 'wait', label: '等待更明确的机会', result: { stats: { pressure: -1 } } },
                    ] },
                { id: 'signal-ai', title: '智能工具的涌现', description: '生成式工具开始帮助人们写作、编程和分析信息。', yearMin: 2022, yearMax: 2026, weight: 90, options: [
                        { id: 'learn', label: '投入时间学习并尝试工具', result: { signalIds: ['signal-ai-tooling'], skills: { technology: 6, information: 4 }, stats: { pressure: 6, happiness: -2 }, opportunity: { chainId: 'artificial-intelligence', stage: 'growth', entered: true }, addFlags: ['ai-entry'] } },
                        { id: 'observe', label: '先观察行业应用', result: { signalIds: ['signal-ai-tooling'], skills: { information: 3 }, stats: { happiness: 2, pressure: -1 }, opportunity: { chainId: 'artificial-intelligence', stage: 'growth', entered: false } } },
                    ] },
            ]);
            exports_1("OPPORTUNITY_CONTENT_EVENTS", OPPORTUNITY_CONTENT_EVENTS = EventTemplates_1.buildTemplateEvents('opportunity', [
                ...EventTemplates_1.seedSeries('opportunity', 2004, 4, 4), ...EventTemplates_1.seedSeries('opportunity', 2008, 4, 5, ['flags.computer-intro']),
                ...EventTemplates_1.seedSeries('opportunity', 2011, 4, 5, ['skills.information>=18']), ...EventTemplates_1.seedSeries('opportunity', 2015, 3, 5, ['flags.career-started']),
                ...EventTemplates_1.seedSeries('investment', 2017, 3, 5, ['flags.career-started']),
            ]));
        }
    };
});












































System.register("chunks:///_virtual/OpportunitySystem.ts",["./OpportunityConfig.ts"], function (exports_1, context_1) {
    "use strict";
    var OpportunityConfig_1, OpportunitySystem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (OpportunityConfig_1_1) {
                OpportunityConfig_1 = OpportunityConfig_1_1;
            }
        ],
        execute: function () {
            OpportunitySystem = class OpportunitySystem {
                signalText(id) { var _a, _b; return (_b = (_a = OpportunityConfig_1.SIGNALS.find((signal) => signal.id === id)) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : '尚未辨明的时代信号'; }
                chainName(id) { var _a, _b; return (_b = (_a = OpportunityConfig_1.OPPORTUNITY_CHAINS.find((chain) => chain.id === id)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '未命名机遇'; }
                hasSignalForChain(state, chainId) {
                    return state.discoveredSignalIds.some((id) => { var _a; return ((_a = OpportunityConfig_1.SIGNALS.find((signal) => signal.id === id)) === null || _a === void 0 ? void 0 : _a.chainId) === chainId; });
                }
                applyProgress(state, progress) {
                    const existing = state.opportunities.find((item) => item.chainId === progress.chainId);
                    if (existing)
                        Object.assign(existing, progress);
                    else
                        state.opportunities.push(Object.assign({}, progress));
                }
            };
            exports_1("OpportunitySystem", OpportunitySystem);
        }
    };
});












































System.register("chunks:///_virtual/PortraitGameUI.ts",["cc", "./AbilityConfig.ts", "./ExplorationConfig.ts", "./OpenOpportunitySystem.ts", "./CareerSystem.ts", "./WealthSystem.ts", "./Motion.ts", "./UITheme.ts", "./LifeScene.ts", "./LifePresentation.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, AbilityConfig_1, ExplorationConfig_1, OpenOpportunitySystem_1, CareerSystem_1, WealthSystem_1, Motion_1, UITheme_1, LifeScene_1, LifePresentation_1, CAREERS, EDUCATION, FOCUS, CITIES, PortraitGameUI;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (AbilityConfig_1_1) {
                AbilityConfig_1 = AbilityConfig_1_1;
            },
            function (ExplorationConfig_1_1) {
                ExplorationConfig_1 = ExplorationConfig_1_1;
            },
            function (OpenOpportunitySystem_1_1) {
                OpenOpportunitySystem_1 = OpenOpportunitySystem_1_1;
            },
            function (CareerSystem_1_1) {
                CareerSystem_1 = CareerSystem_1_1;
            },
            function (WealthSystem_1_1) {
                WealthSystem_1 = WealthSystem_1_1;
            },
            function (Motion_1_1) {
                Motion_1 = Motion_1_1;
            },
            function (UITheme_1_1) {
                UITheme_1 = UITheme_1_1;
            },
            function (LifeScene_1_1) {
                LifeScene_1 = LifeScene_1_1;
            },
            function (LifePresentation_1_1) {
                LifePresentation_1 = LifePresentation_1_1;
            }
        ],
        execute: function () {
            CAREERS = { technology: '技术研发', product: '产品运营', sales: '销售外贸', education: '教育研究', media: '内容传媒', 'public-service': '公共服务', unemployed: '尚未就业' };
            EDUCATION = { primary: '小学', middle: '初中', high: '高中', vocational: '中专', college: '专科', undergraduate: '普通本科', 'first-tier': '一本', '211': '211大学', '985': '985大学', graduate: '研究生' };
            FOCUS = { study: '学习成长', work: '努力工作', rest: '休息恢复', social: '游玩陪伴' };
            CITIES = { rural: '乡镇', county: '县城', city: '城市', metropolis: '大城市' };
            PortraitGameUI = class PortraitGameUI {
                constructor(root, session, rollOffers) {
                    this.root = root;
                    this.session = session;
                    this.rollOffers = rollOffers;
                    this.cursor = 0;
                    this.viewportHeight = 0;
                    this.activeTab = '此刻';
                    this.offers = [];
                    this.refreshes = 3;
                    this.familySection = 'overview';
                    this.showAllHistory = false;
                    this.showLockedFamilies = false;
                    this.revision = 0;
                    this.scrollOffsets = new Map();
                    this.redraw = () => this.home();
                    this.toasts = [];
                    this.focusRows = {};
                }
                resize(layout) {
                    this.layout = layout;
                    cc_1.view.setFrameSize(layout.width, layout.height);
                    cc_1.view.setDesignResolutionSize(layout.designWidth, layout.designHeight, cc_1.ResolutionPolicy.SHOW_ALL);
                    this.root.getComponent(cc_1.UITransform).setContentSize(layout.designWidth, layout.designHeight);
                    this.root.setScale(1, 1, 1);
                    this.redraw();
                }
                audit() {
                    const issues = [];
                    const visit = (node) => {
                        const t = node.getComponent(cc_1.UITransform);
                        for (const child of node.children) {
                            const c = child.getComponent(cc_1.UITransform);
                            if (t && c && !['PortraitScroll', 'PortraitContent', 'PortraitModal', 'ModalScroll', 'ModalContent'].includes(node.name)) {
                                if (Math.abs(child.position.x) + c.width / 2 > t.width / 2 + 1 || Math.abs(child.position.y) + c.height / 2 > t.height / 2 + 1)
                                    issues.push(`元素越界：${child.name}`);
                            }
                            visit(child);
                        }
                    };
                    visit(this.root);
                    return { revision: this.revision, issues };
                }
                box(parent, width, height, x = 0, y = 0, color = UITheme_1.UITheme.surface) {
                    const node = new cc_1.Node('PortraitCard');
                    node.layer = this.root.layer;
                    node.addComponent(cc_1.UITransform).setContentSize(width, height);
                    node.setPosition(x, y);
                    parent.addChild(node);
                    this.paint(node, color);
                    return node;
                }
                paint(node, fill, selected = false) {
                    var _a;
                    const t = node.getComponent(cc_1.UITransform);
                    const g = (_a = node.getComponent(cc_1.Graphics)) !== null && _a !== void 0 ? _a : node.addComponent(cc_1.Graphics);
                    g.clear();
                    g.fillColor = fill;
                    g.roundRect(-t.width / 2, -t.height / 2, t.width, t.height, 12);
                    g.fill();
                    const borderedSurface = fill === UITheme_1.UITheme.surface || fill === UITheme_1.UITheme.ink850 || fill === UITheme_1.UITheme.disabledSurface || fill === UITheme_1.UITheme.surfaceRaised;
                    if (selected) {
                        g.strokeColor = UITheme_1.UITheme.gold;
                        g.lineWidth = 4;
                        g.roundRect(-t.width / 2 + 2, -t.height / 2 + 2, t.width - 4, t.height - 4, 16);
                        g.stroke();
                    }
                    else if (borderedSurface) {
                        g.strokeColor = UITheme_1.UITheme.line;
                        g.lineWidth = 1;
                        g.roundRect(-t.width / 2 + .5, -t.height / 2 + .5, t.width - 1, t.height - 1, 17.5);
                        g.stroke();
                    }
                }
                backdrop(height) {
                    const node = new cc_1.Node('PortraitPaperBackground');
                    node.layer = this.root.layer;
                    node.addComponent(cc_1.UITransform).setContentSize(this.layout.designWidth, height);
                    this.root.addChild(node);
                    const g = node.addComponent(cc_1.Graphics);
                    g.fillColor = UITheme_1.UITheme.ink900;
                    g.roundRect(-this.layout.designWidth / 2, -height / 2, this.layout.designWidth, height, 0);
                    g.fill();
                }
                measureText(parent, value, size, width, serif = false) {
                    const probe = new cc_1.Node('TextMeasure');
                    probe.layer = this.root.layer;
                    const transform = probe.addComponent(cc_1.UITransform);
                    transform.setContentSize(width, 1);
                    parent.addChild(probe);
                    const label = probe.addComponent(cc_1.Label);
                    label.string = value;
                    label.fontSize = size;
                    label.lineHeight = Math.ceil(size * 1.45);
                    label.fontFamily = serif ? UITheme_1.UITheme.serif : UITheme_1.UITheme.sans;
                    label.useSystemFont = true;
                    label.enableWrapText = true;
                    label.overflow = cc_1.Label.Overflow.RESIZE_HEIGHT;
                    label.updateRenderData(true);
                    const height = Math.max(transform.height, label.lineHeight);
                    probe.removeFromParent();
                    probe.destroy();
                    return height;
                }
                text(parent, value, size, width, height, x, y, color = UITheme_1.UITheme.text, center = false, serif = false) {
                    const node = new cc_1.Node(`PortraitText:${value.slice(0, 20)}`);
                    node.layer = this.root.layer;
                    node.addComponent(cc_1.UITransform).setContentSize(width, height);
                    node.setPosition(x, y);
                    parent.addChild(node);
                    const label = node.addComponent(cc_1.Label);
                    label.string = value;
                    label.fontSize = size;
                    label.lineHeight = Math.ceil(size * 1.45);
                    label.fontFamily = serif ? UITheme_1.UITheme.serif : UITheme_1.UITheme.sans;
                    label.useSystemFont = true;
                    label.color = color;
                    label.enableWrapText = true;
                    label.overflow = cc_1.Label.Overflow.RESIZE_HEIGHT;
                    label.horizontalAlign = center ? cc_1.Label.HorizontalAlign.CENTER : cc_1.Label.HorizontalAlign.LEFT;
                    label.verticalAlign = cc_1.Label.VerticalAlign.CENTER;
                    label.updateRenderData(true);
                    return label;
                }
                clearScreen() {
                    var _a;
                    if (this.pageKey && ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.node.isValid))
                        this.scrollOffsets.set(this.pageKey, Math.max(0, this.scroll.getScrollOffset().y));
                    this.pageKey = undefined;
                    this.activeModal = undefined;
                    this.toasts = [];
                    this.focusRows = {};
                    for (const child of [...this.root.children]) {
                        child.removeFromParent();
                        child.destroy();
                    }
                }
                createOverlay() {
                    this.overlay = new cc_1.Node('PortraitOverlay');
                    this.overlay.layer = this.root.layer;
                    this.overlay.addComponent(cc_1.UITransform).setContentSize(this.layout.designWidth, this.layout.designHeight);
                    this.root.addChild(this.overlay);
                }
                clickable(node, action, confirm = false, color = UITheme_1.UITheme.surface) {
                    const button = node.addComponent(cc_1.Button);
                    button.transition = cc_1.Button.Transition.NONE;
                    node.on(cc_1.Button.EventType.CLICK, () => {
                        var _a, _b;
                        if (confirm) {
                            const labels = node.children.map(child => child.getComponent(cc_1.Label)).filter((label) => !!label);
                            this.openConfirmModal((_b = (_a = labels[0]) === null || _a === void 0 ? void 0 : _a.string) !== null && _b !== void 0 ? _b : '确认操作', labels.slice(1).map(label => label.string).join('\n') || '这项选择将立即生效。', () => { this.closeModal(); action(); }, () => this.closeModal());
                        }
                        else
                            action();
                    });
                }
                page(title, subtitle, tab, back, dock) {
                    var _a;
                    this.revision++;
                    this.clearScreen();
                    this.pageKey = `${title}:${title === '家底' ? this.familySection : ''}`;
                    const savedOffset = (_a = this.scrollOffsets.get(this.pageKey)) !== null && _a !== void 0 ? _a : 0;
                    const revision = this.revision;
                    setTimeout(() => { var _a; if (this.root.isValid && revision === this.revision && ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.node.isValid))
                        this.scroll.scrollToOffset(new cc_1.Vec2(0, Math.min(savedOffset, Math.max(0, this.cursor - this.viewportHeight))), 0); }, 0);
                    const h = this.layout.designHeight;
                    this.backdrop(h);
                    const top = h / 2 - this.layout.safeTop;
                    this.text(this.root, title, 38, back ? 520 : 650, 64, back ? 40 : 0, top - 38, UITheme_1.UITheme.text, false, true);
                    if (back) {
                        const node = this.box(this.root, 72, 64, -300, top - 38, UITheme_1.UITheme.ink850);
                        this.text(node, '‹', 42, 60, 60, 0, 0, UITheme_1.UITheme.gold, true);
                        this.clickable(node, back);
                    }
                    this.text(this.root, subtitle, 24, 648, 70, 0, top - 107, UITheme_1.UITheme.muted);
                    const bottom = -h / 2 + this.layout.safeBottom;
                    const bodyTop = top - 155;
                    const bodyBottom = bottom + (tab ? 98 : 16) + (dock ? 104 : 0);
                    this.viewportHeight = Math.max(300, bodyTop - bodyBottom);
                    const scroller = new cc_1.Node('PortraitScroll');
                    scroller.layer = this.root.layer;
                    scroller.addComponent(cc_1.UITransform).setContentSize(680, this.viewportHeight);
                    scroller.setPosition(0, (bodyTop + bodyBottom) / 2);
                    this.root.addChild(scroller);
                    scroller.addComponent(cc_1.Mask).type = cc_1.Mask.Type.GRAPHICS_RECT;
                    this.scroll = scroller.addComponent(cc_1.ScrollView);
                    this.scroll.horizontal = false;
                    this.scroll.vertical = true;
                    this.scroll.cancelInnerEvents = true;
                    this.scroll.elastic = true;
                    this.content = new cc_1.Node('PortraitContent');
                    this.content.layer = this.root.layer;
                    const transform = this.content.addComponent(cc_1.UITransform);
                    transform.setAnchorPoint(.5, 1);
                    transform.setContentSize(680, this.viewportHeight);
                    this.content.setPosition(0, this.viewportHeight / 2);
                    scroller.addChild(this.content);
                    this.scroll.content = this.content;
                    this.cursor = 8;
                    this.createOverlay();
                    if (tab) {
                        this.activeTab = tab;
                        ['此刻', '打算', '家底', '足迹'].forEach((name, i) => {
                            const node = this.box(this.root, 154, 78, (i - 1.5) * 168, bottom + 43, name === tab ? UITheme_1.UITheme.gold : UITheme_1.UITheme.ink850);
                            this.text(node, name, 27, 140, 56, 0, 0, name === tab ? UITheme_1.UITheme.ink900 : UITheme_1.UITheme.text, true);
                            this.clickable(node, () => name === '此刻' ? this.life() : name === '打算' ? this.plans() : name === '家底' ? this.assets() : this.archive());
                        });
                    }
                    if (dock) {
                        const node = this.box(this.root, 648, 84, 0, bottom + (tab ? 148 : 60), UITheme_1.UITheme.gold);
                        this.text(node, dock.text, 30, 600, 60, 0, 0, UITheme_1.UITheme.ink900, true);
                        this.clickable(node, dock.action);
                    }
                    if (this.layout.formFactor === 'desktop')
                        this.desktopRail(title, subtitle);
                }
                desktopRail(title, subtitle) {
                    const x = 470, h = this.layout.designHeight;
                    const rail = this.box(this.root, 230, 278, -x, 12, UITheme_1.UITheme.ink850);
                    rail.name = 'DesktopContextRail';
                    this.text(rail, '重来', 33, 180, 50, 0, 95, UITheme_1.UITheme.gold, true, true);
                    this.text(rail, '人生不是一张报表。\n每年只做一个决定，\n然后看看它留下什么。', 22, 178, 118, 0, 2, UITheme_1.UITheme.muted, true);
                    const guide = this.box(this.root, 230, 170, x, -h / 2 + 126, UITheme_1.UITheme.surfaceRaised);
                    guide.name = 'DesktopGuideRail';
                    this.text(guide, title, 24, 178, 76, 0, 38, UITheme_1.UITheme.text, true, true);
                    this.text(guide, subtitle, 18, 178, 62, 0, -35, UITheme_1.UITheme.muted, true);
                }
                row(title, body = '', action, color = UITheme_1.UITheme.surface, confirm = false, muted = false) {
                    const contentWidth = action ? 540 : 596;
                    const contentX = action ? -20 : 0;
                    const th = this.measureText(this.content, title, 30, contentWidth), bh = body ? this.measureText(this.content, body, 26, contentWidth) : 0;
                    const height = Math.max(88, th + bh + (body ? 14 : 0) + 36);
                    const node = this.box(this.content, 648, height, 0, -this.cursor - height / 2, color);
                    this.text(node, title, 30, contentWidth, th, contentX, height / 2 - 18 - th / 2, muted ? UITheme_1.UITheme.muted : color === UITheme_1.UITheme.gold ? UITheme_1.UITheme.ink900 : UITheme_1.UITheme.text);
                    if (body)
                        this.text(node, body, 26, contentWidth, bh, contentX, -height / 2 + 18 + bh / 2, muted ? UITheme_1.UITheme.quiet : color === UITheme_1.UITheme.gold ? UITheme_1.UITheme.ink900 : UITheme_1.UITheme.muted);
                    if (action) {
                        this.text(node, '›', 38, 32, 52, 286, 0, color === UITheme_1.UITheme.gold ? UITheme_1.UITheme.ink900 : UITheme_1.UITheme.muted, true);
                        this.clickable(node, action, confirm, color);
                    }
                    this.cursor += height + 18;
                    this.content.getComponent(cc_1.UITransform).height = Math.max(this.viewportHeight, this.cursor + 8);
                    return node;
                }
                notify(message, dismissOnTap = false) {
                    const display = dismissOnTap ? `${message}\n点击此处关闭` : message;
                    const height = this.measureText(this.overlay, display, 26, 570) + 32;
                    if (this.toasts.length >= 3) {
                        const oldest = this.toasts.shift();
                        if (oldest === null || oldest === void 0 ? void 0 : oldest.isValid)
                            oldest.destroy();
                    }
                    const y = -this.layout.designHeight / 2 + this.layout.safeBottom + 116 + height / 2 + this.toasts.length * 18;
                    const node = this.box(this.overlay, 620, height, 0, y, UITheme_1.UITheme.ink850);
                    this.toasts.push(node);
                    this.text(node, display, 26, 570, height - 24, 0, 0, UITheme_1.UITheme.goldSoft, true);
                    const dismiss = () => { this.toasts = this.toasts.filter((toast) => toast !== node); if (node.isValid)
                        node.destroy(); };
                    if (dismissOnTap)
                        this.clickable(node, dismiss);
                    else
                        setTimeout(dismiss, 2900);
                }
                attempt(action, back, message, keepNotice = false) {
                    try {
                        let before;
                        try {
                            before = this.session.snapshot();
                        }
                        catch (_a) { }
                        action();
                        const after = this.session.snapshot();
                        back();
                        if (before && before.year === after.year) {
                            const delta = { attributes: {}, skills: {}, stats: {} };
                            for (const group of ['attributes', 'skills', 'stats']) {
                                for (const [key, value] of Object.entries(after[group])) {
                                    const precision = key === 'funds' ? 10000 : 100;
                                    const amount = Math.round((value - before[group][key]) * precision) / precision;
                                    if (amount)
                                        delta[group][key] = amount;
                                }
                            }
                            const educationDelta = Math.round((after.education.admissionScore - before.education.admissionScore) * 100) / 100;
                            const deltaText = [AbilityConfig_1.changeText(delta), educationDelta ? `升学评估 ${educationDelta > 0 ? '+' : ''}${educationDelta}` : ''].filter(Boolean).join(' · ');
                            message = [after.lifeLog.length > before.lifeLog.length ? this.session.getLatestOutcome() : undefined, deltaText || message].filter(Boolean).join('\n');
                        }
                        if (message && keepNotice)
                            this.openMessage('选择留下的回声', message + '\n\n这次结果已保存在「足迹」。', () => this.closeModal(), '回到此刻');
                        else if (message)
                            this.notify(message);
                    }
                    catch (error) {
                        this.notify(error instanceof Error ? error.message : '暂时无法完成。');
                    }
                }
                confirm(title, message, action, back) {
                    this.openConfirmModal(title, message, () => { this.closeModal(); action(); }, () => { this.closeModal(); back(); });
                }
                closeModal() {
                    var _a;
                    this.activeModal = undefined;
                    if (!((_a = this.overlay) === null || _a === void 0 ? void 0 : _a.isValid))
                        return;
                    for (const child of [...this.overlay.children])
                        if (child.name === 'PortraitModal' || child.name === 'ModalVeil') {
                            child.removeFromParent();
                            child.destroy();
                        }
                }
                modalVeil(onTap) {
                    this.closeModal();
                    this.overlay.removeFromParent();
                    this.root.addChild(this.overlay);
                    const veil = new cc_1.Node('ModalVeil');
                    veil.layer = this.root.layer;
                    const h = this.layout.designHeight, w = this.layout.designWidth;
                    veil.addComponent(cc_1.UITransform).setContentSize(w, h);
                    this.overlay.addChild(veil);
                    const g = veil.addComponent(cc_1.Graphics);
                    g.fillColor = new cc_1.Color(36, 30, 23, 153);
                    g.roundRect(-w / 2, -h / 2, w, h, 0);
                    g.fill();
                    veil.addComponent(cc_1.BlockInputEvents);
                    if (onTap)
                        this.clickable(veil, onTap);
                    return veil;
                }
                createModal(width, height, footerHeight, title, date = '') {
                    const modal = this.box(this.overlay, width, height, 0, 0, UITheme_1.UITheme.surface);
                    modal.name = 'PortraitModal';
                    this.activeModal = modal;
                    const innerWidth = width - 64, headerHeight = this.modalHeaderHeight(title, width, date), contentHeight = Math.max(80, height - headerHeight - footerHeight);
                    const titleH = this.measureText(modal, title, 32, innerWidth, true);
                    if (date)
                        this.text(modal, date, 21, innerWidth, 32, 0, height / 2 - 27, UITheme_1.UITheme.gold);
                    this.text(modal, title, 32, innerWidth, titleH, 0, height / 2 - (date ? 56 : 18) - titleH / 2, UITheme_1.UITheme.text, false, true);
                    const scrollNode = new cc_1.Node('ModalScroll');
                    scrollNode.layer = this.root.layer;
                    scrollNode.addComponent(cc_1.UITransform).setContentSize(innerWidth, contentHeight);
                    scrollNode.setPosition(0, -height / 2 + footerHeight + contentHeight / 2);
                    modal.addChild(scrollNode);
                    scrollNode.addComponent(cc_1.Mask).type = cc_1.Mask.Type.GRAPHICS_RECT;
                    const scroll = scrollNode.addComponent(cc_1.ScrollView);
                    scroll.horizontal = false;
                    scroll.vertical = true;
                    scroll.cancelInnerEvents = true;
                    scroll.elastic = true;
                    const content = new cc_1.Node('ModalContent');
                    content.layer = this.root.layer;
                    const transform = content.addComponent(cc_1.UITransform);
                    transform.setAnchorPoint(.5, 1);
                    transform.setContentSize(innerWidth, contentHeight);
                    content.setPosition(0, contentHeight / 2);
                    scrollNode.addChild(content);
                    scroll.content = content;
                    Motion_1.Motion.modalEnter(modal);
                    return { modal, content, contentHeight };
                }
                addModalFooter(modal, width, height, primary, onPrimary, secondary, onSecondary) {
                    const y = -height / 2 + 48, w = (width - 80) / 2;
                    const cancel = this.box(modal, w, 64, -(w + 16) / 2, y, UITheme_1.UITheme.surfaceRaised);
                    this.text(cancel, secondary, 24, w - 20, 42, 0, 0, UITheme_1.UITheme.text, true);
                    this.clickable(cancel, onSecondary);
                    const accept = this.box(modal, w, 64, (w + 16) / 2, y, UITheme_1.UITheme.gold);
                    accept.name = 'ConfirmAction';
                    this.text(accept, primary, 24, w - 20, 42, 0, 0, UITheme_1.UITheme.ink900, true);
                    this.clickable(accept, onPrimary);
                }
                modalHeaderHeight(title, width, date = '') {
                    return this.measureText(this.overlay, title, 32, width - 64, true) + (date ? 74 : 36);
                }
                openConfirmModal(title, message, onConfirm, onCancel) {
                    this.modalVeil(onCancel);
                    const width = 560, footerHeight = 100, headerHeight = this.modalHeaderHeight(title, 560), maxHeight = this.layout.designHeight - this.layout.safeTop - this.layout.safeBottom - 48;
                    const bodyHeight = this.measureText(this.overlay, message, 26, width - 64);
                    const height = Math.min(maxHeight, Math.max(250, headerHeight + footerHeight + bodyHeight + 34));
                    const { modal, content, contentHeight } = this.createModal(width, height, footerHeight, title);
                    this.text(content, message, 26, width - 64, bodyHeight, 0, -bodyHeight / 2, UITheme_1.UITheme.muted);
                    content.getComponent(cc_1.UITransform).height = Math.max(contentHeight, bodyHeight + 16);
                    this.addModalFooter(modal, width, height, '确认', onConfirm, '再想想', onCancel);
                }
                openEventModal(event) {
                    const state = this.session.snapshot(), preview = this.session.educationAdmissionPreview(event.id);
                    const width = 640, innerWidth = width - 64, footerHeight = 150, date = `${state.year} · ${state.age}岁`;
                    const description = [event.description, preview].filter(Boolean).join('\n');
                    const bodyHeight = this.measureText(this.overlay, description, 28, innerWidth);
                    const choices = event.options.map(option => {
                        var _a, _b;
                        const career = this.session.careerChoicePreview(option.id), funding = this.session.choiceFunding(option.id);
                        const familyCost = Math.max(0, -((_b = (_a = option.result.stats) === null || _a === void 0 ? void 0 : _a.familyResources) !== null && _b !== void 0 ? _b : 0));
                        const disabled = !!career && !career.eligible || funding.shortfall > 0 && !funding.offer.canBorrow || familyCost > state.stats.familyResources;
                        const title = option.label.split('｜')[0];
                        const details = [funding.cost ? `确定支出 ${AbilityConfig_1.moneyText(funding.cost)}` : '', familyCost ? `家庭资源支出 ${AbilityConfig_1.moneyText(familyCost)}` : '',
                            career && !career.eligible ? `尚需：${career.unmet.join('、')}` : '',
                            funding.shortfall > 0 ? funding.offer.canBorrow ? `需借款 ${AbilityConfig_1.moneyText(funding.shortfall)} · 年利息约 ${AbilityConfig_1.moneyText(funding.offer.annualInterest)}` : '现金与可用贷款不足' : '',
                            familyCost > state.stats.familyResources ? '家庭资源不足' : ''].filter(Boolean).join('\n');
                        const titleHeight = this.measureText(this.overlay, title, 28, innerWidth - 40, true);
                        const detailHeight = details ? this.measureText(this.overlay, details, 25, innerWidth - 40) : 0;
                        return { option, title, details, disabled, funding, titleHeight, detailHeight, height: titleHeight + detailHeight + (details ? 48 : 36) };
                    });
                    const naturalHeight = bodyHeight + 22 + choices.reduce((sum, c) => sum + c.height + 14, 0);
                    const height = Math.min(this.layout.designHeight - this.layout.safeTop - this.layout.safeBottom - 48, this.modalHeaderHeight(event.title, width, date) + footerHeight + naturalHeight + 12);
                    this.modalVeil();
                    const { modal, content, contentHeight } = this.createModal(width, height, footerHeight, event.title, date);
                    let selected, selectedNode;
                    const summary = this.text(modal, '选择后揭晓结果。', 22, width - 64, 40, 0, -height / 2 + 120, UITheme_1.UITheme.muted, true);
                    let cursor = 0;
                    this.text(content, description, 28, innerWidth, bodyHeight, 0, -bodyHeight / 2, UITheme_1.UITheme.text);
                    cursor += bodyHeight + 22;
                    for (const choice of choices) {
                        const card = this.box(content, innerWidth, choice.height, 0, -cursor - choice.height / 2, choice.disabled ? UITheme_1.UITheme.disabledSurface : UITheme_1.UITheme.surfaceRaised);
                        card.name = 'EventChoice';
                        this.text(card, choice.title, 28, innerWidth - 40, choice.titleHeight, 0, choice.height / 2 - 18 - choice.titleHeight / 2, choice.disabled ? UITheme_1.UITheme.quiet : UITheme_1.UITheme.text, false, true);
                        if (choice.details)
                            this.text(card, choice.details, 25, innerWidth - 40, choice.detailHeight, 0, -choice.height / 2 + 18 + choice.detailHeight / 2, choice.disabled ? UITheme_1.UITheme.muted : UITheme_1.UITheme.info);
                        if (!choice.disabled)
                            this.clickable(card, () => {
                                if (selectedNode)
                                    this.paint(selectedNode, UITheme_1.UITheme.surfaceRaised);
                                selected = choice;
                                selectedNode = card;
                                this.paint(card, UITheme_1.UITheme.surfaceRaised, true);
                                summary.string = choice.funding.cost ? `已选 · 支付 ${AbilityConfig_1.moneyText(choice.funding.cost)}${choice.funding.shortfall > 0 ? '（含借款）' : ''}` : '已选，确认后继续。';
                            });
                        cursor += choice.height + 14;
                    }
                    content.getComponent(cc_1.UITransform).height = Math.max(contentHeight, cursor);
                    const commit = () => {
                        if (!selected) {
                            summary.string = '请先选择上方的一项行动。';
                            return;
                        }
                        const choice = selected;
                        const apply = () => this.attempt(() => choice.funding.shortfall > 0 ? this.session.chooseWithLoan(choice.option.id) : this.session.choose(choice.option.id), () => this.life(), undefined, true);
                        if (choice.funding.shortfall > 0)
                            this.openConfirmModal('借款参与这次选择', `借款 ${AbilityConfig_1.moneyText(choice.funding.shortfall)}\n年利息约 ${AbilityConfig_1.moneyText(choice.funding.offer.annualInterest)}\n总支出 ${AbilityConfig_1.moneyText(choice.funding.cost)}`, () => { this.closeModal(); apply(); }, () => this.openEventModal(event));
                        else {
                            this.closeModal();
                            apply();
                        }
                    };
                    this.addModalFooter(modal, width, height, '确认选择', commit, '稍后再看', () => this.closeModal());
                    if (event.declineAllowed) {
                        const decline = this.box(content, innerWidth, 70, 0, -cursor - 35, UITheme_1.UITheme.surfaceInset);
                        this.text(decline, '放弃这次机会', 25, innerWidth - 32, 40, 0, 0, UITheme_1.UITheme.muted, true);
                        this.clickable(decline, () => this.openConfirmModal('放弃这次机会', event.title + '：放弃后本次机会将结束。', () => this.attempt(() => this.session.declineCurrentEvent(), () => this.life()), () => this.openEventModal(event)));
                        content.getComponent(cc_1.UITransform).height = Math.max(contentHeight, cursor + 86);
                    }
                }
                openMessage(title, message, action, label = '继续生活') {
                    this.modalVeil();
                    const width = 620, footer = 100;
                    const bodyHeight = this.measureText(this.overlay, message, 28, width - 64);
                    const height = Math.min(this.layout.designHeight - this.layout.safeTop - this.layout.safeBottom - 48, this.modalHeaderHeight(title, width) + bodyHeight + footer + 32);
                    const { modal, content, contentHeight } = this.createModal(width, height, footer, title);
                    this.text(content, message, 28, width - 64, bodyHeight, 0, -bodyHeight / 2, UITheme_1.UITheme.text);
                    content.getComponent(cc_1.UITransform).height = Math.max(contentHeight, bodyHeight + 16);
                    const button = this.box(modal, width - 64, 70, 0, -height / 2 + 48, UITheme_1.UITheme.gold);
                    button.name = 'ConfirmAction';
                    this.text(button, label, 28, width - 100, 46, 0, 0, UITheme_1.UITheme.ink900, true);
                    this.clickable(button, () => { this.closeModal(); action(); });
                }
                openReceipt(before, after, close) {
                    var _a, _b;
                    const review = (_a = after.annualReviews) === null || _a === void 0 ? void 0 : _a.find(item => item.year === before.year);
                    this.openMessage(`${before.year}年 · 这一年`, (_b = review === null || review === void 0 ? void 0 : review.text) !== null && _b !== void 0 ? _b : `现金变化 ${AbilityConfig_1.signedMoneyText(after.stats.funds - before.stats.funds)}\n健康 ${Math.round(after.stats.health)} · 幸福 ${Math.round(after.stats.happiness)}\n详细收支已记入家底。`, close);
                }
                home() {
                    this.redraw = () => this.home();
                    this.revision++;
                    this.clearScreen();
                    const h = this.layout.designHeight;
                    this.backdrop(h);
                    const top = h / 2 - this.layout.safeTop, bottom = -h / 2 + this.layout.safeBottom;
                    const hero = (top + bottom) / 2;
                    this.text(this.root, 'RESTART LIFE', 20, 360, 36, 0, hero + 245, UITheme_1.UITheme.gold, true, true);
                    this.text(this.root, '重来', 64, 620, 84, 0, hero + 170, UITheme_1.UITheme.text, true, true);
                    this.text(this.root, '在时代的变化里，重新选择自己的人生。', 25, 600, 52, 0, hero + 103, UITheme_1.UITheme.muted, true);
                    const art = LifeScene_1.LifeScene.draw(this.root, 600, 174, 28);
                    art.setPosition(0, hero - 27);
                    const start = this.box(this.root, 500, 86, 0, hero - 171, UITheme_1.UITheme.gold);
                    this.text(start, '开始重来', 33, 430, 64, 0, 0, UITheme_1.UITheme.ink900, true, true);
                    this.clickable(start, () => { this.refreshes = 3; this.selected = undefined; this.selectedOffer = undefined; this.families(); });
                    if (this.session.hasContinuableSave()) {
                        const resume = this.box(this.root, 500, 76, 0, hero - 267, UITheme_1.UITheme.surface);
                        this.text(resume, '继续人生', 28, 430, 54, 0, 0, UITheme_1.UITheme.text, true);
                        this.clickable(resume, () => this.attempt(() => this.session.tryRestore(), () => this.life()));
                    }
                    if (this.session.hasArchive()) {
                        const archive = this.box(this.root, 280, 52, 0, bottom + 62, UITheme_1.UITheme.ink850);
                        this.text(archive, '人生档案', 22, 230, 40, 0, 0, UITheme_1.UITheme.info, true);
                        this.clickable(archive, () => { this.session.loadArchive(); this.archive(); });
                    }
                    this.createOverlay();
                }
                families() {
                    var _a, _b, _c, _d;
                    this.redraw = () => this.families();
                    this.page('你从怎样的生活出发', '01 / 起点     →     02 / 天赋     →     03 / 人生', undefined, () => this.home(), this.selected ? {
                        text: `从「${this.selected.name}」出发`, action: () => { this.offers = this.rollOffers(); this.selectedOffer = undefined; this.talents(); },
                    } : undefined);
                    const scene = this.box(this.content, 648, 180, 0, -this.cursor - 90, UITheme_1.UITheme.ink900);
                    LifeScene_1.LifeScene.draw(scene, 648, 180, 8, (_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.region) !== null && _b !== void 0 ? _b : 'rural');
                    this.cursor += 198;
                    this.row('有些起点无法选择，这一次可以', '家庭带来不同的资源和机会。长大以后，你仍然可以走向自己的方向。');
                    const descriptions = {
                        'migrant-rural': '家人常年为生计奔忙。你更早学会安排事情，也需要珍惜手里的每一份资源。',
                        'small-town': '熟悉的街道和邻里陪你长大。日子相对安稳，远方的机会需要自己寻找。',
                        'county-business': '你在店铺的忙碌中长大。生意教会你看人识货，也让收入多了一些波动。',
                        'metro-salaried': '企业、学校和通勤组成日常。你更容易接触城市的信息与职业机会。',
                        'scholar-family': '书本与讨论是家里的日常。教育和科研的门，会更早向你打开。',
                        'wealthy-business': '家族积累让你站得更高。商业网络与资金，给了你更大的选择空间。',
                    };
                    const families = this.session.familyUnlockStatuses();
                    for (const { identity, unlocked, requirement } of families) {
                        if (!unlocked && !this.showLockedFamilies)
                            continue;
                        const node = this.row(`${unlocked ? '' : '锁定 · '}${identity.name}`, unlocked ? `${(_c = descriptions[identity.id]) !== null && _c !== void 0 ? _c : identity.opportunityFocus}\n家庭资源 ${AbilityConfig_1.moneyText(identity.initialFamilyResources)} · 年零用钱 ${AbilityConfig_1.moneyText(identity.familyAllowanceAnnual)}` : requirement, unlocked ? () => { this.selected = identity; this.families(); } : undefined, unlocked ? UITheme_1.UITheme.surface : UITheme_1.UITheme.disabledSurface);
                        if (((_d = this.selected) === null || _d === void 0 ? void 0 : _d.id) === identity.id)
                            this.paint(node, UITheme_1.UITheme.surface, true);
                    }
                    const locked = families.filter(item => !item.unlocked).length;
                    if (locked)
                        this.row(this.showLockedFamilies ? '收起其他起点' : `还有 ${locked} 种人生起点`, '完成人生目标后解锁，点击查看条件。', () => { this.showLockedFamilies = !this.showLockedFamilies; this.families(); });
                }
                talents() {
                    var _a;
                    this.redraw = () => this.talents();
                    this.page('选择天赋', this.selectedOffer ? `已选择：${this.selectedOffer.talent.name}` : `选择你的长处 · 可刷新 ${this.refreshes} 次`, undefined, () => this.families(), this.selectedOffer ? {
                        text: `确认天赋「${this.selectedOffer.talent.name}」`, action: () => {
                            if (!this.selected || !this.selectedOffer)
                                return;
                            this.inheritanceChoices = undefined;
                            const begin = () => { this.session.start(this.selected.id); this.session.applyStartup(this.selectedOffer.talent, this.selectedOffer.defect); this.life(); };
                            if (this.session.hasContinuableSave())
                                this.openConfirmModal('开始另一种人生', '当前未结束的人生会被新存档替换。', begin, () => this.closeModal());
                            else
                                begin();
                        },
                    } : undefined);
                    this.row('先认识你的可能性', '天赋会影响起点，往后的路由每一次选择决定。', () => this.abilities(true));
                    for (const { talent, defect } of this.offers) {
                        const rarity = { common: '普通', rare: '稀有', legendary: '传奇' }[talent.rarity];
                        const color = talent.rarity === 'legendary' ? new cc_1.Color(239, 221, 181) : talent.rarity === 'rare' ? new cc_1.Color(232, 221, 197) : UITheme_1.UITheme.surface;
                        const node = this.row(`${rarity} · ${talent.name}`, `${talent.description}\n${AbilityConfig_1.changeText(talent.result)}${defect.id === 'none' ? '' : `\n短板：${defect.name}\n${AbilityConfig_1.changeText(defect.result)}`}`, () => {
                            this.selectedOffer = { talent, defect };
                            this.talents();
                        }, color);
                        if (((_a = this.selectedOffer) === null || _a === void 0 ? void 0 : _a.talent.id) === talent.id)
                            this.paint(node, color, true);
                    }
                    this.row(this.refreshes ? `免费刷新（${this.refreshes}/3）` : '免费刷新已用完', '', this.refreshes ? () => { this.refreshes--; this.selectedOffer = undefined; this.offers = this.rollOffers(); this.talents(); } : undefined, UITheme_1.UITheme.ink850);
                }
                abilities(startup = false) {
                    this.redraw = () => this.abilities(startup);
                    this.page('能力与用途', '了解你的长处，选择适合自己的道路。', startup ? undefined : '此刻', () => startup ? this.talents() : this.life());
                    const state = startup ? undefined : this.session.snapshot();
                    for (const a of AbilityConfig_1.ABILITIES)
                        this.row(`${a.name}${state ? ` ${AbilityConfig_1.abilityValue(state, a)} / 100` : ''}`, a.use);
                    this.row(`知识${state ? ` ${Math.round(state.stats.knowledge)}` : ''}`, '用于继续教育与复杂判断；教育研究岗位要求40。升学录取只看公开的升学评估。');
                    if (state)
                        this.row('身心状态', `健康 ${Math.round(state.stats.health)} · 压力 ${Math.round(state.stats.pressure)} · 幸福 ${Math.round(state.stats.happiness)}`);
                    this.row('健康 · 压力 · 幸福', '健康影响工作收入，过低会触发结局；压力过高会损耗健康和幸福；幸福耗尽会结束人生。');
                }
                life() {
                    var _a, _b, _c, _d;
                    this.redraw = () => this.life();
                    const state = this.session.snapshot();
                    if (state.completed) {
                        this.ending();
                        return;
                    }
                    const event = this.session.getCurrentEvent();
                    const forecast = this.session.financeForecast();
                    this.page(`${state.year} · ${state.age}岁`, `${EDUCATION[state.education.level]} · ${state.age < 22 ? LifePresentation_1.chapter(state.age) : CAREERS[state.career.track]} · ${CITIES[state.education.city]}`, '此刻', undefined, { text: event ? (event.informational || event.interaction === 'information' ? '阅读今年的消息' : '作出今年的选择') : '度过这一年', action: () => event ? this.openEventModal(event) : this.advance() });
                    const profile = this.box(this.root, 96, 60, 275, this.layout.designHeight / 2 - this.layout.safeTop - 38, UITheme_1.UITheme.surfaceRaised);
                    this.text(profile, '档案', 25, 80, 42, 0, 0, UITheme_1.UITheme.gold, true);
                    this.clickable(profile, () => this.abilities());
                    this.metrics([['现金', AbilityConfig_1.moneyText(state.stats.funds)], ['健康', `${Math.round(state.stats.health)}`], ['幸福', `${Math.round(state.stats.happiness)}`]]);
                    this.scene(state);
                    if (event)
                        this.row(event.informational || event.interaction === 'information' ? '时代来信 · ' + event.title : '今年的岔路 · ' + event.title, event.description.length > 65 ? event.description.slice(0, 65) + '…' : event.description, () => this.openEventModal(event), UITheme_1.UITheme.surfaceRaised);
                    else {
                        const year = this.session.getYearInfo();
                        this.row((_a = year === null || year === void 0 ? void 0 : year.headline) !== null && _a !== void 0 ? _a : '这一年，按自己的节奏', (_b = year === null || year === void 0 ? void 0 : year.summary) !== null && _b !== void 0 ? _b : '世界继续变化，你也有自己的步调。');
                    }
                    if (state.stats.health < 30 || state.stats.pressure > 70 || state.stats.happiness < 30)
                        this.row('先照看一下自己', `健康 ${Math.round(state.stats.health)} · 压力 ${Math.round(state.stats.pressure)} · 幸福 ${Math.round(state.stats.happiness)}。在「打算」中调整重心或休整。`, () => this.plans(), UITheme_1.UITheme.surfaceInset);
                    else if (forecast.netCashflow < 0)
                        this.row('今年的开支超过收入', `预计年结余 ${AbilityConfig_1.signedMoneyText(forecast.netCashflow)}，请在「家底」中查看收支。`, () => this.assets(), UITheme_1.UITheme.surfaceInset);
                    this.row(`今年打算 · ${LifePresentation_1.focusName(state, state.lifeFocus)}`, '安排会沿用到下一年，可随时调整。', () => this.plans());
                    const last = state.lifeLog[state.lifeLog.length - 1];
                    if (last)
                        this.row('刚刚留下的足迹', `${(_c = last.title) !== null && _c !== void 0 ? _c : '一次选择'} · ${(_d = last.choice) !== null && _d !== void 0 ? _d : '查看记录'}`, () => this.archive());
                    if (!state.flags.includes('tutorial-seen') && state.lifeLog.length === 0)
                        this.openTutorial();
                }
                openTutorial() {
                    this.openMessage('欢迎来到《重来》', '「此刻」查看正在发生的事。\n「打算」安排今年的重心。\n「家底」管理现金、负债与机会。\n「足迹」回看已经做出的选择。\n\n处理完今年的事件后，点击「度过这一年」继续。健康、关系、事业和财富都会改变你的人生。', () => { this.session.completeTutorial(); }, '开始人生');
                }
                metrics(items) {
                    const height = 106, width = 648 / items.length;
                    const group = this.box(this.content, 648, height, 0, -this.cursor - height / 2, UITheme_1.UITheme.ink900);
                    group.name = 'LifeMetrics';
                    items.forEach(([label, value], i) => {
                        const x = -324 + width * (i + .5);
                        this.text(group, label, 22, width - 16, 32, x, 29, UITheme_1.UITheme.muted, true);
                        this.text(group, value, 30, width - 16, 46, x, -16, UITheme_1.UITheme.text, true);
                    });
                    this.cursor += height + 12;
                    this.content.getComponent(cc_1.UITransform).height = Math.max(this.viewportHeight, this.cursor);
                }
                scene(state) {
                    const h = this.viewportHeight < 680 ? 230 : 300, artHeight = h - 110, node = this.box(this.content, 648, h, 0, -this.cursor - h / 2, UITheme_1.UITheme.ink900);
                    node.name = 'LifeSceneModule';
                    const art = LifeScene_1.LifeScene.draw(node, 648, artHeight, state.age, state.education.city);
                    art.setPosition(0, 55);
                    this.text(node, LifePresentation_1.chapter(state.age), 22, 590, 32, 0, h / 2 - artHeight - 22, UITheme_1.UITheme.gold);
                    this.text(node, LifePresentation_1.situation(state), 25, 590, 76, 0, h / 2 - artHeight - 68, UITheme_1.UITheme.text);
                    this.cursor += h + 18;
                    this.content.getComponent(cc_1.UITransform).height = Math.max(this.viewportHeight, this.cursor);
                }
                plans() {
                    this.redraw = () => this.plans();
                    const state = this.session.snapshot();
                    this.page('打算', `${LifePresentation_1.chapter(state.age)} · 为想要的生活留出时间`, '打算');
                    this.row('今年的重心', '选择即生效，不消耗年度行动；下一年自动沿用。');
                    const descriptions = this.focusDescriptions(state), focuses = Object.keys(FOCUS);
                    const bodies = focuses.map(focus => `${descriptions[focus]}\n年结余 ${AbilityConfig_1.signedMoneyText(this.session.focusForecast(focus).netCashflow)}`);
                    const cardH = Math.max(...bodies.map(body => this.measureText(this.content, body, 26, 270))) + 88;
                    const grid = this.box(this.content, 648, cardH * 2 + 16, 0, -this.cursor - cardH - 8, UITheme_1.UITheme.ink900);
                    grid.name = 'FocusComparison';
                    focuses.forEach((focus, i) => {
                        const selected = state.lifeFocus === focus;
                        const card = this.box(grid, 316, cardH, i % 2 === 0 ? -166 : 166, i < 2 ? (cardH + 16) / 2 : -(cardH + 16) / 2, selected ? UITheme_1.UITheme.gold : UITheme_1.UITheme.surface);
                        this.text(card, `${selected ? '● ' : ''}${LifePresentation_1.focusName(state, focus)}`, 28, 278, 44, 0, cardH / 2 - 36, selected ? UITheme_1.UITheme.ink900 : UITheme_1.UITheme.text);
                        const bodyH = this.measureText(card, bodies[i], 26, 270);
                        this.text(card, bodies[i], 26, 270, bodyH, 0, -cardH / 2 + 18 + bodyH / 2, selected ? UITheme_1.UITheme.ink900 : UITheme_1.UITheme.muted);
                        this.clickable(card, () => this.setLifeFocus(focus));
                    });
                    this.cursor += cardH * 2 + 38;
                    this.row('收支会随安排变化', '上方结余按当前状态估算，实际结果仍受事件和年度变化影响。', () => this.assets());
                    this.row(this.session.hasMajorActionAvailable() ? '年度行动 · 还可以做一件事' : '年度行动 · 今年已完成', '休整、照护或职业进修，共用本年一次行动。', () => this.growth());
                    if (state.age < 22)
                        this.row('求学方向', `升学评估 ${Math.round(state.education.admissionScore)}/100 · 985 75 · 211 65\n学习能力与知识可通过学习重心积累。`, () => this.abilities());
                    else
                        this.row('事业的下一步', CAREERS[state.career.track], () => this.careers());
                    this.row('换一座城市生活', `当前在${CITIES[state.education.city]} · 先看搬迁成本`, () => this.cities());
                    this.row('认识自己的长处', '能力、用途与具体门槛', () => this.abilities());
                }
                focusTitle(state, focus) { return LifePresentation_1.focusName(state, focus); }
                focusDescriptions(state) {
                    return state.age < 18 ? { study: '提升学习与知识，增加压力。', work: '提升商业与管理，升学评估下降。', rest: '恢复身心，升学评估下降。', social: '提升幸福与表达，升学评估下降。' }
                        : { study: '提升学习与知识，增加压力。', work: '提升收入与能力，增加压力。', rest: '恢复健康与幸福，降低压力。', social: '增加生活开支，提升幸福与表达。' };
                }
                focusForecastText(state) {
                    const forecast = this.session.financeForecast(), freedom = this.session.financialFreedom();
                    return `工资 ${AbilityConfig_1.moneyText(forecast.salaryIncome)} · 项目 ${AbilityConfig_1.signedMoneyText(forecast.projectCashflow)}\n房租 ${AbilityConfig_1.moneyText(forecast.rentalIncome)} · 固收 ${AbilityConfig_1.moneyText(forecast.fixedIncome)} · 补助/兼职 ${AbilityConfig_1.moneyText(forecast.allowanceIncome + forecast.sideIncome)}\n生活开支 ${AbilityConfig_1.moneyText(forecast.personalLivingExpense)} · 重心开支 ${AbilityConfig_1.moneyText(forecast.discretionaryExpense)} · 贷款利息 ${AbilityConfig_1.moneyText(forecast.interestExpense)}\n财富自由度 ${(freedom.rate * 100).toFixed(0)}% · ${freedom.label} · 安全垫 ${freedom.safetyMonths}个月${forecast.familyCoveredExpense ? `\n家庭另承担生活费 ${AbilityConfig_1.moneyText(forecast.familyCoveredExpense)}` : ''}`;
                }
                setLifeFocus(focus) {
                    this.attempt(() => this.session.setLifeFocus(focus), () => this.plans(), `今年打算：${LifePresentation_1.focusName(this.session.snapshot(), focus)}`);
                }
                advance() {
                    const before = this.session.snapshot();
                    try {
                        const after = this.session.continueYears(1);
                        this.openReceipt(before, after, () => this.life());
                    }
                    catch (error) {
                        this.notify(error instanceof Error ? error.message : '暂时无法完成。');
                    }
                }
                careers() {
                    this.redraw = () => this.careers();
                    const s = this.session.snapshot();
                    this.page('职业方向', CAREERS[s.career.track], '打算', () => this.plans());
                    const promotion = this.session.promotionRequirement();
                    if (promotion)
                        this.row('晋升进度', `${promotion.next ? `本级任职 ${promotion.years} / ${promotion.requiredYears}年` : '已到最高职级'}\n${promotion.guaranteed ? '下一年将自动晋升。' : '满足年限后随机触发；四年未晋升则下一年自动生效。'}\n晋升后基础年薪 +15%。`);
                    const rules = new CareerSystem_1.CareerSystem();
                    for (const track of Object.keys(CAREERS))
                        if (track !== 'unemployed') {
                            const status = rules.entryStatus(s, track);
                            this.row(CAREERS[track], `${status.summary}\n${status.eligible ? '已达到能力门槛' : status.unmet.join('、')}`);
                        }
                }
                growth() {
                    this.redraw = () => this.growth();
                    const s = this.session.snapshot(), available = this.session.hasMajorActionAvailable();
                    this.page('留一点时间给自己', available ? '今年还可以安排一件事。' : '今年已经安排过了，明年再继续。', '打算', () => this.plans());
                    const offer = (title, body, cost, action, eligible = true, reason = '') => {
                        const enabled = available && s.stats.funds >= cost && eligible;
                        this.row(title, `${body}${!available ? '\n本年行动已使用' : s.stats.funds < cost ? '\n可用现金不足' : !eligible ? '\n' + reason : ''}`, enabled ? () => this.attempt(action, () => this.plans(), '这项安排已完成。', true) : undefined, enabled ? UITheme_1.UITheme.surface : UITheme_1.UITheme.disabledSurface, enabled);
                    };
                    offer('留出空白', '免费 · 压力-5 · 幸福+2 · 健康+1', 0, () => this.session.recoverWellbeing('pause'));
                    offer('身心照护', '支付 ¥15,000 · 压力-14 · 健康+6 · 幸福+3', 1.5, () => this.session.recoverWellbeing('care'));
                    offer('与重要的人相聚', '支付 ¥8,000 · 幸福+8 · 压力-7', .8, () => this.session.recoverWellbeing('connection'));
                    if (s.age < 18) {
                        this.row('往后的可能性', '成年后的职业进修和生活安排，会在这里出现。');
                        return;
                    }
                    const skill = s.career.track === 'technology' ? 'technology' : s.career.track === 'product' || s.career.track === 'sales' ? 'business' : s.career.track === 'public-service' ? 'management' : s.career.track === 'education' ? 'learning' : 'expression';
                    const certificates = s.flags.filter(flag => flag.startsWith('certificate-')).length;
                    offer(`职业考证 ${certificates}/2`, '支付 ¥15,000 · 工资+5%', 1.5, () => this.session.certificate(skill), certificates < 2 && s.stats.knowledge >= 35 && s.skills[skill] >= 30, '需要知识35、对应职业能力30，且证书未达上限。');
                    const bachelor = ['undergraduate', 'first-tier', '211', '985'].includes(s.education.level);
                    offer('研究生进修', '支付 ¥80,000 · 工资+5%', 8, () => this.session.graduateSchool(), bachelor && !s.flags.includes('graduate-school') && s.stats.knowledge >= 60 && s.skills.learning >= 45, '需要本科、知识60、学习45，且尚未完成研究生进修。');
                    offer('买一块喜欢的表', '支付 ¥20,000 · 幸福+4 · 压力-1', 2, () => this.session.treatYourself('watch'));
                    offer('去远处旅行', '支付 ¥40,000 · 幸福+6 · 压力-4', 4, () => this.session.treatYourself('trip'));
                    offer('买一辆车', '支付 ¥120,000 · 幸福+8 · 压力-3', 12, () => this.session.treatYourself('car'));
                }
                investments() { this.familySection = 'market'; this.assets(); }
                market(heldOnly) {
                    var _a;
                    this.redraw = () => this.market(heldOnly);
                    const s = this.session.snapshot();
                    this.page(heldOnly ? '我的持仓' : '交易所', `现金 ${AbilityConfig_1.moneyText(s.stats.funds)} · 持仓 ${AbilityConfig_1.moneyText(this.session.marketValue())}`, '家底', () => this.investments());
                    this.row(heldOnly ? '查看全部行情' : `我的持仓 ${s.market.positions.length}`, '', () => this.market(!heldOnly));
                    let list = this.session.marketInstruments();
                    if (heldOnly)
                        list = list.filter((i) => s.market.positions.some((p) => p.instrumentId === i.id));
                    if (!list.length)
                        this.row(heldOnly ? '还没有持仓' : '当前暂无公开行情');
                    for (const item of list) {
                        const pos = s.market.positions.find((p) => p.instrumentId === item.id), price = this.session.marketPrice(item.id), change = this.session.marketChange(item.id);
                        this.row(item.name, `${(_a = item.sector) !== null && _a !== void 0 ? _a : '公开市场'} · ${price.toFixed(2)}元/${item.kind === 'stock' ? '股' : '份'}\n年涨跌 ${change.percent >= 0 ? '▲ +' : '▼ '}${change.percent}%${pos ? `\n持有 ${pos.quantity} · 市值 ${AbilityConfig_1.moneyText(pos.quantity * price / 10000)}\n浮动盈亏 ${AbilityConfig_1.signedMoneyText((price - pos.averageCost) * pos.quantity / 10000)}` : ''}`, () => this.stock(item, heldOnly));
                    }
                }
                stock(item, heldOnly) {
                    var _a;
                    this.redraw = () => this.stock(item, heldOnly);
                    const s = this.session.snapshot();
                    const price = this.session.marketPrice(item.id);
                    this.page(item.name, `${price.toFixed(2)}元/${item.kind === 'stock' ? '股' : '份'}`, '家底', () => this.market(heldOnly));
                    this.row((_a = item.sector) !== null && _a !== void 0 ? _a : '公开市场', item.description);
                    const history = this.session.marketHistory(item.id, 6);
                    if (history.length > 1) {
                        const chart = this.box(this.content, 648, 180, 0, -this.cursor - 90, UITheme_1.UITheme.ink850);
                        this.cursor += 198;
                        const prices = history.map(p => p.price), low = Math.min(...prices), high = Math.max(...prices);
                        const plot = new cc_1.Node('MarketTrend');
                        plot.layer = this.root.layer;
                        plot.addComponent(cc_1.UITransform).setContentSize(648, 180);
                        chart.addChild(plot);
                        const g = plot.addComponent(cc_1.Graphics);
                        g.lineWidth = 4;
                        g.strokeColor = prices[prices.length - 1] >= prices[0] ? UITheme_1.UITheme.gain : UITheme_1.UITheme.loss;
                        history.forEach((point, i) => { const x = -280 + i * 560 / (history.length - 1), y = high === low ? 0 : -60 + (point.price - low) * 120 / (high - low); if (i === 0)
                            g.moveTo(x, y);
                        else
                            g.lineTo(x, y); });
                        g.stroke();
                    }
                    this.row('近年走势', history.map((point) => `${point.year}年  ${point.price.toFixed(2)}元`).join('\n'));
                    if (this.session.canTradeMarket())
                        this.row('买入', `可用资金 ${AbilityConfig_1.moneyText(s.stats.funds)} · 滑动选择金额`, () => this.buyOrder(item, heldOnly), UITheme_1.UITheme.gold);
                    else
                        this.row('18岁后开放交易');
                    const pos = s.market.positions.find((p) => p.instrumentId === item.id);
                    if (pos) {
                        this.row(`持有 ${pos.quantity}${item.kind === 'stock' ? '股' : '份'}`, `买入均价 ${pos.averageCost.toFixed(2)}元\n市值 ${AbilityConfig_1.moneyText(price * pos.quantity / 10000)}\n浮动盈亏 ${AbilityConfig_1.signedMoneyText((price - pos.averageCost) * pos.quantity / 10000)}`);
                        this.row('部分卖出', '滑动选择卖出比例', () => this.sellOrder(item, heldOnly), UITheme_1.UITheme.gold);
                        this.row('全部卖出', '', () => this.confirm('卖出持仓', `卖出全部${item.name}，预计到账 ${AbilityConfig_1.moneyText(price * pos.quantity / 10000)}`, () => this.attempt(() => this.session.sellMarketFraction(item.id, 1), () => this.market(heldOnly)), () => this.stock(item, heldOnly)));
                    }
                }
                buyOrder(item, heldOnly) {
                    this.redraw = () => this.buyOrder(item, heldOnly);
                    const s = this.session.snapshot(), price = this.session.marketPrice(item.id), lot = this.session.marketLotSize(item.id);
                    const max = Math.floor(s.stats.funds * 10000 / price / lot) * lot;
                    let quantity = Math.floor(max * .25 / lot) * lot;
                    this.page(`买入${item.name}`, `每${item.kind === 'stock' ? '股' : '份'} ${price.toFixed(2)}元 · 现金 ${AbilityConfig_1.moneyText(s.stats.funds)}`, '家底', () => this.stock(item, heldOnly));
                    this.row('投入比例', '拖动下方滑条，拉满为当前现金可买的最大数量。');
                    const selection = this.row('买入 0股\n支付 ¥0\n交易后现金 ¥0');
                    const label = selection.children[0].getComponent(cc_1.Label);
                    const bar = this.box(this.content, 648, 100, 0, -this.cursor - 50, UITheme_1.UITheme.ink850);
                    this.cursor += 124;
                    const track = this.box(bar, 570, 12, 0, 0, UITheme_1.UITheme.line);
                    const thumb = this.box(bar, 34, 50, 0, 0, UITheme_1.UITheme.gold);
                    const update = (fraction) => { quantity = Math.floor(max * fraction / lot) * lot; thumb.setPosition(-285 + 570 * fraction, 0); label.string = `买入 ${quantity}${item.kind === 'stock' ? '股' : '份'}\n支付 ${AbilityConfig_1.moneyText(price * quantity / 10000)}\n交易后现金 ${AbilityConfig_1.moneyText(s.stats.funds - price * quantity / 10000)}`; };
                    const slide = (event) => { event.propagationStopped = true; const p = event.getUILocation(); const local = track.getComponent(cc_1.UITransform).convertToNodeSpaceAR(new cc_1.Vec3(p.x, p.y)); update(Math.max(0, Math.min(1, (local.x + 285) / 570))); };
                    bar.on(cc_1.Node.EventType.TOUCH_START, slide);
                    bar.on(cc_1.Node.EventType.TOUCH_MOVE, slide);
                    bar.on(cc_1.Node.EventType.TOUCH_END, (e) => { e.propagationStopped = true; });
                    update(.25);
                    this.row(max ? '确认买入' : '资金不足', `最多 ${max}${item.kind === 'stock' ? '股' : '份'}`, max ? () => this.attempt(() => this.session.buyMarket(item.id, quantity), () => this.market(heldOnly), '买入完成') : undefined, UITheme_1.UITheme.gold);
                }
                sellOrder(item, heldOnly) {
                    this.redraw = () => this.sellOrder(item, heldOnly);
                    const s = this.session.snapshot(), price = this.session.marketPrice(item.id), lot = this.session.marketLotSize(item.id);
                    const position = s.market.positions.find((p) => p.instrumentId === item.id);
                    if (!position) {
                        this.stock(item, heldOnly);
                        return;
                    }
                    const max = Math.floor(position.quantity / lot) * lot;
                    let quantity = Math.floor(max * .5 / lot) * lot;
                    this.page(`卖出${item.name}`, `当前持有 ${position.quantity}${item.kind === 'stock' ? '股' : '份'}`, '家底', () => this.stock(item, heldOnly));
                    this.row('卖出比例', '拖动下方滑条，拉满为全部持仓。');
                    const selection = this.row('卖出 0股\n到账 ¥0');
                    const label = selection.children[0].getComponent(cc_1.Label);
                    const bar = this.box(this.content, 648, 100, 0, -this.cursor - 50, UITheme_1.UITheme.ink850);
                    this.cursor += 124;
                    const track = this.box(bar, 570, 12, 0, 0, UITheme_1.UITheme.line);
                    const thumb = this.box(bar, 34, 50, 0, 0, UITheme_1.UITheme.gold);
                    const update = (fraction) => { quantity = Math.floor(max * fraction / lot) * lot; thumb.setPosition(-285 + 570 * fraction, 0); label.string = `卖出 ${quantity}${item.kind === 'stock' ? '股' : '份'}\n到账 ${AbilityConfig_1.moneyText(price * quantity / 10000)}`; };
                    const slide = (event) => { event.propagationStopped = true; const p = event.getUILocation(); const local = track.getComponent(cc_1.UITransform).convertToNodeSpaceAR(new cc_1.Vec3(p.x, p.y)); update(Math.max(0, Math.min(1, (local.x + 285) / 570))); };
                    bar.on(cc_1.Node.EventType.TOUCH_START, slide);
                    bar.on(cc_1.Node.EventType.TOUCH_MOVE, slide);
                    bar.on(cc_1.Node.EventType.TOUCH_END, (e) => { e.propagationStopped = true; });
                    update(.5);
                    this.row('确认卖出', `最多 ${max}${item.kind === 'stock' ? '股' : '份'}`, () => this.attempt(() => this.session.sellMarket(item.id, quantity), () => this.market(heldOnly), '卖出完成'), UITheme_1.UITheme.gold);
                }
                projects(owned) {
                    this.redraw = () => this.projects(owned);
                    const s = this.session.snapshot();
                    this.session.markProjectListingsRead();
                    this.page(owned ? '我的项目' : '项目投资', `现金 ${AbilityConfig_1.moneyText(s.stats.funds)} · 同时最多持有5个项目`, '家底', () => this.investments());
                    this.row(owned ? '寻找项目' : '查看我的项目', '', () => this.projects(!owned));
                    if (owned) {
                        if (!s.industryProjects.length)
                            this.row('还没有投资项目');
                        for (const p of s.industryProjects) {
                            this.row(p.name, p.status === 'active' ? `当前估值 ${AbilityConfig_1.moneyText(p.currentValue)}\n上年现金流 ${AbilityConfig_1.signedMoneyText(p.lastAnnualCashflow)}\n累计收益 ${AbilityConfig_1.signedMoneyText(p.currentValue + p.cumulativeCashflow - p.investedPrincipal)}` : `已实现收益 ${AbilityConfig_1.signedMoneyText(p.realizedReturn)}\n${p.lastChangeReason}`);
                            if (p.status === 'active')
                                this.row('主动出售这个项目', `按估值七折出售，预计到账 ${AbilityConfig_1.moneyText(p.currentValue * .7)}`, () => this.confirm('确认主动出售', `${p.name}\n出售后无法恢复持有。`, () => this.attempt(() => this.session.exitIndustryProject(p.id), () => this.projects(true)), () => this.projects(true)));
                        }
                    }
                    else {
                        const list = this.session.industryProjectConfigs().filter((p) => !s.industryProjects.some((h) => h.projectId === p.id));
                        if (!list.length)
                            this.row('暂时没有新项目', '项目市场每年刷新 0–2 个限时报价，也可能没有新项目。');
                        for (const p of list) {
                            const range = this.session.industryProjectCashflowRange(p);
                            const offer = this.session.industryProjectLoanOffer(p.id);
                            this.row(p.name, `${this.session.industryProjectScale(p)} · ${p.industry}\n买断价 ${AbilityConfig_1.moneyText(p.minimumInvestment)}\n预计年现金流 ${AbilityConfig_1.signedMoneyText(range.min)} ～ ${AbilityConfig_1.signedMoneyText(range.max)}\n市场价会逐年变化；主动出售只能按七折。`, () => this.confirm('买断项目', `${p.name}\n支付 ${AbilityConfig_1.moneyText(p.minimumInvestment)}${offer.required > 0 ? `\n需要贷款 ${AbilityConfig_1.moneyText(offer.required)} · 年利息约 ${AbilityConfig_1.moneyText(offer.annualInterest)}` : ''}`, () => this.attempt(() => this.session.buyIndustryProject(p.id, offer.required > 0), () => this.projects(true)), () => this.projects(false)));
                        }
                    }
                }
                assets() {
                    this.redraw = () => this.assets();
                    const s = this.session.snapshot(), w = WealthSystem_1.wealthBreakdown(s), f = this.session.financeForecast(), freedom = this.session.financialFreedom();
                    this.page('家底', '让每一次投入，都有生活的余地。', '家底');
                    this.metrics([['可用现金', AbilityConfig_1.moneyText(w.cash)], ['预计年结余', AbilityConfig_1.signedMoneyText(f.netCashflow)], ['安全垫', `${freedom.safetyMonths}个月`]]);
                    const switcher = this.box(this.content, 648, 72, 0, -this.cursor - 36, UITheme_1.UITheme.ink900);
                    ['overview', 'market', 'holdings'].forEach((key, i) => {
                        const item = this.box(switcher, 204, 64, (i - 1) * 216, 0, this.familySection === key ? UITheme_1.UITheme.gold : UITheme_1.UITheme.surface);
                        this.text(item, ['生活账本', '寻找机会', '我的持有'][i], 25, 190, 42, 0, 0, this.familySection === key ? UITheme_1.UITheme.ink900 : UITheme_1.UITheme.text, true);
                        this.clickable(item, () => { this.familySection = key; this.assets(); });
                    });
                    this.cursor += 92;
                    if (this.familySection === 'market') {
                        this.row('公开市场', s.age < 18 ? '18岁后可以交易；现在可以了解市场。' : '股票、基金与债券 · 行情和走势', () => this.market(false));
                        this.row('项目机会', this.session.hasNewProjectListings() ? '今年有新的项目报价，先了解现金流和退出成本。' : '查看可参与的项目与条件。', () => this.projects(false));
                        const housing = ExplorationConfig_1.EXPLORATION_ACTIONS.find(a => a.domain === 'housing');
                        const unlocked = new OpenOpportunitySystem_1.OpenOpportunitySystem().isAvailable(s, housing);
                        this.row(unlocked ? '房产市场' : '房产市场 · 尚未开放', unlocked ? '购买成本、租金与退出折价' : '现金首次达到25万元后永久开放。', unlocked ? () => this.housing() : undefined);
                    }
                    else if (this.familySection === 'holdings') {
                        this.row('我的持仓', `${s.market.positions.length} 项 · 市值 ${AbilityConfig_1.moneyText(w.securities)}`, () => this.market(true));
                        this.row('我的项目', `${s.industryProjects.length} 项 · 估值 ${AbilityConfig_1.moneyText(w.industryProjects)}`, () => this.projects(true));
                        this.row('我的房产', `${s.housingHoldings.length} 套 · 估值 ${AbilityConfig_1.moneyText(w.housing)}`, () => this.housing());
                        this.row('现金管理', `活期与定期 ${AbilityConfig_1.moneyText(w.cashManagement)}`, () => this.cashManagement());
                    }
                    else {
                        this.row('生活的底气', `个人净资产 ${AbilityConfig_1.moneyText(w.netWorth)}\n贷款 ${AbilityConfig_1.moneyText(w.debt)} · 预计年利息 ${AbilityConfig_1.moneyText(f.interestExpense)}\n${f.netCashflow < 0 ? '预计开支高于收入，请留意现金储备。' : '预计收入可以覆盖本年开支。'}`);
                        this.row('年度收支', `预计工资 ${AbilityConfig_1.moneyText(f.salaryIncome)} · 生活开支 ${AbilityConfig_1.moneyText(f.personalLivingExpense)}\n查看已结算年份的真实账目`, () => this.ledger());
                        this.row('贷款与还款', `贷款余额 ${AbilityConfig_1.moneyText(s.finance.loanBalance)}`, () => this.loans());
                        this.row('现金管理', `活期 ${AbilityConfig_1.moneyText(s.cashManagement.demandBalance)} · 定期/理财 ${s.cashManagement.holdings.length} 笔`, () => this.cashManagement());
                        this.row('资产构成', `现金 ${AbilityConfig_1.moneyText(w.cash)} · 存款 ${AbilityConfig_1.moneyText(w.cashManagement)}\n证券 ${AbilityConfig_1.moneyText(w.securities)} · 项目 ${AbilityConfig_1.moneyText(w.industryProjects)}\n房产 ${AbilityConfig_1.moneyText(w.housing)} · 其他 ${AbilityConfig_1.moneyText(w.otherAssets)}\n减去负债 ${AbilityConfig_1.moneyText(w.debt)}`);
                    }
                }
                loans() {
                    this.redraw = () => this.loans();
                    const s = this.session.snapshot();
                    const f = this.session.financeForecast();
                    this.page('贷款与还款', `现金 ${AbilityConfig_1.moneyText(s.stats.funds)} · 贷款 ${AbilityConfig_1.moneyText(s.finance.loanBalance)}`, '家底', () => this.assets());
                    this.row('贷款情况', `年利息 ${AbilityConfig_1.moneyText(f.interestExpense)}\n${this.session.loanRequirementText()}`);
                    if (s.finance.loanBalance > 0) {
                        this.row('全部还款', AbilityConfig_1.moneyText(s.finance.loanBalance), () => this.confirm('结清贷款', `支付 ${AbilityConfig_1.moneyText(s.finance.loanBalance)}，贷款归零。`, () => this.attempt(() => this.session.repayAllLoan(), () => this.loans(), '贷款已结清'), () => this.loans()), UITheme_1.UITheme.gold);
                        this.row(`还款 ${AbilityConfig_1.moneyText(Math.min(1, s.finance.loanBalance))}`, '', () => this.attempt(() => this.session.repayLoan(Math.min(1, s.finance.loanBalance)), () => this.loans()));
                    }
                    else
                        this.row('当前没有贷款');
                }
                ledger() {
                    this.redraw = () => this.ledger();
                    const s = this.session.snapshot();
                    this.page('年度收支', '记录每一年的现金流。', '家底', () => this.assets());
                    if (!s.finance.history.length)
                        this.row('尚未完成年度结算');
                    for (const r of [...s.finance.history].reverse())
                        this.row(`${r.year}年 · 净现金流 ${AbilityConfig_1.signedMoneyText(r.netCashflow)}`, `工资 ${AbilityConfig_1.moneyText(r.salaryIncome)} · 项目 ${AbilityConfig_1.signedMoneyText(r.projectIncome)} · 房租 ${AbilityConfig_1.moneyText(r.rentalIncome)} · 固收 ${AbilityConfig_1.moneyText(r.fixedIncome)}\n生活 ${AbilityConfig_1.moneyText(r.livingExpense)} · 重心 ${AbilityConfig_1.moneyText(r.discretionaryExpense)} · 利息 ${AbilityConfig_1.moneyText(r.interestExpense)}\n年末现金 ${AbilityConfig_1.moneyText(r.closingCash)}${r.familyCoveredExpense ? `\n家庭另承担生活费 ${AbilityConfig_1.moneyText(r.familyCoveredExpense)}` : ''}`);
                }
                housing() {
                    this.redraw = () => this.housing();
                    const s = this.session.snapshot();
                    this.page('房产市场', `${CITIES[s.education.city]} · 买卖税费均为3%`, '家底', () => this.assets());
                    for (const p of this.session.housingProducts()) {
                        const price = this.session.housingPrice(p.id), cost = price + Math.round(price * .03 * 10) / 10;
                        this.row(p.name, `${p.description}\n房价 ${AbilityConfig_1.moneyText(price)} · 含税总额 ${AbilityConfig_1.moneyText(cost)}`, () => this.confirm('购买住房', `${p.name}\n含税总额 ${AbilityConfig_1.moneyText(cost)}`, () => this.attempt(() => this.session.buyHousing(p.id), () => this.housing()), () => this.housing()));
                    }
                    for (const p of s.housingHoldings)
                        this.row(`持有 · ${p.name}`, `${CITIES[p.city]} · 当前估值 ${AbilityConfig_1.moneyText(p.currentValue)}\n年净租金 ${AbilityConfig_1.moneyText(p.lastAnnualRent)} · 累计租金 ${AbilityConfig_1.moneyText(p.cumulativeRent)}\n主动出售到账 ${AbilityConfig_1.moneyText(p.currentValue * .7)}`, () => this.confirm('主动出售住房', `${p.name}\n会按市场估值七折出售。`, () => this.attempt(() => this.session.sellHousing(p.id), () => this.housing()), () => this.housing()));
                }
                cashManagement() {
                    this.redraw = () => this.cashManagement();
                    const s = this.session.snapshot();
                    this.page('现金管理', `现金 ${AbilityConfig_1.moneyText(s.stats.funds)} · 活期 ${AbilityConfig_1.moneyText(s.cashManagement.demandBalance)}`, '家底', () => this.assets());
                    this.row('活期存款', `年利率 ${(s.cashManagement.demandRate * 100).toFixed(1)}% · 随存随取`, () => this.confirm('转入活期', '转入 ¥10,000，随时可取。', () => this.attempt(() => this.session.depositDemand(1), () => this.cashManagement()), () => this.cashManagement()));
                    if (s.cashManagement.demandBalance >= 1)
                        this.row('取出活期', `当前活期 ${AbilityConfig_1.moneyText(s.cashManagement.demandBalance)}`, () => this.attempt(() => this.session.withdrawDemand(Math.min(1, s.cashManagement.demandBalance)), () => this.cashManagement()));
                    for (const product of this.session.cashProducts())
                        this.row(product.name, `年化 ${(product.annualRate * 100).toFixed(1)}% · ${product.years}年 · ${product.risk}风险\n${product.description}`, () => this.confirm(product.name, '投入 ¥10,000。', () => this.attempt(() => this.session.buyCashProduct(product.name, 1), () => this.cashManagement()), () => this.cashManagement()));
                    for (const holding of s.cashManagement.holdings)
                        this.row(`持有 · ${holding.name}`, `本金 ${AbilityConfig_1.moneyText(holding.principal)} · ${holding.maturityYear}年到期\n上年收益 ${AbilityConfig_1.moneyText(holding.lastAnnualIncome)} · 累计收益 ${AbilityConfig_1.moneyText(holding.cumulativeIncome)}`, () => this.confirm('提前赎回', '提前赎回将按活期利率结算。', () => this.attempt(() => this.session.redeemCashProduct(holding.id), () => this.cashManagement()), () => this.cashManagement()));
                }
                cities() {
                    this.redraw = () => this.cities();
                    const s = this.session.snapshot();
                    this.page('城市迁移', `当前：${CITIES[s.education.city]}`, '打算', () => this.plans());
                    for (const city of Object.keys(CITIES)) {
                        const p = this.session.migrationPreview(city);
                        this.row(CITIES[city], `搬迁总成本 ${AbilityConfig_1.moneyText(p.total)}\n迁移后年度生活费 ${AbilityConfig_1.moneyText(p.annualAfter)}`, city === s.education.city ? undefined : () => this.confirm('确认迁移', `支付 ${AbilityConfig_1.moneyText(p.total)}，迁往${CITIES[city]}。`, () => this.attempt(() => this.session.migrateCity(city), () => this.cities()), () => this.cities()));
                    }
                }
                archive() {
                    var _a, _b, _c, _d;
                    this.redraw = () => this.archive();
                    const s = this.session.snapshot(), report = this.session.getReport();
                    this.page('足迹', `${s.year}年 · 走过的路，都留在这里`, s.completed ? undefined : '足迹', s.completed ? () => this.ending() : undefined);
                    this.row(LifePresentation_1.chapter(s.age), (_a = report === null || report === void 0 ? void 0 : report.oneLineReview) !== null && _a !== void 0 ? _a : '你的故事才刚刚开始。');
                    this.row('返回首页', '当前进度已自动保存，可随时继续。', () => this.home());
                    this.row('每一年的变化', `${(_c = (_b = s.annualReviews) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0} 份年度回顾 · 可反复阅读`, () => this.yearReviews());
                    const timeline = (_d = report === null || report === void 0 ? void 0 : report.timeline) !== null && _d !== void 0 ? _d : [];
                    if (!timeline.length)
                        this.row('第一页还在等待', '作出第一个选择后，这里会记下你的决定和结果。');
                    const entries = this.showAllHistory ? timeline : timeline.slice(-8);
                    let currentChapter = '';
                    for (const entry of [...entries].reverse()) {
                        const name = LifePresentation_1.chapter(entry.age);
                        if (name !== currentChapter) {
                            this.row(name, '', undefined, UITheme_1.UITheme.surfaceInset);
                            currentChapter = name;
                        }
                        this.row(`${entry.age}岁 · ${entry.event}`, `${entry.choice.split('｜')[0]}\n${entry.impact}${entry.cause ? `\n来自 ${entry.cause.year} 年：${entry.cause.title} / ${entry.cause.choice}` : ''}`);
                    }
                    if (timeline.length > 8)
                        this.row(this.showAllHistory ? '只看最近的足迹' : `展开全部 ${timeline.length} 次选择`, '', () => { this.showAllHistory = !this.showAllHistory; this.archive(); });
                }
                yearReviews() {
                    var _a, _b;
                    this.redraw = () => this.yearReviews();
                    const s = this.session.snapshot();
                    this.page('每一年的变化', '结果留在这里，不必急着读完。', s.completed ? undefined : '足迹', () => this.archive());
                    if (!((_a = s.annualReviews) === null || _a === void 0 ? void 0 : _a.length))
                        this.row('还没有年度回顾', '新完成的年份会记录身心与现金变化。旧年份的收支仍可在年度账本中查看。');
                    for (const review of [...((_b = s.annualReviews) !== null && _b !== void 0 ? _b : [])].reverse())
                        this.row(`${review.year}年 · ${review.age}岁`, review.text);
                    this.row('查看年度账本', '收入、生活费、利息与其他收支', () => this.ledger());
                }
                ending() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                    this.redraw = () => this.ending();
                    const s = this.session.snapshot(), report = this.session.getReport();
                    this.page('这一生，你走到了这里', (_b = (_a = s.ending) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : '一生的回声');
                    this.scene(s);
                    this.row((_d = (_c = s.ending) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : '人生回望', (_g = (_f = (_e = s.ending) === null || _e === void 0 ? void 0 : _e.description) !== null && _f !== void 0 ? _f : report === null || report === void 0 ? void 0 : report.oneLineReview) !== null && _g !== void 0 ? _g : '每一次选择，都留下了痕迹。');
                    this.metrics([['健康', `${Math.round(s.stats.health)}`], ['幸福', `${Math.round(s.stats.happiness)}`], ['净资产', AbilityConfig_1.moneyText(WealthSystem_1.wealthBreakdown(s).netWorth)]]);
                    this.row('得到与付出', `${(_h = report === null || report === void 0 ? void 0 : report.biggestSuccess) !== null && _h !== void 0 ? _h : ''}\n${(_j = report === null || report === void 0 ? void 0 : report.biggestRegret) !== null && _j !== void 0 ? _j : ''}`);
                    const turns = ((_k = report === null || report === void 0 ? void 0 : report.timeline) !== null && _k !== void 0 ? _k : []).filter(entry => entry.cause || entry.impact && entry.impact !== '历史记录未保留具体结果。').slice(-3);
                    for (const entry of turns)
                        this.row(`${entry.age}岁 · 回望这个决定`, `${entry.event}\n你选择了：${entry.choice.split('｜')[0]}\n${entry.impact}`);
                    this.row('下一次，试着换一个选择', '从足迹中回看曾经的岔路。新的起点与天赋，会带来不同的条件和机会。', () => this.archive());
                    this.row('带走一枚记忆', '选择后开启下一段旅程。记忆的效果会在新的起点生效。');
                    (_l = this.inheritanceChoices) !== null && _l !== void 0 ? _l : (this.inheritanceChoices = this.session.getInheritanceChoices());
                    for (const reward of this.inheritanceChoices)
                        this.row(reward.name, reward.description, () => { this.session.chooseInheritance(reward); this.home(); }, UITheme_1.UITheme.surface, true);
                }
            };
            exports_1("PortraitGameUI", PortraitGameUI);
        }
    };
});












































System.register("chunks:///_virtual/ReportGenerator.ts",["./GameEvents.ts", "./OpportunitySystem.ts", "./WealthSystem.ts", "./AbilityConfig.ts"], function (exports_1, context_1) {
    "use strict";
    var GameEvents_1, OpportunitySystem_1, WealthSystem_1, AbilityConfig_1, ReportGenerator;
    var __moduleName = context_1 && context_1.id;
    function assetsWord(state) { const value = WealthSystem_1.totalAssetValue(state); return value >= 200 ? '资产自由' : value >= 80 ? '稳健布局' : '脚踏实地'; }
    return {
        setters: [
            function (GameEvents_1_1) {
                GameEvents_1 = GameEvents_1_1;
            },
            function (OpportunitySystem_1_1) {
                OpportunitySystem_1 = OpportunitySystem_1_1;
            },
            function (WealthSystem_1_1) {
                WealthSystem_1 = WealthSystem_1_1;
            },
            function (AbilityConfig_1_1) {
                AbilityConfig_1 = AbilityConfig_1_1;
            }
        ],
        execute: function () {
            ReportGenerator = class ReportGenerator {
                constructor() {
                    this.opportunities = new OpportunitySystem_1.OpportunitySystem();
                }
                generate(state) {
                    const dimensions = [['健康', state.stats.health], ['幸福', state.stats.happiness], ['财富', Math.min(100, WealthSystem_1.totalAssetValue(state))], ['知识', state.stats.knowledge], ['信息', state.skills.information]];
                    const strongest = [...dimensions].sort((a, b) => b[1] - a[1])[0][0];
                    const sacrifice = [...dimensions].sort((a, b) => a[1] - b[1])[0][0];
                    const opportunities = state.opportunities.filter((item) => item.entered).map((item) => this.opportunities.chainName(item.chainId));
                    const timeline = state.lifeLog.map((entry) => {
                        var _a, _b, _c, _d;
                        const event = GameEvents_1.GAME_EVENTS.find((item) => item.id === entry.eventId);
                        const choice = event === null || event === void 0 ? void 0 : event.options.find((item) => item.id === entry.optionId);
                        const dynamic = this.dynamicTimelineEntry(entry.eventId, entry.optionId);
                        return {
                            year: entry.year,
                            age: entry.year - 1992,
                            event: (_b = (_a = entry.title) !== null && _a !== void 0 ? _a : event === null || event === void 0 ? void 0 : event.title) !== null && _b !== void 0 ? _b : dynamic.event,
                            choice: (_d = (_c = entry.choice) !== null && _c !== void 0 ? _c : choice === null || choice === void 0 ? void 0 : choice.label) !== null && _d !== void 0 ? _d : dynamic.choice,
                            impact: entry.result ? [entry.outcome, AbilityConfig_1.changeText(entry.result) || '你作出了这个选择，生活继续向前。'].filter(Boolean).join('\n') : event ? '历史记录未保留具体结果。' : dynamic.impact,
                            cause: entry.cause,
                        };
                    });
                    const keywords = [state.identityId.includes('rural') ? '小镇成长' : '人生重启', state.skills.technology >= 70 ? '技术极客' : state.skills.business >= 70 ? '商业嗅觉' : '持续积累', assetsWord(state), state.stats.health <= 30 ? '透支警醒' : state.stats.happiness >= 70 ? '内心丰盛' : '继续前行'].filter((word, index, array) => array.indexOf(word) === index).slice(0, 5);
                    return { summary: `你经历了 ${state.lifeLog.length} 次关键选择，并在${strongest}维度留下最深痕迹。`, strongestDimension: strongest, greatestSacrifice: sacrifice, opportunities, timeline, missedOpportunities: ['电商', '移动互联网', '内容产业', '人工智能'].filter((name) => !opportunities.includes(name)), biggestSuccess: strongest === '财富' ? '完成了可观的资产积累。' : `把${strongest}变成了人生的支点。`, biggestRegret: `最需要重新照看的维度是${sacrifice}。`, lifeKeywords: keywords, oneLineReview: `这是一段以「${keywords.join('、')}」为关键词的人生。` };
                }
                dynamicTimelineEntry(eventId, optionId) {
                    if (eventId === 'career-promotion')
                        return { event: '职业晋升', choice: '获得晋升', impact: '基础年薪提升 15%，现金流基础随之增长。' };
                    if (eventId.startsWith('asset-acquisition-'))
                        return { event: '资产收购邀约', choice: optionId === 'accept' ? '接受溢价收购' : '继续持有资产', impact: optionId === 'accept' ? '一笔溢价成交兑现为现金。' : '你选择继续承担资产未来的涨跌。' };
                    if (eventId === 'liquidity-crisis')
                        return { event: '流动性危机', choice: optionId === 'end' ? '无资产可变卖' : '危机中变卖资产', impact: optionId === 'end' ? '现金流无法被资产覆盖，这段人生提前结束。' : '你以折价资产换取继续经营人生的现金。' };
                    return { event: '关键选择', choice: '继续前行', impact: '这一次选择改变了之后的人生资源与可能性。' };
                }
            };
            exports_1("ReportGenerator", ReportGenerator);
        }
    };
});












































System.register("chunks:///_virtual/RequirementFormatter.ts",[], function (exports_1, context_1) {
    "use strict";
    var RequirementFormatter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RequirementFormatter = class RequirementFormatter {
                formatAll(conditions = []) {
                    return conditions.length === 0 ? '无特殊条件' : conditions.map((condition) => this.format(condition)).join('；');
                }
                format(condition) {
                    if (condition.startsWith('flags.'))
                        return `需要经历：${this.flagName(condition.slice(6))}`;
                    const match = condition.match(/^(attributes|skills|stats)\.([a-zA-Z]+)\s*(>=|<=|==|>|<)\s*(-?\d+)$/);
                    if (!match)
                        return '需要满足前置条件';
                    const [, group, key, operator, rawValue] = match;
                    const value = Number(rawValue);
                    const operatorText = { '>=': '≥', '<=': '≤', '==': '=', '>': '>', '<': '<' }[operator];
                    if (group === 'stats' && key === 'funds')
                        return `可用现金 ${operatorText} ${this.money(value)}`;
                    const name = this.nameOf(group, key);
                    return `${name} ${operatorText} ${value}`;
                }
                money(amount) { return `¥${Math.round(amount * 10000).toLocaleString('zh-CN')}`; }
                nameOf(group, key) {
                    var _a;
                    const names = {
                        intelligence: '智力', execution: '执行',
                        learning: '学习能力', technology: '技术能力', business: '商业能力', expression: '表达能力', management: '管理能力', information: '信息能力',
                        familyResources: '家庭资源', health: '健康', pressure: '压力', happiness: '幸福', knowledge: '知识', familyBond: '家庭陪伴',
                    };
                    return (_a = names[key]) !== null && _a !== void 0 ? _a : '相应能力';
                }
                flagName(flag) {
                    var _a;
                    const names = { 'career-started': '拥有正式工作', 'middle-school': '完成初中阶段', 'university-entry': '完成大学录取', 'computer-intro': '接触过电脑' };
                    return (_a = names[flag]) !== null && _a !== void 0 ? _a : '相应的人生经历';
                }
            };
            exports_1("RequirementFormatter", RequirementFormatter);
        }
    };
});












































System.register("chunks:///_virtual/SaveManager.ts",["cc", "./EducationProgressionSystem.ts", "./IdentityConfig.ts", "./IndustryProjectConfig.ts", "./CashManagementSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, EducationProgressionSystem_1, IdentityConfig_1, IndustryProjectConfig_1, CashManagementSystem_1, SAVE_KEY, SaveManager;
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
            },
            function (IndustryProjectConfig_1_1) {
                IndustryProjectConfig_1 = IndustryProjectConfig_1_1;
            },
            function (CashManagementSystem_1_1) {
                CashManagementSystem_1 = CashManagementSystem_1_1;
            }
        ],
        execute: function () {
            SAVE_KEY = 'restart-life.save.v1';
            SaveManager = class SaveManager {
                constructor() {
                    this.education = new EducationProgressionSystem_1.EducationProgressionSystem();
                    this.cashManagement = new CashManagementSystem_1.CashManagementSystem();
                }
                save(state) {
                    cc_1.sys.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
                }
                load() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
                    var _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33;
                    const raw = cc_1.sys.localStorage.getItem(SAVE_KEY);
                    if (!raw)
                        return undefined;
                    try {
                        const state = JSON.parse(raw);
                        if (state.version !== 1 && state.version !== 2)
                            return undefined;
                        const oldStats = state.stats;
                        const oldAttributes = state.attributes;
                        if (!state.flags.includes('lean-abilities-v1')) {
                            state.skills.information = Math.min(100, state.skills.information + Math.max(0, ((_a = oldStats.informationValue) !== null && _a !== void 0 ? _a : 10) - 10) * .5);
                            state.flags.push('lean-abilities-v1');
                        }
                        for (const key of ['emotionalIntelligence', 'constitution', 'charm', 'luck'])
                            delete oldAttributes[key];
                        for (const key of ['romance', 'informationValue', 'worldShift'])
                            delete oldStats[key];
                        (_b = state.career) !== null && _b !== void 0 ? _b : (state.career = { track: 'unemployed', level: 'junior', workIntensity: 'normal', industry: '', yearsAtLevel: 0, salaryMultiplier: 1 });
                        (_c = (_16 = state.career).yearsAtLevel) !== null && _c !== void 0 ? _c : (_16.yearsAtLevel = 0);
                        (_d = (_17 = state.career).salaryMultiplier) !== null && _d !== void 0 ? _d : (_17.salaryMultiplier = Math.round(Math.pow(1.15, { junior: 0, middle: 1, senior: 2, core: 3 }[state.career.level]) * 10000) / 10000);
                        (_e = (_18 = state.stats).knowledge) !== null && _e !== void 0 ? _e : (_18.knowledge = 10);
                        (_f = state.education) !== null && _f !== void 0 ? _f : (state.education = { level: 'primary', city: 'county', admissionScore: 50, studyHabit: 20, academicScore: 50, studyYears: 0 });
                        (_g = (_19 = state.education).studyHabit) !== null && _g !== void 0 ? _g : (_19.studyHabit = 20);
                        (_h = (_20 = state.education).academicScore) !== null && _h !== void 0 ? _h : (_20.academicScore = 50);
                        const elapsedSchoolYears = Math.min(10, Math.max(0, state.age - 8));
                        const hasOverwrittenEducation = state.education.studyHabit <= 4 && state.education.academicScore <= 4;
                        (_j = (_21 = state.education).studyYears) !== null && _j !== void 0 ? _j : (_21.studyYears = hasOverwrittenEducation
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
                        (_k = (_22 = state.education).admissionScore) !== null && _k !== void 0 ? _k : (_22.admissionScore = Math.round(state.education.academicScore * .4
                            + state.skills.learning * .18
                            + state.education.studyHabit * .14
                            + state.stats.knowledge * .22
                            + state.skills.information * .03
                            + Math.min(12, state.education.studyYears / 10 * 12)));
                        state.education.admissionScore = Math.max(0, Math.min(100, state.education.admissionScore));
                        (_l = state.lifeFocus) !== null && _l !== void 0 ? _l : (state.lifeFocus = state.career.track === 'unemployed' ? 'study' : 'work');
                        (_m = state.finance) !== null && _m !== void 0 ? _m : (state.finance = { familyAllowanceAnnual: 0.5, salaryAnnual: 0, livingCostAnnual: 0, loanBalance: 0, loanLimit: 0, lastCashflow: 0, history: [] });
                        (_o = (_23 = state.finance).history) !== null && _o !== void 0 ? _o : (_23.history = []);
                        state.finance.history.forEach((record) => {
                            var _a, _b, _c, _d, _e, _f, _g;
                            (_a = record.familyCoveredExpense) !== null && _a !== void 0 ? _a : (record.familyCoveredExpense = 0);
                            (_b = record.allowanceIncome) !== null && _b !== void 0 ? _b : (record.allowanceIncome = 0);
                            (_c = record.sideIncome) !== null && _c !== void 0 ? _c : (record.sideIncome = 0);
                            (_d = record.projectIncome) !== null && _d !== void 0 ? _d : (record.projectIncome = 0);
                            (_e = record.rentalIncome) !== null && _e !== void 0 ? _e : (record.rentalIncome = 0);
                            (_f = record.fixedIncome) !== null && _f !== void 0 ? _f : (record.fixedIncome = 0);
                            (_g = record.discretionaryExpense) !== null && _g !== void 0 ? _g : (record.discretionaryExpense = 0);
                        });
                        (_p = state.startup) !== null && _p !== void 0 ? _p : (state.startup = { active: false });
                        (_q = state.assets) !== null && _q !== void 0 ? _q : (state.assets = []);
                        (_r = state.housingHoldings) !== null && _r !== void 0 ? _r : (state.housingHoldings = []);
                        if (state.housingHoldings.length === 0) {
                            const legacyHousing = state.assets.find((asset) => asset.type === 'housing' && asset.value > 0);
                            if (legacyHousing)
                                state.housingHoldings.push({ id: `legacy-housing-${state.year}`, productId: 'legacy', city: state.education.city, name: '旧存档住房', purchaseYear: state.year, purchasePrice: legacyHousing.value, currentValue: legacyHousing.value, lastAnnualRent: 0, cumulativeRent: 0 });
                        }
                        state.housingHoldings.forEach((holding) => { var _a, _b; (_a = holding.lastAnnualRent) !== null && _a !== void 0 ? _a : (holding.lastAnnualRent = 0); (_b = holding.cumulativeRent) !== null && _b !== void 0 ? _b : (holding.cumulativeRent = 0); });
                        (_s = state.industryProjects) !== null && _s !== void 0 ? _s : (state.industryProjects = []);
                        state.industryProjects.forEach((holding) => {
                            var _a, _b, _c, _d, _e;
                            (_a = holding.realizedReturn) !== null && _a !== void 0 ? _a : (holding.realizedReturn = holding.status === 'failed' ? -holding.investedPrincipal : 0);
                            (_b = holding.lastAnnualCashflow) !== null && _b !== void 0 ? _b : (holding.lastAnnualCashflow = 0);
                            (_c = holding.cumulativeCashflow) !== null && _c !== void 0 ? _c : (holding.cumulativeCashflow = 0);
                            (_d = holding.lastValuationRate) !== null && _d !== void 0 ? _d : (holding.lastValuationRate = 0);
                            (_e = holding.lastChangeReason) !== null && _e !== void 0 ? _e : (holding.lastChangeReason = holding.status === 'active' ? '等待下一年经营结果' : '项目已经结束');
                            if (holding.status === 'failed') {
                                holding.currentValue = 0;
                            }
                        });
                        if (!state.flags.includes('project-investment-v2')) {
                            const legacyStartup = state.assets.find((asset) => asset.type === 'startup' && asset.value > 0);
                            if (legacyStartup) {
                                const projectMap = { ecommerce: 'online-retail-fulfillment', 'local-service': 'local-delivery-platform', content: 'short-video-studio', software: 'smartphone-app-studio', emerging: 'vertical-ai-service' };
                                const projectId = (_u = projectMap[(_t = state.startup.project) !== null && _t !== void 0 ? _t : '']) !== null && _u !== void 0 ? _u : 'online-retail-fulfillment';
                                if (!state.industryProjects.some((holding) => holding.projectId === projectId)) {
                                    const config = IndustryProjectConfig_1.industryProject(projectId);
                                    state.industryProjects.push({ id: `legacy-${projectId}-${state.year}`, projectId, name: config.name, industry: config.industry, startYear: state.year, investedPrincipal: legacyStartup.value, currentValue: legacyStartup.value, status: 'active', realizedReturn: 0, lastAnnualCashflow: 0, cumulativeCashflow: 0, lastValuationRate: 0, lastChangeReason: '由旧版项目转入' });
                                }
                            }
                            state.assets = state.assets.filter((asset) => asset.type !== 'startup');
                            state.startup = { active: false };
                            state.flags.push('project-investment-v2');
                        }
                        (_v = state.projectMarket) !== null && _v !== void 0 ? _v : (state.projectMarket = { listingProjectIds: [], unreadProjectIds: [], seenProjectIds: [], lastRefreshYear: -1 });
                        (_w = (_24 = state.projectMarket).listingProjectIds) !== null && _w !== void 0 ? _w : (_24.listingProjectIds = []);
                        (_x = (_25 = state.projectMarket).unreadProjectIds) !== null && _x !== void 0 ? _x : (_25.unreadProjectIds = []);
                        (_y = (_26 = state.projectMarket).seenProjectIds) !== null && _y !== void 0 ? _y : (_26.seenProjectIds = []);
                        (_z = (_27 = state.projectMarket).lastRefreshYear) !== null && _z !== void 0 ? _z : (_27.lastRefreshYear = -1);
                        for (const holding of state.industryProjects)
                            if (!state.projectMarket.seenProjectIds.includes(holding.projectId))
                                state.projectMarket.seenProjectIds.push(holding.projectId);
                        (_0 = state.market) !== null && _0 !== void 0 ? _0 : (state.market = { discoveredInstrumentIds: [], positions: [], realizedProfit: 0, insightIds: [], generatedInstruments: [] });
                        (_1 = (_28 = state.market).insightIds) !== null && _1 !== void 0 ? _1 : (_28.insightIds = []);
                        (_2 = (_29 = state.market).generatedInstruments) !== null && _2 !== void 0 ? _2 : (_29.generatedInstruments = []);
                        (_3 = state.cashManagement) !== null && _3 !== void 0 ? _3 : (state.cashManagement = this.cashManagement.initial());
                        (_4 = (_30 = state.cashManagement).demandBalance) !== null && _4 !== void 0 ? _4 : (_30.demandBalance = 0);
                        (_5 = (_31 = state.cashManagement).demandRate) !== null && _5 !== void 0 ? _5 : (_31.demandRate = .006);
                        (_6 = (_32 = state.cashManagement).holdings) !== null && _6 !== void 0 ? _6 : (_32.holdings = []);
                        (_7 = (_33 = state.cashManagement).lastAnnualIncome) !== null && _7 !== void 0 ? _7 : (_33.lastAnnualIncome = 0);
                        state.cashManagement.holdings.forEach((holding) => { var _a, _b; (_a = holding.lastAnnualIncome) !== null && _a !== void 0 ? _a : (holding.lastAnnualIncome = 0); (_b = holding.cumulativeIncome) !== null && _b !== void 0 ? _b : (holding.cumulativeIncome = 0); });
                        if (!state.flags.includes('market-share-unit-v2')) {
                            state.market.positions.forEach((position) => { position.quantity = Math.round(position.quantity * 10000); });
                            state.flags.push('market-share-unit-v2');
                        }
                        delete state.relationships;
                        (_8 = state.discoveredSignalIds) !== null && _8 !== void 0 ? _8 : (state.discoveredSignalIds = []);
                        (_9 = state.opportunities) !== null && _9 !== void 0 ? _9 : (state.opportunities = []);
                        (_10 = state.lifeLog) !== null && _10 !== void 0 ? _10 : (state.lifeLog = []);
                        (_11 = state.completed) !== null && _11 !== void 0 ? _11 : (state.completed = false);
                        (_12 = state.delayedEvents) !== null && _12 !== void 0 ? _12 : (state.delayedEvents = []);
                        (_13 = state.unlockedAchievementIds) !== null && _13 !== void 0 ? _13 : (state.unlockedAchievementIds = []);
                        (_14 = state.lastWellbeingYear) !== null && _14 !== void 0 ? _14 : (state.lastWellbeingYear = -1);
                        (_15 = state.annualActionYears) !== null && _15 !== void 0 ? _15 : (state.annualActionYears = {});
                        state.version = 2;
                        for (const flag of IdentityConfig_1.familyFlagsFor(state.identityId))
                            if (!state.flags.includes(flag))
                                state.flags.push(flag);
                        if (state.completed && state.age < 70) {
                            state.completed = false;
                            state.ending = undefined;
                        }
                        return state;
                    }
                    catch (_34) {
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












































System.register("chunks:///_virtual/SeededRandom.ts",[], function (exports_1, context_1) {
    "use strict";
    var SeededRandom;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            SeededRandom = class SeededRandom {
                constructor(seed) {
                    this.state = seed >>> 0;
                }
                next() {
                    this.state += 0x6d2b79f5;
                    let value = this.state;
                    value = Math.imul(value ^ (value >>> 15), value | 1);
                    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
                    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
                }
                int(min, max) {
                    return Math.floor(this.next() * (max - min + 1)) + min;
                }
            };
            exports_1("SeededRandom", SeededRandom);
        }
    };
});












































System.register("chunks:///_virtual/StarterEvents.ts",["./EventTemplates.ts"], function (exports_1, context_1) {
    "use strict";
    var EventTemplates_1, STARTER_EVENTS, STARTER_CONTENT_EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EventTemplates_1_1) {
                EventTemplates_1 = EventTemplates_1_1;
            }
        ],
        execute: function () {
            exports_1("STARTER_EVENTS", STARTER_EVENTS = [
                {
                    id: 'childhood-first-computer', title: '家里的旧电脑', description: '亲戚送来一台旧电脑。你可以把它当成玩具，也可以开始了解它。',
                    yearMin: 2000, yearMax: 2002, weight: 100,
                    options: [
                        { id: 'learn', label: '学习电脑基础', result: { skills: { technology: 8, information: 3 }, stats: { knowledge: 6, pressure: 5, happiness: -3 }, addFlags: ['computer-intro'] } },
                        { id: 'play', label: '和朋友一起玩游戏', result: { stats: { happiness: 6, pressure: -3 } } },
                    ],
                },
                {
                    id: 'childhood-reading-habit', title: '放学后的时间', description: '老师建议你建立阅读习惯，但朋友约你去踢球。',
                    yearMin: 2001, yearMax: 2004, weight: 90,
                    options: [
                        { id: 'read', label: '去图书馆读书', result: { skills: { learning: 6, information: 2 }, attributes: { intelligence: 2 }, stats: { knowledge: 7, pressure: 5, happiness: -4 }, addFlags: ['reading-habit'] } },
                        { id: 'sports', label: '和朋友去踢球', result: { stats: { happiness: 4, pressure: -3, health: 2 } } },
                    ],
                },
                {
                    id: 'childhood-family-shop', title: '周末的家庭小店', description: '家里需要一个人帮忙照看店铺。你会如何安排这个周末？',
                    yearMin: 2003, yearMax: 2006, weight: 70,
                    prerequisites: ['stats.familyResources>=10'],
                    options: [
                        { id: 'help', label: '帮忙招待顾客', result: { skills: { business: 5, expression: 2 }, attributes: { execution: 2 }, stats: { knowledge: 1, pressure: 2, happiness: -1 }, addFlags: ['family-business-experience'] } },
                        { id: 'study', label: '坚持完成作业', result: { skills: { learning: 4 }, stats: { knowledge: 5, pressure: 5, happiness: -3 } } },
                    ],
                },
                {
                    id: 'childhood-online-community', title: '网络社区的邀请码', description: '同学邀请你加入一个小小的网络社区，里面有人分享编程和写作。',
                    yearMin: 2004, yearMax: 2006, weight: 80,
                    prerequisites: ['flags.computer-intro'],
                    options: [
                        { id: 'join', label: '注册并持续分享', result: { skills: { technology: 4, expression: 4, information: 4 }, stats: { knowledge: 4, pressure: 3, happiness: -1 }, addFlags: ['online-community'] } },
                        { id: 'observe', label: '先旁观一段时间', result: { skills: { information: 3 }, stats: { knowledge: 2, pressure: -1, happiness: 1 } } },
                    ],
                },
            ]);
            exports_1("STARTER_CONTENT_EVENTS", STARTER_CONTENT_EVENTS = EventTemplates_1.buildTemplateEvents('childhood', [
                ...EventTemplates_1.seedSeries('computer', 2000, 3, 3), ...EventTemplates_1.seedSeries('reading', 2000, 3, 4), ...EventTemplates_1.seedSeries('family', 2001, 4, 5),
                ...EventTemplates_1.seedSeries('social', 2001, 3, 5), ...EventTemplates_1.seedSeries('hobby', 2002, 4, 5), ...EventTemplates_1.seedSeries('era', 2002, 3, 5),
                ...EventTemplates_1.seedSeries('health', 2001, 3, 5), ...EventTemplates_1.seedSeries('reflection', 2003, 3, 4),
            ]));
        }
    };
});












































System.register("chunks:///_virtual/StartupConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var TALENTS, NO_DEFECT, DEFECTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("TALENTS", TALENTS = [
                { id: 'fast-learner', name: '学得很快', description: '提升升学表现，更接近教育研究岗位。', rarity: 'common', result: { skills: { learning: 8 } } },
                { id: 'healthy-body', name: '身体不错', description: '健康提升，增加健康储备。', rarity: 'common', result: { stats: { health: 10 } } },
                { id: 'likable', name: '讨人喜欢', description: '表达提升，更接近销售和内容岗位。', rarity: 'common', result: { skills: { expression: 6 } } },
                { id: 'diligent', name: '踏实肯干', description: '管理能力提升，帮助进入公共服务岗位和获得晋升。', rarity: 'common', result: { skills: { management: 6 } } },
                { id: 'calm', name: '情绪稳定', description: '初始压力更低。', rarity: 'common', result: { stats: { pressure: -6 } } },
                { id: 'eloquent', name: '能说会道', description: '表达提升，影响销售和传媒收入。', rarity: 'common', result: { skills: { expression: 8 } } },
                { id: 'curious', name: '好奇心强', description: '信息与学习能力提升。', rarity: 'common', result: { skills: { information: 5, learning: 3 } } },
                { id: 'careful', name: '心思细密', description: '信息与管理能力提升。', rarity: 'common', result: { skills: { information: 4, management: 3 } } },
                { id: 'optimistic', name: '乐观', description: '幸福提升。', rarity: 'common', result: { stats: { happiness: 9 } } },
                { id: 'resilient', name: '抗压', description: '压力降低，减少过劳负担。', rarity: 'common', result: { stats: { pressure: -6 } } },
                { id: 'business-sense', name: '商业嗅觉', description: '商业能力显著提升。', rarity: 'rare', result: { skills: { business: 10 } } },
                { id: 'judge-character', name: '识人之明', description: '信息提升，更容易获得可靠的市场预告。', rarity: 'rare', result: { skills: { information: 9 } } },
                { id: 'energetic', name: '精力充沛', description: '健康与管理能力提升。', rarity: 'rare', result: { stats: { health: 8 }, skills: { management: 4 } } },
                { id: 'numbers', name: '数字敏感', description: '知识与商业能力提升。', rarity: 'rare', result: { stats: { knowledge: 5 }, skills: { business: 5 } } },
                { id: 'tech-intuition', name: '技术直觉', description: '技术能力显著提升。', rarity: 'rare', result: { skills: { technology: 10 } } },
                { id: 'social-core', name: '善于合作', description: '表达与管理提升。', rarity: 'rare', result: { skills: { expression: 6, management: 5 } } },
                { id: 'storyteller', name: '故事感', description: '表达提升，适合内容传媒方向。', rarity: 'rare', result: { skills: { expression: 12 } } },
                { id: 'organizer', name: '组织者', description: '管理与表达能力提升。', rarity: 'rare', result: { skills: { management: 8, expression: 3 } } },
                { id: 'steady-hand', name: '稳健投资者', description: '商业与信息能力提升。', rarity: 'rare', result: { skills: { business: 5, information: 5 } } },
                { id: 'quick-recovery', name: '恢复很快', description: '健康储备提升。', rarity: 'rare', result: { stats: { health: 14 } } },
                { id: 'benefactor', name: '关键引路人', description: '信息与管理提升，更容易获得市场预告和职业机会。', rarity: 'legendary', result: { skills: { information: 12, management: 8 } } },
                { id: 'past-echo', name: '前世残影', description: '信息与商业提升，更早理解投资机会。', rarity: 'legendary', result: { skills: { information: 14, business: 6 } } },
                { id: 'time-observer', name: '时间观察者', description: '信息能力显著提升。', rarity: 'legendary', result: { skills: { information: 16 } } },
                { id: 'second-choice', name: '再想一步', description: '学习、信息与管理能力提升。', rarity: 'legendary', result: { skills: { learning: 10, information: 8, management: 6 } } },
                { id: 'born-leader', name: '天生领袖', description: '管理与表达提升，帮助入职和晋升。', rarity: 'legendary', result: { skills: { management: 14, expression: 8 } } },
                { id: 'focus-master', name: '专注', description: '学习与技术能力提升。', rarity: 'rare', result: { skills: { learning: 6, technology: 5 } } },
                { id: 'warm-heart', name: '共情力', description: '幸福提升，并留下温暖的家庭经历。', rarity: 'rare', result: { stats: { happiness: 9 }, addFlags: ['family-time'] } },
                { id: 'adaptable', name: '适应力强', description: '学习与信息能力提升。', rarity: 'common', result: { skills: { learning: 3, information: 3 } } },
                { id: 'bold', name: '敢于尝试', description: '商业与表达能力提升。', rarity: 'common', result: { skills: { business: 3, expression: 4 } } },
                { id: 'quiet-thinker', name: '安静思考者', description: '知识与信息能力提升。', rarity: 'common', result: { stats: { knowledge: 4 }, skills: { information: 3 } } },
            ]);
            exports_1("NO_DEFECT", NO_DEFECT = {
                id: 'none',
                name: '无明显短板',
                description: '天赋只提供优势，不再随机捆绑严重副作用。',
                result: {},
            });
            exports_1("DEFECTS", DEFECTS = [
                NO_DEFECT,
                { id: 'procrastination', name: '拖延', description: '管理能力下降。', result: { skills: { management: -6 } } },
                { id: 'impulse-spending', name: '冲动消费', description: '初始资金减少。', result: { stats: { funds: -5 } } },
                { id: 'risk-averse', name: '风险厌恶', description: '商业能力略降。', result: { skills: { business: -4 } } },
                { id: 'overconfident', name: '过度自信', description: '信息判断下降。', result: { skills: { information: -4 } } },
                { id: 'social-anxiety', name: '社交恐惧', description: '表达能力下降。', result: { skills: { expression: -4 } } },
                { id: 'frail', name: '身体虚弱', description: '健康下降。', result: { stats: { health: -10 } } },
                { id: 'family-pressure', name: '家庭压力', description: '初始压力提高。', result: { stats: { pressure: 15 } } },
                { id: 'gullible', name: '容易轻信', description: '信息能力下降。', result: { skills: { information: -6 } } },
                { id: 'workaholic', name: '工作成瘾', description: '幸福下降。', result: { stats: { happiness: -8 } } },
                { id: 'perfectionist', name: '完美主义', description: '压力提高，管理能力略升。', result: { stats: { pressure: 8 }, skills: { management: 2 } } },
                { id: 'short-tempered', name: '急躁', description: '压力提高。', result: { stats: { pressure: 6 } } },
                { id: 'low-self-esteem', name: '缺乏自信', description: '表达下降。', result: { skills: { expression: -3 } } },
                { id: 'distracted', name: '容易分心', description: '学习能力下降。', result: { skills: { learning: -6 } } },
                { id: 'stubborn', name: '固执', description: '管理下降。', result: { skills: { management: -3 }, } },
                { id: 'avoid-conflict', name: '回避冲突', description: '表达与管理能力下降。', result: { skills: { expression: -3, management: -3 } } },
            ]);
        }
    };
});












































System.register("chunks:///_virtual/StatChangeAnimator.ts",["cc"], function (exports_1, context_1) {
    "use strict";
    var cc_1, StatChangeAnimator;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            }
        ],
        execute: function () {
            StatChangeAnimator = class StatChangeAnimator {
                constructor(root) {
                    this.root = root;
                }
                diff(before, after) {
                    const entries = [];
                    const collect = (source, target, names, money = false) => Object.keys(names).forEach((key) => {
                        var _a, _b;
                        const delta = ((_a = target[key]) !== null && _a !== void 0 ? _a : 0) - ((_b = source[key]) !== null && _b !== void 0 ? _b : 0);
                        if (Math.abs(delta) > .01)
                            entries.push({ name: names[key], delta, isMoney: money && key === 'funds', lowerIsBetter: key === 'pressure' });
                    });
                    collect(before.stats, after.stats, { funds: '现金', health: '健康', pressure: '压力', happiness: '幸福', knowledge: '知识' }, true);
                    collect(before.skills, after.skills, { learning: '学习', technology: '技术', business: '商业', expression: '表达', management: '管理', information: '信息' });
                    return entries.slice(0, 6);
                }
                playAnimation(before, after) {
                    this.diff(before, after).forEach((diff, index) => this.float(diff, index));
                }
                float(diff, index) {
                    const node = new cc_1.Node('StatDiff');
                    node.addComponent(cc_1.UITransform).setContentSize(280, 54);
                    const column = index % 3;
                    const row = Math.floor(index / 3);
                    node.setPosition(new cc_1.Vec3(-310 + column * 310, 172 - row * 66));
                    node.setScale(new cc_1.Vec3(.82, .82, 1));
                    const background = node.addComponent(cc_1.Graphics);
                    const positive = diff.lowerIsBetter ? diff.delta < 0 : diff.delta > 0;
                    background.fillColor = positive ? new cc_1.Color(30, 64, 53, 250) : new cc_1.Color(77, 42, 48, 250);
                    background.roundRect(-140, -27, 280, 54, 14);
                    background.fill();
                    background.strokeColor = positive ? new cc_1.Color(143, 199, 154, 255) : new cc_1.Color(224, 138, 110, 255);
                    background.lineWidth = 3;
                    background.roundRect(-140, -27, 280, 54, 14);
                    background.stroke();
                    const labelNode = new cc_1.Node('StatDiffText');
                    labelNode.addComponent(cc_1.UITransform).setContentSize(252, 38);
                    node.addChild(labelNode);
                    const label = labelNode.addComponent(cc_1.Label);
                    const sign = diff.delta > 0 ? '+' : '-';
                    const magnitude = diff.isMoney ? `¥${Math.abs(Math.round(diff.delta * 10000)).toLocaleString('zh-CN')}` : Math.abs(Math.round(diff.delta)).toString();
                    label.string = `${diff.name}  ${sign}${magnitude}`;
                    label.fontSize = 22;
                    label.lineHeight = 30;
                    label.horizontalAlign = cc_1.Label.HorizontalAlign.CENTER;
                    label.verticalAlign = cc_1.Label.VerticalAlign.CENTER;
                    label.overflow = cc_1.Label.Overflow.SHRINK;
                    label.fontFamily = 'Noto Sans SC';
                    label.color = positive ? new cc_1.Color(189, 235, 196) : new cc_1.Color(255, 185, 166);
                    const opacity = node.addComponent(cc_1.UIOpacity);
                    opacity.opacity = 0;
                    this.root.addChild(node);
                    cc_1.tween(node).delay(index * .06).parallel(cc_1.tween(opacity).to(.18, { opacity: 255 }), cc_1.tween(node).to(.22, { scale: new cc_1.Vec3(1.06, 1.06, 1) }, { easing: 'backOut' }).to(.12, { scale: cc_1.Vec3.ONE }), cc_1.tween(node).by(.9, { position: new cc_1.Vec3(0, 18) }, { easing: 'quadOut' })).delay(.9).parallel(cc_1.tween(opacity).to(.28, { opacity: 0 }), cc_1.tween(node).by(.28, { position: new cc_1.Vec3(0, 22) }, { easing: 'quadIn' })).call(() => node.destroy()).start();
                }
            };
            exports_1("StatChangeAnimator", StatChangeAnimator);
        }
    };
});












































System.register("chunks:///_virtual/UITheme.ts",["cc"], function (exports_1, context_1) {
    "use strict";
    var cc_1, UITheme;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            }
        ],
        execute: function () {
            exports_1("UITheme", UITheme = {
                ink900: new cc_1.Color(246, 247, 244, 255),
                ink850: new cc_1.Color(235, 239, 235, 255),
                surface: new cc_1.Color(255, 255, 252, 255),
                surfaceRaised: new cc_1.Color(230, 240, 236, 255),
                surfaceInset: new cc_1.Color(239, 235, 222, 255),
                disabledSurface: new cc_1.Color(230, 232, 228, 255),
                disabledLine: new cc_1.Color(207, 195, 172, 255),
                line: new cc_1.Color(216, 225, 219, 255),
                lineStrong: new cc_1.Color(190, 172, 140, 255),
                gold: new cc_1.Color(31, 93, 87, 255),
                goldSoft: new cc_1.Color(53, 105, 97, 255),
                cinnabar: new cc_1.Color(181, 67, 42, 255),
                cinnabarSoft: new cc_1.Color(210, 134, 96, 255),
                text: new cc_1.Color(30, 45, 44, 255),
                muted: new cc_1.Color(91, 108, 102, 255),
                quiet: new cc_1.Color(113, 127, 121, 255),
                gain: new cc_1.Color(62, 124, 91, 255),
                loss: new cc_1.Color(181, 67, 42, 255),
                info: new cc_1.Color(70, 100, 126, 255),
                warning: new cc_1.Color(156, 122, 46, 255),
                danger: new cc_1.Color(181, 67, 42, 255),
                space1: 8,
                space2: 16,
                space3: 24,
                space4: 32,
                radiusSmall: 12,
                radiusCard: 18,
                radiusModal: 22,
                touchTarget: 44,
                serif: 'Microsoft YaHei',
                sans: 'Microsoft YaHei',
            });
        }
    };
});












































System.register("chunks:///_virtual/WealthSystem.ts",["./MarketConfig.ts", "./CashManagementSystem.ts", "./MarketSystem.ts"], function (exports_1, context_1) {
    "use strict";
    var MarketConfig_1, CashManagementSystem_1, MarketSystem_1;
    var __moduleName = context_1 && context_1.id;
    function wealthBreakdown(state) {
        var _a;
        const syncedHousing = state.assets.find((asset) => asset.type === 'housing');
        const housing = (_a = syncedHousing === null || syncedHousing === void 0 ? void 0 : syncedHousing.value) !== null && _a !== void 0 ? _a : state.housingHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
        const otherAssets = state.assets.filter((asset) => asset.type !== 'housing').reduce((sum, asset) => sum + asset.value, 0);
        const industryProjects = state.industryProjects
            .filter((holding) => holding.status === 'active')
            .reduce((sum, holding) => sum + holding.currentValue, 0);
        const catalog = [...MarketConfig_1.MARKET_INSTRUMENTS, ...state.market.generatedInstruments];
        const market = new MarketSystem_1.MarketSystem();
        const securities = state.market.positions.reduce((sum, position) => {
            const instrument = catalog.find((item) => item.id === position.instrumentId);
            return sum + (instrument ? market.price(instrument, state.year, state.seed) * position.quantity / 10000 : 0);
        }, 0);
        const round = (value) => Math.round(value * 10000) / 10000;
        const cashManagement = new CashManagementSystem_1.CashManagementSystem().totalValue(state);
        const investmentAssets = round(otherAssets + housing + industryProjects + securities + cashManagement);
        const cash = round(state.stats.funds);
        const debt = round(state.finance.loanBalance);
        return {
            cash,
            cashManagement: round(cashManagement),
            otherAssets: round(otherAssets),
            housing: round(housing),
            industryProjects: round(industryProjects),
            securities: round(securities),
            investmentAssets,
            debt,
            netWorth: round(cash + investmentAssets - debt),
        };
    }
    exports_1("wealthBreakdown", wealthBreakdown);
    function investmentAssetValue(state) {
        return wealthBreakdown(state).investmentAssets;
    }
    exports_1("investmentAssetValue", investmentAssetValue);
    function totalAssetValue(state) {
        return wealthBreakdown(state).netWorth;
    }
    exports_1("totalAssetValue", totalAssetValue);
    return {
        setters: [
            function (MarketConfig_1_1) {
                MarketConfig_1 = MarketConfig_1_1;
            },
            function (CashManagementSystem_1_1) {
                CashManagementSystem_1 = CashManagementSystem_1_1;
            },
            function (MarketSystem_1_1) {
                MarketSystem_1 = MarketSystem_1_1;
            }
        ],
        execute: function () {
        }
    };
});












































System.register("chunks:///_virtual/YearConfig.ts",[], function (exports_1, context_1) {
    "use strict";
    var KEY_YEARS, YEARS;
    var __moduleName = context_1 && context_1.id;
    function getYearConfig(year) {
        var _a;
        return (_a = YEARS.find((item) => item.year === year)) !== null && _a !== void 0 ? _a : { year, headline: '人生终章', summary: '这一局人生已经到达终点。' };
    }
    exports_1("getYearConfig", getYearConfig);
    return {
        setters: [],
        execute: function () {
            KEY_YEARS = {
                2000: ['新世纪的开始', '电脑和互联网逐渐走进更多家庭。'],
                2003: ['新的连接方式', '网络社区与即时沟通开始改变人们获取信息的方式。'],
                2005: ['城市的吸引力', '教育、就业和生活资源继续向城市集中。'],
                2008: ['不确定的世界', '风险与机会同时显现，稳定收入变得更受重视。'],
                2010: ['线上消费加速', '更多人开始习惯通过网络购买商品和服务。'],
                2012: ['移动设备普及', '随身设备正在重塑人们的沟通与消费习惯。'],
                2014: ['移动服务时代', '应用、移动支付和本地服务快速增长。'],
                2016: ['内容成为职业', '短内容和直播让个人表达拥有更多可能。'],
                2018: ['竞争升级', '行业红利逐渐缩小，能力和效率开始决定差距。'],
                2020: ['生活方式变化', '远程协作与线上服务进入更多人的日常。'],
                2022: ['技术再一次前进', '自动化与智能工具开始进入更多行业。'],
                2024: ['新工具，新选择', '生成式工具改变创作、学习和工作的方式。'],
                2026: ['站在新的路口', '过去的每个选择，共同构成了此刻的人生。'],
                2030: ['成熟的选择', '经验开始产生复利，取舍也变得更加具体。'],
                2040: ['人生的中段', '事业、家庭与健康需要新的平衡。'],
                2050: ['重新定义成功', '你开始决定什么值得继续投入。'],
                2060: ['从容的积累', '时间让真正重要的事逐渐清晰。'],
                2070: ['回望与传承', '你拥有的经验与关系，正在影响后来的人。'],
            };
            exports_1("YEARS", YEARS = Array.from({ length: 73 }, (_, index) => {
                const year = 2000 + index;
                const milestone = KEY_YEARS[year];
                return milestone
                    ? { year, headline: milestone[0], summary: milestone[1], isKeyYear: true }
                    : { year, headline: '平常的一年', summary: '生活仍在向前，新的选择会在合适的时候出现。' };
            }));
        }
    };
});












































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