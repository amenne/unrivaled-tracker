// Unrivaled Basketball Tracker
// Static GitHub Pages Version - No server required

const CONFIG = {
    // CORS proxies - tries each in order until one works
    // To set up your own reliable proxy, see cloudflare-worker/README.md
    CORS_PROXIES: [
        // Add your Cloudflare Worker URL here (recommended):
        // 'https://your-worker-name.your-subdomain.workers.dev',

        // Public proxies (less reliable fallbacks):
        'https://corsproxy.org/?',
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?',
        'https://proxy.cors.sh/',
        'https://api.codetabs.com/v1/proxy?quest='
    ],
    UNRIVALED_BASE: 'https://www.unrivaled.basketball',
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    SCORES_DAYS: 14,
    DEBUG: true  // Enable debug logging to console
};

// Team data with rosters (embedded for static hosting)
const TEAM_DATA = {
    rose: {
        name: 'Rose',
        slug: 'rose',
        color: '#E91E63',
        coach: { name: 'Nola Henry', image: 'https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/staff/nola-henry/images/headshot.jpg' },
        roster: [
            { name: 'Kahleah Copper', slug: 'kahleah-copper' },
            { name: 'Chelsea Gray', slug: 'chelsea-gray' },
            { name: 'Azurá Stevens', slug: 'azura-stevens' },
            { name: 'Shakira Austin', slug: 'shakira-austin' },
            { name: 'Lexie Hull', slug: 'lexie-hull' },
            { name: 'Sug Sutton', slug: 'sug-sutton' }
        ]
    },
    mist: {
        name: 'Mist',
        slug: 'mist',
        color: '#90CAF9',
        coach: { name: 'Zach O\'Brien', image: 'https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/staff/zach-obrien/images/headshot.jpg' },
        roster: [
            { name: 'Breanna Stewart', slug: 'breanna-stewart' },
            { name: 'Arike Ogunbowale', slug: 'arike-ogunbowale' },
            { name: 'Allisha Gray', slug: 'allisha-gray' },
            { name: 'Alanna Smith', slug: 'alanna-smith' },
            { name: 'Veronica Burton', slug: 'veronica-burton' },
            { name: 'Li Yueru', slug: 'li-yueru' }
        ]
    },
    breeze: {
        name: 'Breeze',
        slug: 'breeze',
        color: '#4DD0E1',
        coach: { name: 'Phil Handy', image: 'https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/staff/phil-handy/images/headshot.jpg' },
        roster: [
            { name: 'Jewell Loyd', slug: 'jewell-loyd' },
            { name: 'Skylar Diggins-Smith', slug: 'skylar-diggins-smith' },
            { name: 'Dearica Hamby', slug: 'dearica-hamby' },
            { name: 'Rickea Jackson', slug: 'rickea-jackson' },
            { name: 'DiJonai Carrington', slug: 'dijonai-carrington' },
            { name: 'Kayla McBride', slug: 'kayla-mcbride' }
        ]
    },
    phantom: {
        name: 'Phantom',
        slug: 'phantom',
        color: '#9C27B0',
        coach: { name: 'Teresa Weatherspoon', image: 'https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/staff/teresa-weatherspoon/images/headshot.jpg' },
        roster: [
            { name: 'Brittney Griner', slug: 'brittney-griner' },
            { name: 'Diana Taurasi', slug: 'diana-taurasi' },
            { name: 'Courtney Williams', slug: 'courtney-williams' },
            { name: 'Natasha Cloud', slug: 'natasha-cloud' },
            { name: 'Satou Sabally', slug: 'satou-sabally' },
            { name: 'Kate Martin', slug: 'kate-martin' }
        ]
    },
    laces: {
        name: 'Laces',
        slug: 'laces',
        color: '#FF9800',
        coach: { name: 'DJ Sackmann', image: 'https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/staff/dj-sackmann/images/headshot.jpg' },
        roster: [
            { name: 'Angel Reese', slug: 'angel-reese' },
            { name: 'Kelsey Plum', slug: 'kelsey-plum' },
            { name: 'Tiffany Hayes', slug: 'tiffany-hayes' },
            { name: 'Kysre Gondrezick', slug: 'kysre-gondrezick' },
            { name: 'Stefanie Dolson', slug: 'stefanie-dolson' },
            { name: 'Jasmine Thomas', slug: 'jasmine-thomas' }
        ]
    },
    vinyl: {
        name: 'Vinyl',
        slug: 'vinyl',
        color: '#673AB7',
        coach: { name: 'Adam Harrington', image: 'https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/staff/adam-harrington/images/headshot.jpg' },
        roster: [
            { name: 'Napheesa Collier', slug: 'napheesa-collier' },
            { name: 'Courtney Vandersloot', slug: 'courtney-vandersloot' },
            { name: 'Jackie Young', slug: 'jackie-young' },
            { name: 'Brionna Jones', slug: 'brionna-jones' },
            { name: 'Jordin Canada', slug: 'jordin-canada' },
            { name: 'Marina Mabrey', slug: 'marina-mabrey' }
        ]
    },
    'lunar-owls': {
        name: 'Lunar Owls',
        slug: 'lunar-owls',
        color: '#607D8B',
        coach: { name: 'Niele Ivey', image: 'https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/staff/niele-ivey/images/headshot.jpg' },
        roster: [
            { name: 'Nneka Ogwumike', slug: 'nneka-ogwumike' },
            { name: 'Kelsey Mitchell', slug: 'kelsey-mitchell' },
            { name: 'Rhyne Howard', slug: 'rhyne-howard' },
            { name: 'Kayla Thornton', slug: 'kayla-thornton' },
            { name: 'Linnae Harper', slug: 'linnae-harper' },
            { name: 'Odyssey Sims', slug: 'odyssey-sims' }
        ]
    },
    hive: {
        name: 'Hive',
        slug: 'hive',
        color: '#FFC107',
        coach: { name: 'Nate Tibbetts', image: 'https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/staff/nate-tibbetts/images/headshot.jpg' },
        roster: [
            { name: 'A\'ja Wilson', slug: 'aja-wilson' },
            { name: 'Sydney Colson', slug: 'sydney-colson' },
            { name: 'Aaliyah Edwards', slug: 'aaliyah-edwards' },
            { name: 'NaLyssa Smith', slug: 'nalyssa-smith' },
            { name: 'Azura Stevens', slug: 'azura-stevens' },
            { name: 'Destanni Henderson', slug: 'destanni-henderson' }
        ]
    }
};

