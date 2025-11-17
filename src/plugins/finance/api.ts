import { FinanceConfig, FinanceSummaryResponse, FinanceData, FinanceSummaryItem } from './types';

const REQUEST_TIMEOUT = 30000;

function generateTraceId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function calculateDateRange(period: string): { start: string; end: string } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let start: Date;
  let end: Date = new Date(today);

  switch (period) {
    case 'this-month': {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case 'this-year': {
      start = new Date(now.getFullYear(), 0, 1);
      break;
    }
    case 'last-month': {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      start = new Date(lastMonth);
      end = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of last month
      break;
    }
    case 'last-year': {
      start = new Date(now.getFullYear() - 1, 0, 1);
      end = new Date(now.getFullYear() - 1, 11, 31);
      break;
    }
    default: {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    }
  }

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
}

function parseFinanceData(response: FinanceSummaryResponse, currency: string): FinanceData {
  // Helper to check if a string matches any of the search terms
  const matches = (text: string | undefined, terms: string[]): boolean => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return terms.some(term => lower.includes(term));
  };
  
  // Find net worth by looking for key "net-worth-in-{currency}" first, then fallback to other patterns
  let netWorth: FinanceSummaryItem | null = null;
  const netWorthKey = `net-worth-in-${currency}`;
  if (response[netWorthKey]) {
    netWorth = response[netWorthKey];
  } else {
    // Fallback: search in all items
    const items = Object.values(response);
    netWorth = items.find(
      (item) =>
        matches(item.key, ['net-worth', 'net_worth', 'networth']) ||
        matches(item.title, ['net worth'])
    ) || null;
  }

  // Find spent amount (look for keys/titles containing "spent", "expense", "outgoing", "expenditure", "outflow")
  const items = Object.values(response);
  const spent = items.find(
    (item) =>
      matches(item.key, ['spent', 'expense', 'expenditure', 'outgoing', 'outflow', 'debit']) ||
      matches(item.title, ['spent', 'expense', 'expenditure', 'outgoing', 'outflow'])
  ) || null;

  // Find earned amount (look for keys/titles containing "earned", "income", "incoming", "revenue", "inflow")
  const earned = items.find(
    (item) =>
      matches(item.key, ['earned', 'income', 'revenue', 'incoming', 'inflow', 'credit']) ||
      matches(item.title, ['earned', 'income', 'revenue', 'incoming', 'inflow'])
  ) || null;

  // Safely convert monetary_value to number, defaulting to 0 if invalid
  const getNumericValue = (item: { monetary_value?: number } | null): number => {
    if (!item || item.monetary_value === undefined || item.monetary_value === null) {
      return 0;
    }
    const num = Number(item.monetary_value);
    return Number.isNaN(num) ? 0 : num;
  };

  const spentValue = getNumericValue(spent);
  const earnedValue = getNumericValue(earned);
  const total = spentValue + earnedValue;

  return {
    netWorth,
    spent,
    earned,
    total,
  };
}

export async function fetchFinanceSummary(config: FinanceConfig): Promise<FinanceData> {
  if (!config.apiEndpoint || !config.apiToken) {
    throw new Error('API endpoint and token are required.');
  }

  const { start, end } = calculateDateRange(config.period);
  const traceId = generateTraceId();
  
  const url = new URL(`${config.apiEndpoint}/v1/summary/basic`);
  url.searchParams.set('start', start);
  url.searchParams.set('end', end);
  url.searchParams.set('currency_code', config.currency);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        'X-Trace-Id': traceId,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as FinanceSummaryResponse;
    return parseFinanceData(data, config.currency);
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Failed to fetch finance summary.');
  }
}

