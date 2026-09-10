// Линейные иконки навигации. Наследуют цвет текста (currentColor),
// поэтому меняются обычным CSS: color: #8A8F98.

const SHAPES = {
  'nav-employees': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9.5" cy="8" r="3.3"/><path d="M3.8 19.6a5.7 5.7 0 0 1 11.4 0"/><path d="M16.3 8.6a2.9 2.9 0 0 1 0 5.3"/><path d="M17.6 19.6a5.4 5.4 0 0 0-2.1-4"/></g></>
  ),
  'nav-sales': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 20.2h17"/><path d="M4.5 15.6l4.8-4.8 3.4 3.4 6-6.4"/><path d="M14.4 7.8h4.3v4.3"/></g></>
  ),
  'nav-management': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20.2V13"/><path d="M5 9.2V3.8"/><path d="M12 20.2v-8.4"/><path d="M12 8V3.8"/><path d="M19 20.2v-4"/><path d="M19 12.4V3.8"/><circle cx="5" cy="11.1" r="1.9"/><circle cx="12" cy="9.9" r="1.9"/><circle cx="19" cy="14.3" r="1.9"/></g></>
  ),
  'nav-cloud': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7.6 18.4h9a4.2 4.2 0 0 0 .4-8.4 5.7 5.7 0 0 0-10.9 1.2 3.8 3.8 0 0 0 1.5 7.2z"/></g></>
  ),
  'nav-security': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.2l7.6 2.9v6.2c0 4.7-3.2 8-7.6 9.4-4.4-1.4-7.6-4.7-7.6-9.4V6.1L12 3.2z"/><path d="M9.2 12.3l2 2 3.6-3.8"/></g></>
  ),
  'nav-automation': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6.6" y="6.6" width="10.8" height="10.8" rx="2.6"/><path d="M10 3.2v3.4M14 3.2v3.4M10 17.4v3.4M14 17.4v3.4"/><path d="M3.2 10h3.4M3.2 14h3.4M17.4 10h3.4M17.4 14h3.4"/></g></>
  ),
  'nav-ai': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.4 3.6l1.7 4.3 4.3 1.7-4.3 1.7-1.7 4.3-1.7-4.3L4.4 9.6l4.3-1.7 1.7-4.3z"/><path d="M17.6 14.2l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3z"/></g></>
  ),
  'nav-internet': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2"/><ellipse cx="12" cy="12" rx="4.1" ry="8.6"/></g></>
  ),
  'nav-packages': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.2l8.4 4.3L12 11.8 3.6 7.5 12 3.2z"/><path d="M3.6 12.2L12 16.5l8.4-4.3"/><path d="M3.6 16.6L12 20.9l8.4-4.3"/></g></>
  ),
  'nav-popular': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.8c3.8 0 6.4-2.5 6.4-5.9 0-4.4-4.4-6-4.4-9.7-2 1-3.2 2.9-3.2 4.7 0 1.5-.9 2.4-1.9 2.4s-1.8-.8-1.8-2.3C5.8 11.6 5 13.5 5 15c0 3.4 2.9 5.8 7 5.8z"/></g></>
  ),
  'nav-new': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11.9 3.6H20v8.1a2 2 0 0 1-.6 1.4l-6.4 6.4a2 2 0 0 1-2.8 0l-5.1-5.1a2 2 0 0 1 0-2.8l6.4-6.4a2 2 0 0 1 1.4-.6z"/><circle cx="15.9" cy="8" r="1.5"/></g></>
  ),
  'nav-favorites': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.1l-1.2-1.1C6.3 14.9 3.7 12.5 3.7 9.6c0-2.4 1.9-4.3 4.3-4.3 1.4 0 2.7.6 3.5 1.7l.5.6.5-.6a4.4 4.4 0 0 1 3.5-1.7c2.4 0 4.3 1.9 4.3 4.3 0 2.9-2.6 5.3-7.1 9.4L12 20.1z"/></g></>
  ),
  'nav-subscriptions': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.3 12a8.3 8.3 0 1 1-2.4-5.9"/><path d="M20.3 3.8v5h-5"/></g></>
  ),
  'nav-orders': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4.6" y="4.4" width="14.8" height="15.8" rx="3.2"/><path d="M8.4 9.4h7.2M8.4 12.8h7.2M8.4 16.2h4.2"/></g></>
  ),
  'nav-support': (
    <><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 14.4v-2.2a7 7 0 0 1 14 0v2.2"/><rect x="2.9" y="13.2" width="4.2" height="6.2" rx="2.1"/><rect x="16.9" y="13.2" width="4.2" height="6.2" rx="2.1"/><path d="M19 19.4v.4a3 3 0 0 1-3 3h-2.6"/></g></>
  ),
};

export default function NavIcon({ name, size = 20, className, style }) {
  const shape = SHAPES[name];
  if (!shape) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', flex: 'none', ...style }}
    >
      {shape}
    </svg>
  );
}

export const navIconNames = Object.keys(SHAPES);