// Fallback schedule data - shown only when live data fetch fails
// Note: This data may be outdated. The app will display a warning banner when using fallback data.
const FALLBACK_SCHEDULE = [
    { date: '2026-01-05T19:00:00', home: 'Mist', away: 'Hive', home_points: 72, away_points: 56, status: 'closed' },
    { date: '2026-01-05T20:15:00', home: 'Laces', away: 'Vinyl', home_points: 58, away_points: 42, status: 'closed' },
    { date: '2026-01-05T21:30:00', home: 'Rose', away: 'Lunar Owls', home_points: 80, away_points: 62, status: 'closed' },
    { date: '2026-01-05T22:45:00', home: 'Breeze', away: 'Phantom', home_points: 69, away_points: 62, status: 'closed' },
    { date: '2026-01-09T19:30:00', home: 'Rose', away: 'Vinyl', home_points: 69, away_points: 67, status: 'closed' },
    { date: '2026-01-09T20:45:00', home: 'Breeze', away: 'Hive', home_points: 73, away_points: 62, status: 'closed' },
    { date: '2026-01-10T19:30:00', home: 'Phantom', away: 'Lunar Owls', home_points: 94, away_points: 60, status: 'closed' },
    { date: '2026-01-10T20:45:00', home: 'Mist', away: 'Laces', home_points: 83, away_points: 81, status: 'closed' },
    { date: '2026-01-11T19:30:00', home: 'Rose', away: 'Breeze', home_points: 73, away_points: 69, status: 'closed' },
    { date: '2026-01-11T20:45:00', home: 'Vinyl', away: 'Hive', home_points: 89, away_points: 66, status: 'closed' },
    { date: '2026-01-12T19:30:00', home: 'Phantom', away: 'Mist', status: 'scheduled', broadcast: 'TNT/truTV' },
    { date: '2026-01-12T20:45:00', home: 'Lunar Owls', away: 'Laces', status: 'scheduled', broadcast: 'TNT/truTV' },
    { date: '2026-01-16T19:30:00', home: 'Phantom', away: 'Laces', status: 'scheduled', broadcast: 'TNT/truTV' },
    { date: '2026-01-16T20:45:00', home: 'Hive', away: 'Rose', status: 'scheduled', broadcast: 'TNT/truTV' },
    { date: '2026-01-17T19:30:00', home: 'Vinyl', away: 'Mist', status: 'scheduled', broadcast: 'truTV' },
    { date: '2026-01-17T20:45:00', home: 'Breeze', away: 'Lunar Owls', status: 'scheduled', broadcast: 'truTV' },
    { date: '2026-01-18T15:00:00', home: 'Laces', away: 'Rose', status: 'scheduled', broadcast: 'TNT' },
    { date: '2026-01-18T16:15:00', home: 'Hive', away: 'Phantom', status: 'scheduled', broadcast: 'TNT' },
    { date: '2026-01-19T19:00:00', home: 'Mist', away: 'Breeze', status: 'scheduled', broadcast: 'TNT' },
    { date: '2026-01-19T20:15:00', home: 'Lunar Owls', away: 'Vinyl', status: 'scheduled', broadcast: 'TNT' },
    { date: '2026-01-23T19:30:00', home: 'Rose', away: 'Phantom', status: 'scheduled', broadcast: 'TNT/truTV' },
    { date: '2026-01-23T20:45:00', home: 'Mist', away: 'Lunar Owls', status: 'scheduled', broadcast: 'TNT/truTV' },
    { date: '2026-01-24T19:30:00', home: 'Hive', away: 'Laces', status: 'scheduled', broadcast: 'truTV' },
    { date: '2026-01-24T20:45:00', home: 'Vinyl', away: 'Breeze', status: 'scheduled', broadcast: 'truTV' }
].map(g => ({
    ...g,
    scheduled: g.date,
    home: { name: g.home, alias: g.home },
    away: { name: g.away, alias: g.away },
    venue: { name: 'Mediapro Sports Center, Miami' }
}));

