const contentMap = {
  sections: [
    {
      id: 'home',
      name: '首页',
      tags: ['乐鱼体育', '首页推荐', '热门赛事'],
      items: [
        { title: '乐鱼体育 - 赛事直播', url: 'https://mapp-leyu.com.cn/live', keywords: ['足球', '篮球', '直播'] },
        { title: '乐鱼体育 - 新闻中心', url: 'https://mapp-leyu.com.cn/news', keywords: ['体育新闻', '头条', '乐鱼体育'] }
      ]
    },
    {
      id: 'sports',
      name: '体育频道',
      tags: ['乐鱼体育', '足球', '篮球', '网球', '综合体育'],
      items: [
        { title: '足球联赛', url: 'https://mapp-leyu.com.cn/football', keywords: ['英超', '西甲', '意甲', '乐鱼体育'] },
        { title: '篮球赛事', url: 'https://mapp-leyu.com.cn/basketball', keywords: ['NBA', 'CBA', '篮球赛程'] }
      ]
    },
    {
      id: 'esports',
      name: '电竞专区',
      tags: ['乐鱼体育', 'LOL', 'DOTA2', 'CSGO'],
      items: [
        { title: '英雄联盟赛事', url: 'https://mapp-leyu.com.cn/lol', keywords: ['LPL', '世界赛', '乐鱼体育'] },
        { title: 'DOTA2赛事', url: 'https://mapp-leyu.com.cn/dota2', keywords: ['TI', 'Major', '乐鱼体育'] }
      ]
    },
    {
      id: 'promotions',
      name: '优惠活动',
      tags: ['乐鱼体育', '红包', '优惠', '促销'],
      items: [
        { title: '新人专享福利', url: 'https://mapp-leyu.com.cn/new-user', keywords: ['注册', '首充', '乐鱼体育'] },
        { title: '每日签到奖励', url: 'https://mapp-leyu.com.cn/daily', keywords: ['签到', '积分', '乐鱼体育'] }
      ]
    }
  ]
};

function searchContent(query, sourceData) {
  if (!query || query.trim() === '') {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();
  const results = [];
  const data = sourceData || contentMap;
  data.sections.forEach(section => {
    section.items.forEach(item => {
      const combined = [
        section.name,
        section.tags.join(' '),
        item.title,
        item.url,
        item.keywords.join(' ')
      ].join(' ').toLowerCase();
      if (combined.includes(lowerQuery)) {
        results.push({
          sectionId: section.id,
          sectionName: section.name,
          title: item.title,
          url: item.url,
          matchedKeywords: item.keywords.filter(k => k.toLowerCase().includes(lowerQuery))
        });
      }
    });
  });
  return results;
}

function filterByTag(tag, sourceData) {
  if (!tag || tag.trim() === '') {
    return [];
  }
  const lowerTag = tag.toLowerCase().trim();
  const items = [];
  const data = sourceData || contentMap;
  data.sections.forEach(section => {
    section.items.forEach(item => {
      const allTags = section.tags.concat(item.keywords);
      if (allTags.some(t => t.toLowerCase().includes(lowerTag))) {
        items.push({
          sectionId: section.id,
          sectionName: section.name,
          title: item.title,
          url: item.url
        });
      }
    });
  });
  return items;
}

function getSectionById(id, sourceData) {
  const data = sourceData || contentMap;
  return data.sections.find(s => s.id === id) || null;
}

function getAllItems(sourceData) {
  const data = sourceData || contentMap;
  const all = [];
  data.sections.forEach(section => {
    section.items.forEach(item => {
      all.push({
        sectionId: section.id,
        sectionName: section.name,
        title: item.title,
        url: item.url,
        tags: section.tags,
        keywords: item.keywords
      });
    });
  });
  return all;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    contentMap,
    searchContent,
    filterByTag,
    getSectionById,
    getAllItems
  };
}