// Fallback standings (computed from schedule)
const FALLBACK_STANDINGS = [
    { name: 'Rose', wins: 3, losses: 0, pct: 1.000 },
    { name: 'Mist', wins: 2, losses: 0, pct: 1.000 },
    { name: 'Breeze', wins: 2, losses: 1, pct: 0.667 },
    { name: 'Phantom', wins: 1, losses: 1, pct: 0.500 },
    { name: 'Laces', wins: 1, losses: 1, pct: 0.500 },
    { name: 'Vinyl', wins: 1, losses: 2, pct: 0.333 },
    { name: 'Lunar Owls', wins: 0, losses: 2, pct: 0.000 },
    { name: 'Hive', wins: 0, losses: 3, pct: 0.000 }
];

// Helper functions for images
function getPlayerImage(playerSlug, teamSlug) {
    return `https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/players/${playerSlug}/images/2026/${teamSlug}-headshot.jpg`;
}

function getTeamLogo(teamSlug) {
    return `https://pub-ad8cc693759b4b55a181a76af041efa0.r2.dev/teams/${teamSlug}/images/logo/primary.png`;
}

// State Management
const state = {
    apiKey: localStorage.getItem('sportradar_api_key') || '',
    standings: null,
    schedule: null,
    scores: null,
    currentTeam: null,
    lastFetch: {
        standings: 0,
        schedule: 0,
        scores: 0
    },
    usingFallback: false, // Track if using fallback data
    lastSuccessfulFetch: null // Track actual last successful fetch time
};

// DOM Elements
const elements = {
    modal: document.getElementById('api-modal'),
    apiKeyInput: document.getElementById('api-key-input'),
    saveApiKeyBtn: document.getElementById('save-api-key'),
    navBtns: document.querySelectorAll('.nav-btn'),
    sections: document.querySelectorAll('.section'),
    standingsList: document.getElementById('standings-list'),
    scheduleList: document.getElementById('schedule-list'),
    scoresList: document.getElementById('scores-list'),
    lastUpdated: document.getElementById('last-updated'),
    // Team detail elements
    teamDetailSection: document.getElementById('team-detail'),
    teamHeader: document.getElementById('team-header'),
    teamRoster: document.getElementById('team-roster'),
    teamSchedule: document.getElementById('team-schedule'),
    backBtn: document.getElementById('back-btn'),
    // Data status elements
    dataStatusBanner: document.getElementById('data-status-banner'),
    retryFetchBtn: document.getElementById('retry-fetch')
};

// Initialize App
function init() {
    // No API key needed - we scrape from unrivaled.basketball
    hideModal();
    loadAllData();
    setupEventListeners();
    updateLastUpdated();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    elements.navBtns.forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });

    // API Key Modal
    if (elements.saveApiKeyBtn) {
        elements.saveApiKeyBtn.addEventListener('click', saveApiKey);
    }
    if (elements.apiKeyInput) {
        elements.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveApiKey();
        });
    }

    // Back button for team detail
    if (elements.backBtn) {
        elements.backBtn.addEventListener('click', () => {
            hideTeamDetail();
        });
    }

    // Retry fetch button
    if (elements.retryFetchBtn) {
        elements.retryFetchBtn.addEventListener('click', () => {
            loadAllData(true);
        });
    }

    // Pull to refresh (touch devices)
    let touchStart = 0;
    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            touchStart = e.touches[0].clientY;
        }
    });

    document.addEventListener('touchend', (e) => {
        const touchEnd = e.changedTouches[0].clientY;
        if (touchStart && touchEnd - touchStart > 100 && window.scrollY === 0) {
            loadAllData(true);
        }
        touchStart = 0;
    });
}

// Navigation
function switchSection(sectionId) {
    elements.navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });

    elements.sections.forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });
}

// Modal
function showModal() {
    elements.modal.classList.add('show');
}

function hideModal() {
    elements.modal.classList.remove('show');
}

function saveApiKey() {
    const key = elements.apiKeyInput.value.trim();
    if (key) {
        state.apiKey = key;
        localStorage.setItem('sportradar_api_key', key);
        hideModal();
        loadAllData();
    }
}

// Fetch HTML through CORS proxy (tries multiple proxies)
async function fetchHTML(urlPath) {
    const targetUrl = CONFIG.UNRIVALED_BASE + urlPath;

    for (const proxy of CONFIG.CORS_PROXIES) {
        // Some proxies want encoded URL, others want raw URL
        const needsEncoding = proxy.includes('?') || proxy.includes('allorigins') || proxy.includes('codetabs');
        const fullUrl = needsEncoding
            ? `${proxy}${encodeURIComponent(targetUrl)}`
            : `${proxy}${targetUrl}`;

        if (CONFIG.DEBUG) console.log(`Trying proxy: ${proxy}`);

        try {
            const response = await fetch(fullUrl, {
                signal: AbortSignal.timeout(10000), // 10 second timeout per proxy
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                }
            });

            if (CONFIG.DEBUG) console.log(`Proxy ${proxy} responded with status: ${response.status}`);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const text = await response.text();

            if (CONFIG.DEBUG) console.log(`Response length: ${text.length} chars`);

            // Verify we got valid HTML (not an error page)
            if (text.includes('__NEXT_DATA__')) {
                console.log(`✓ Successfully fetched via ${proxy}`);
                return text;
            }
            throw new Error('Invalid response - no Next.js data found');
        } catch (error) {
            console.warn(`✗ Proxy ${proxy} failed:`, error.message);
            continue; // Try next proxy
        }
    }

    throw new Error('All CORS proxies failed');
}

// Parse standings from HTML (Next.js __NEXT_DATA__)
function parseStandings(html) {
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);

    if (nextDataMatch) {
        try {
            const nextData = JSON.parse(nextDataMatch[1]);
            const pageProps = nextData?.props?.pageProps;
            console.log('Standings pageProps keys:', Object.keys(pageProps || {}));
            if (pageProps?.standings) {
                console.log('Found standings:', pageProps.standings.length, 'teams');
                return pageProps.standings;
            }
            if (pageProps?.teams) {
                console.log('Found teams:', pageProps.teams.length, 'teams');
                return pageProps.teams;
            }
            console.warn('No standings or teams found in pageProps');
        } catch (e) {
            console.log('Could not parse Next.js data:', e.message);
        }
    } else {
        console.warn('No __NEXT_DATA__ script found in standings HTML');
    }

    return null; // Will use fallback
}

// Parse schedule from HTML
function parseSchedule(html) {
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);

    if (nextDataMatch) {
        try {
            const nextData = JSON.parse(nextDataMatch[1]);
            const pageProps = nextData?.props?.pageProps;
            console.log('Schedule pageProps keys:', Object.keys(pageProps || {}));
            if (pageProps?.games || pageProps?.schedule) {
                const games = pageProps.games || pageProps.schedule;
                console.log('Found games:', games.length, 'games');
                return games.map(g => ({
                    ...g,
                    scheduled: g.date || g.scheduled,
                    home: typeof g.home === 'string' ? { name: g.home, alias: g.home } : g.home,
                    away: typeof g.away === 'string' ? { name: g.away, alias: g.away } : g.away,
                    venue: g.venue || { name: 'Mediapro Sports Center, Miami' }
                }));
            }
            console.warn('No games or schedule found in pageProps');
        } catch (e) {
            console.log('Could not parse Next.js schedule data:', e.message);
        }
    } else {
        console.warn('No __NEXT_DATA__ script found in schedule HTML');
    }

    return null; // Will use fallback
}

// Fetch live data or use fallback
async function fetchLiveData() {
    try {
        const [standingsHtml, scheduleHtml] = await Promise.all([
            fetchHTML('/standings'),
            fetchHTML('/schedule')
        ]);

        const parsedStandings = parseStandings(standingsHtml);
        const parsedSchedule = parseSchedule(scheduleHtml);

        // Track if we had to use fallback for either data type
        const standingsFromFallback = !parsedStandings;
        const scheduleFromFallback = !parsedSchedule;
        const usingFallback = standingsFromFallback || scheduleFromFallback;

        if (usingFallback) {
            console.warn('Live fetch succeeded but parsing failed - using fallback data');
        }

        return {
            standings: parsedStandings || FALLBACK_STANDINGS,
            schedule: parsedSchedule || FALLBACK_SCHEDULE,
            usingFallback
        };
    } catch (error) {
        console.log('Using fallback data:', error.message);
        return {
            standings: FALLBACK_STANDINGS,
            schedule: FALLBACK_SCHEDULE,
            usingFallback: true
        };
    }
}

// Get team data (local, no API needed)
function getTeamData(teamSlug) {
    const teamInfo = TEAM_DATA[teamSlug];
    if (!teamInfo) return null;

    // Get team's record from current standings
    const teamStanding = state.standings?.find(t =>
        t.name.toLowerCase() === teamInfo.name.toLowerCase()
    ) || { wins: 0, losses: 0, pct: 0 };

    // Get team's games from schedule
    const teamGames = (state.schedule?.games || []).filter(g =>
        g.home?.name?.toLowerCase() === teamInfo.name.toLowerCase() ||
        g.away?.name?.toLowerCase() === teamInfo.name.toLowerCase()
    );

    // Build roster with images
    const roster = teamInfo.roster.map(player => ({
        name: player.name,
        image: getPlayerImage(player.slug, teamInfo.slug)
    }));

    return {
        name: teamInfo.name,
        slug: teamInfo.slug,
        color: teamInfo.color,
        logo: getTeamLogo(teamInfo.slug),
        coach: teamInfo.coach,
        record: {
            wins: teamStanding.wins,
            losses: teamStanding.losses,
            pct: teamStanding.pct
        },
        roster: roster,
        schedule: teamGames
    };
}

// Data Loading
async function loadAllData(forceRefresh = false) {
    const now = Date.now();

    // Check if we need to refresh
    if (forceRefresh || !state.schedule || now - state.lastFetch.schedule > CONFIG.CACHE_DURATION) {
        elements.standingsList.innerHTML = '<div class="loading">Loading standings...</div>';
        elements.scheduleList.innerHTML = '<div class="loading">Loading schedule...</div>';
        elements.scoresList.innerHTML = '<div class="loading">Loading scores...</div>';

        try {
            const data = await fetchLiveData();

            state.standings = data.standings;
            state.schedule = { games: data.schedule };
            state.lastFetch.standings = now;
            state.lastFetch.schedule = now;
            state.lastFetch.scores = now;
            state.usingFallback = data.usingFallback || false;
            if (!data.usingFallback) {
                state.lastSuccessfulFetch = new Date();
            }

            renderStandings({ standings: data.standings });
            renderSchedule({ games: data.schedule });
            renderScores({ games: data.schedule });
        } catch (error) {
            console.error('Data load error:', error);
            // Use fallback data
            state.standings = FALLBACK_STANDINGS;
            state.schedule = { games: FALLBACK_SCHEDULE };
            state.usingFallback = true;

            renderStandings({ standings: FALLBACK_STANDINGS });
            renderSchedule({ games: FALLBACK_SCHEDULE });
            renderScores({ games: FALLBACK_SCHEDULE });
        }
    } else {
        renderStandings({ standings: state.standings });
        renderSchedule(state.schedule);
        renderScores(state.schedule);
    }

    updateLastUpdated();
}

// Scores are loaded from schedule data - no separate API call needed

// Rendering Functions
function renderStandings(data) {
    if (!data || !data.standings || data.standings.length === 0) {
        renderDemoStandings();
        return;
    }

    // Data comes directly as array of teams from our server
    const teams = data.standings.map(t => ({
        name: t.name || t.team?.name || 'Unknown',
        market: t.market || '',
        wins: t.wins || 0,
        losses: t.losses || 0,
        pct: t.pct || t.win_pct || (t.wins / (t.wins + t.losses) || 0)
    }));

    // Sort by win percentage, then by wins
    teams.sort((a, b) => {
        if (b.pct !== a.pct) return b.pct - a.pct;
        return b.wins - a.wins;
    });

    let html = `
        <div class="standings-header">
            <span>#</span>
            <span>Team</span>
            <span>W</span>
            <span>L</span>
            <span>PCT</span>
        </div>
    `;

    teams.forEach((team, index) => {
        const rank = index + 1;
        const teamSlug = getTeamSlug(team.name);
        html += `
            <div class="team-card clickable" data-team="${teamSlug}" onclick="showTeamDetail('${teamSlug}')">
                <span class="team-rank ${rank <= 3 ? 'top-3' : ''}">${rank}</span>
                <div class="team-info">
                    <span class="team-name">${team.name}</span>
                    <span class="team-city">${team.market || ''}</span>
                </div>
                <span class="team-wins">${team.wins}</span>
                <span class="team-losses">${team.losses}</span>
                <span class="team-pct">${team.pct.toFixed(3).replace(/^0/, '')}</span>
            </div>
        `;
    });

    elements.standingsList.innerHTML = html;
}

// Convert team name to URL slug
function getTeamSlug(teamName) {
    return teamName.toLowerCase().replace(/\s+/g, '-');
}

function extractTeamsFromStandings(standings) {
    const teams = [];

    // Handle different possible standings structures
    if (Array.isArray(standings)) {
        standings.forEach(item => {
            if (item.teams) {
                item.teams.forEach(team => teams.push(normalizeTeam(team)));
            } else if (item.team) {
                teams.push(normalizeTeam(item));
            }
        });
    } else if (standings.teams) {
        standings.teams.forEach(team => teams.push(normalizeTeam(team)));
    } else if (standings.conference) {
        standings.conference.forEach(conf => {
            if (conf.teams) {
                conf.teams.forEach(team => teams.push(normalizeTeam(team)));
            }
        });
    }

    return teams;
}

function normalizeTeam(data) {
    const team = data.team || data;
    return {
        id: team.id,
        name: team.name || team.nickname || 'Unknown',
        market: team.market || team.city || '',
        wins: data.wins || data.win || 0,
        losses: data.losses || data.loss || 0,
        pct: data.win_pct || data.pct || (data.wins / (data.wins + data.losses) || 0)
    };
}

// Compute standings from completed games in the schedule
function computeStandingsFromSchedule(games) {
    const teamStats = {};

    games.forEach(game => {
        if (game.status === 'closed' && game.home_points !== undefined && game.away_points !== undefined) {
            const homeId = game.home?.id || game.home?.name;
            const awayId = game.away?.id || game.away?.name;

            // Initialize teams if not seen
            if (!teamStats[homeId]) {
                teamStats[homeId] = {
                    team: game.home,
                    wins: 0,
                    losses: 0
                };
            }
            if (!teamStats[awayId]) {
                teamStats[awayId] = {
                    team: game.away,
                    wins: 0,
                    losses: 0
                };
            }

            // Determine winner
            if (game.home_points > game.away_points) {
                teamStats[homeId].wins++;
                teamStats[awayId].losses++;
            } else {
                teamStats[awayId].wins++;
                teamStats[homeId].losses++;
            }
        }
    });

    // Convert to array and calculate percentages
    return Object.values(teamStats).map(t => ({
        team: t.team,
        wins: t.wins,
        losses: t.losses,
        win_pct: t.wins + t.losses > 0 ? t.wins / (t.wins + t.losses) : 0
    }));
}

function renderDemoStandings() {
    // Demo data for preview when API not connected
    const demoTeams = [
        { name: 'Phantom BC', market: '', wins: 5, losses: 1, pct: 0.833 },
        { name: 'Lunar Owls BC', market: '', wins: 4, losses: 2, pct: 0.667 },
        { name: 'Vinyl BC', market: '', wins: 4, losses: 2, pct: 0.667 },
        { name: 'Laces BC', market: '', wins: 3, losses: 3, pct: 0.500 },
        { name: 'Mist BC', market: '', wins: 2, losses: 4, pct: 0.333 },
        { name: 'Rose BC', market: '', wins: 0, losses: 6, pct: 0.000 }
    ];

    let html = `
        <div class="standings-header">
            <span>#</span>
            <span>Team</span>
            <span>W</span>
            <span>L</span>
            <span>PCT</span>
        </div>
    `;

    demoTeams.forEach((team, index) => {
        const rank = index + 1;
        html += `
            <div class="team-card">
                <span class="team-rank ${rank <= 3 ? 'top-3' : ''}">${rank}</span>
                <div class="team-info">
                    <span class="team-name">${team.name}</span>
                    <span class="team-city">${team.market}</span>
                </div>
                <span class="team-wins">${team.wins}</span>
                <span class="team-losses">${team.losses}</span>
                <span class="team-pct">${team.pct.toFixed(3).replace(/^0/, '')}</span>
            </div>
        `;
    });

    html += '<p class="refresh-indicator">Pull down to refresh • Demo data shown</p>';
    elements.standingsList.innerHTML = html;
}

function renderSchedule(data) {
    const now = new Date();
    let games = [];

    if (data && data.games) {
        games = data.games.filter(game => {
            const gameDate = new Date(game.scheduled);
            return gameDate >= now && game.status !== 'closed';
        }).slice(0, 10); // Show next 10 upcoming games
    }

    if (games.length === 0) {
        renderDemoSchedule();
        return;
    }

    let html = '';
    let currentDate = '';

    games.forEach(game => {
        const gameDate = new Date(game.scheduled);
        const dateStr = formatDate(gameDate);

        if (dateStr !== currentDate) {
            currentDate = dateStr;
            html += `<div class="date-separator">${dateStr}</div>`;
        }

        html += renderGameCard(game, 'upcoming');
    });

    elements.scheduleList.innerHTML = html;
}

function renderDemoSchedule() {
    const now = new Date();
    const demoGames = [];

    // Generate demo upcoming games
    for (let i = 1; i <= 5; i++) {
        const gameDate = new Date(now);
        gameDate.setDate(gameDate.getDate() + i);
        gameDate.setHours(19, 0, 0, 0);

        const teams = [
            ['Phantom BC', 'Lunar Owls BC'],
            ['Vinyl BC', 'Laces BC'],
            ['Mist BC', 'Rose BC'],
            ['Phantom BC', 'Vinyl BC'],
            ['Lunar Owls BC', 'Mist BC']
        ];

        demoGames.push({
            scheduled: gameDate.toISOString(),
            home: { name: teams[i-1][0], alias: teams[i-1][0].split(' ')[0] },
            away: { name: teams[i-1][1], alias: teams[i-1][1].split(' ')[0] },
            venue: { name: 'Mediapro Sports Center' },
            status: 'scheduled'
        });
    }

    let html = '';
    let currentDate = '';

    demoGames.forEach(game => {
        const gameDate = new Date(game.scheduled);
        const dateStr = formatDate(gameDate);

        if (dateStr !== currentDate) {
            currentDate = dateStr;
            html += `<div class="date-separator">${dateStr}</div>`;
        }

        html += renderGameCard(game, 'upcoming');
    });

    html += '<p class="refresh-indicator">Pull down to refresh • Demo data shown</p>';
    elements.scheduleList.innerHTML = html;
}

function renderScores(data) {
    const now = new Date();
    const fourteenDaysAgo = new Date(now);
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - CONFIG.SCORES_DAYS);

    let games = [];

    if (data && data.games) {
        games = data.games.filter(game => {
            const gameDate = new Date(game.scheduled);
            return gameDate >= fourteenDaysAgo && gameDate <= now && game.status === 'closed';
        }).sort((a, b) => new Date(b.scheduled) - new Date(a.scheduled));
    }

    if (games.length === 0) {
        renderDemoScores();
        return;
    }

    let html = '';
    let currentDate = '';

    games.forEach(game => {
        const gameDate = new Date(game.scheduled);
        const dateStr = formatDate(gameDate);

        if (dateStr !== currentDate) {
            currentDate = dateStr;
            html += `<div class="date-separator">${dateStr}</div>`;
        }

        html += renderGameCard(game, 'final');
    });

    elements.scoresList.innerHTML = html;
}

function renderDemoScores() {
    const now = new Date();
    const demoGames = [];

    // Generate demo completed games
    for (let i = 1; i <= 7; i++) {
        const gameDate = new Date(now);
        gameDate.setDate(gameDate.getDate() - i);
        gameDate.setHours(19, 0, 0, 0);

        const matchups = [
            { home: 'Phantom BC', away: 'Rose BC', homeScore: 87, awayScore: 72 },
            { home: 'Lunar Owls BC', away: 'Laces BC', homeScore: 91, awayScore: 88 },
            { home: 'Vinyl BC', away: 'Mist BC', homeScore: 79, awayScore: 81 },
            { home: 'Phantom BC', away: 'Lunar Owls BC', homeScore: 95, awayScore: 92 },
            { home: 'Laces BC', away: 'Rose BC', homeScore: 84, awayScore: 76 },
            { home: 'Vinyl BC', away: 'Phantom BC', homeScore: 78, awayScore: 85 },
            { home: 'Mist BC', away: 'Laces BC', homeScore: 82, awayScore: 79 }
        ];

        const matchup = matchups[i-1];

        demoGames.push({
            scheduled: gameDate.toISOString(),
            home: { name: matchup.home, alias: matchup.home.split(' ')[0] },
            away: { name: matchup.away, alias: matchup.away.split(' ')[0] },
            home_points: matchup.homeScore,
            away_points: matchup.awayScore,
            venue: { name: 'Mediapro Sports Center' },
            status: 'closed'
        });
    }

    let html = '';
    let currentDate = '';

    demoGames.forEach(game => {
        const gameDate = new Date(game.scheduled);
        const dateStr = formatDate(gameDate);

        if (dateStr !== currentDate) {
            currentDate = dateStr;
            html += `<div class="date-separator">${dateStr}</div>`;
        }

        html += renderGameCard(game, 'final');
    });

    html += '<p class="refresh-indicator">Pull down to refresh • Demo data shown</p>';
    elements.scoresList.innerHTML = html;
}

function renderGameCard(game, type) {
    const gameDate = new Date(game.scheduled);
    const homeName = game.home?.name || game.home?.alias || 'Home';
    const awayName = game.away?.name || game.away?.alias || 'Away';
    const venue = game.venue?.name || '';

    if (type === 'final') {
        const homeScore = game.home_points || 0;
        const awayScore = game.away_points || 0;
        const homeWon = homeScore > awayScore;

        return `
            <div class="game-card">
                <div class="game-date">
                    <span class="game-status final">Final</span>
                </div>
                <div class="game-matchup">
                    <div class="game-team">
                        <span class="game-team-name">${awayName}</span>
                        <span class="game-score ${!homeWon ? 'winner' : 'loser'}">${awayScore}</span>
                    </div>
                    <div class="game-vs">@</div>
                    <div class="game-team">
                        <span class="game-team-name">${homeName}</span>
                        <span class="game-score ${homeWon ? 'winner' : 'loser'}">${homeScore}</span>
                    </div>
                </div>
                ${venue ? `<div class="game-venue">📍 ${venue}</div>` : ''}
            </div>
        `;
    } else {
        const timeStr = formatTime(gameDate);

        return `
            <div class="game-card">
                <div class="game-date">
                    <span class="game-status upcoming">${timeStr}</span>
                </div>
                <div class="game-matchup">
                    <div class="game-team">
                        <span class="game-team-name">${awayName}</span>
                    </div>
                    <div class="game-vs">
                        <span class="game-time">vs</span>
                    </div>
                    <div class="game-team">
                        <span class="game-team-name">${homeName}</span>
                    </div>
                </div>
                ${venue ? `<div class="game-venue">📍 ${venue}</div>` : ''}
            </div>
        `;
    }
}

// Utility Functions
function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}

function updateLastUpdated() {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };

    if (state.usingFallback) {
        elements.lastUpdated.textContent = 'Using offline data (live fetch failed)';
        elements.lastUpdated.style.color = '#ff6b6b';
    } else if (state.lastSuccessfulFetch) {
        const timeStr = state.lastSuccessfulFetch.toLocaleTimeString('en-US', options);
        elements.lastUpdated.textContent = timeStr;
        elements.lastUpdated.style.color = '';
    } else {
        const now = new Date();
        elements.lastUpdated.textContent = now.toLocaleTimeString('en-US', options);
        elements.lastUpdated.style.color = '';
    }

    // Update data status banner
    updateDataStatusBanner();
}

function updateDataStatusBanner() {
    if (!elements.dataStatusBanner) {
        console.warn('Data status banner element not found');
        return;
    }

    console.log('Updating banner, usingFallback:', state.usingFallback);

    if (state.usingFallback) {
        elements.dataStatusBanner.style.display = 'flex';
        elements.dataStatusBanner.querySelector('.status-text').textContent =
            'Unable to fetch live data. Standings and scores may be outdated.';
    } else {
        elements.dataStatusBanner.style.display = 'none';
    }
}

// ==================== //
// Team Detail Functions //
// ==================== //

// Show team detail page
async function showTeamDetail(teamSlug) {
    // Show loading state
    elements.teamHeader.innerHTML = '<div class="loading">Loading team...</div>';
    elements.teamRoster.innerHTML = '';
    elements.teamSchedule.innerHTML = '';

    // Hide all sections and show team detail
    elements.sections.forEach(section => section.classList.remove('active'));
    elements.teamDetailSection.classList.add('active');
    document.body.classList.add('team-detail-active');

    // Deactivate nav buttons
    elements.navBtns.forEach(btn => btn.classList.remove('active'));

    // Scroll to top
    window.scrollTo(0, 0);

    // Get team data locally (no API call needed)
    const teamData = getTeamData(teamSlug);

    if (teamData) {
        state.currentTeam = teamData;
        renderTeamDetail(teamData);
    } else {
        elements.teamHeader.innerHTML = `
            <div class="error">
                <div class="error-icon">⚠️</div>
                <p>Team not found</p>
            </div>
        `;
    }
}

// Hide team detail and go back
function hideTeamDetail() {
    document.body.classList.remove('team-detail-active');
    elements.teamDetailSection.classList.remove('active');
    state.currentTeam = null;

    // Show standings section by default
    switchSection('standings');
}

// Render team detail page
function renderTeamDetail(team) {
    // Render header
    const pctDisplay = team.record.pct ? team.record.pct.toFixed(3).replace(/^0/, '') : '.000';

    elements.teamHeader.innerHTML = `
        <div class="team-header-inner">
            <img src="${team.logo}" alt="${team.name}" class="team-logo" onerror="this.style.display='none'">
            <div class="team-header-info">
                <h1 class="team-header-name" style="color: ${team.color}">${team.name}</h1>
                <div class="team-header-record">
                    <div class="record-item">
                        <div class="record-value wins">${team.record.wins}</div>
                        <div class="record-label">Wins</div>
                    </div>
                    <div class="record-item">
                        <div class="record-value losses">${team.record.losses}</div>
                        <div class="record-label">Losses</div>
                    </div>
                    <div class="record-item">
                        <div class="record-value">${pctDisplay}</div>
                        <div class="record-label">PCT</div>
                    </div>
                </div>
            </div>
            ${team.coach ? `
                <div class="coach-info">
                    <img src="${team.coach.image}" alt="${team.coach.name}" class="coach-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23333%22 width=%22100%22 height=%22100%22/></svg>'">
                    <div class="coach-details">
                        <div class="coach-title">Head Coach</div>
                        <div class="coach-name">${team.coach.name}</div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    // Render roster
    renderTeamRoster(team.roster);

    // Render schedule
    renderTeamSchedule(team.schedule, team.name);
}

// Render team roster
function renderTeamRoster(roster) {
    if (!roster || roster.length === 0) {
        elements.teamRoster.innerHTML = '<p class="empty-state">No roster available</p>';
        return;
    }

    let html = '';
    roster.forEach(player => {
        html += `
            <div class="player-card">
                <img src="${player.image}" alt="${player.name}" class="player-image"
                     onerror="this.classList.add('error'); this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2260%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2240%22>👤</text></svg>'">
                <div class="player-name">${player.name}</div>
            </div>
        `;
    });

    elements.teamRoster.innerHTML = html;
}

// Render team schedule
function renderTeamSchedule(games, teamName) {
    if (!games || games.length === 0) {
        elements.teamSchedule.innerHTML = '<p class="empty-state">No games scheduled</p>';
        return;
    }

    // Sort games by date
    const sortedGames = [...games].sort((a, b) => new Date(a.scheduled) - new Date(b.scheduled));

    let html = '';
    sortedGames.forEach(game => {
        const gameDate = new Date(game.scheduled);
        const isHome = game.home.name.toLowerCase() === teamName.toLowerCase();
        const opponent = isHome ? game.away.name : game.home.name;
        const location = isHome ? 'vs' : '@';

        if (game.status === 'closed') {
            // Completed game
            const teamScore = isHome ? game.home_points : game.away_points;
            const oppScore = isHome ? game.away_points : game.home_points;
            const won = teamScore > oppScore;

            html += `
                <div class="team-game-card">
                    <div class="team-game-date">${formatDate(gameDate)}</div>
                    <div class="team-game-matchup">
                        <div class="team-game-opponent">${location} ${opponent}</div>
                        <div class="team-game-result">
                            <div class="team-game-score ${won ? 'win' : 'loss'}">${teamScore} - ${oppScore}</div>
                            <div class="team-game-outcome">${won ? 'W' : 'L'}</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Upcoming game
            html += `
                <div class="team-game-card">
                    <div class="team-game-date">${formatDate(gameDate)}</div>
                    <div class="team-game-matchup">
                        <div class="team-game-opponent">${location} ${opponent}</div>
                        <div class="team-game-result">
                            <div class="team-game-time">${formatTime(gameDate)}</div>
                            ${game.broadcast ? `<div class="team-game-broadcast">${game.broadcast}</div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }
    });

    elements.teamSchedule.innerHTML = html;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
