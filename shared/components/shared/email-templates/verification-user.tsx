import React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        backgroundColor: '#edf2f7',
        height: '100%',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          margin: '0 auto',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
           <img src="data:image/png;base64,UklGRuAFAABXRUJQVlA4WAoAAAAYAAAAjwEAxwAAQUxQSDkEAAARX6CobSM2VAjzeSMiAlM9decsKG3bZkiyIspjWwe7Xh3bNna2bdvW1mYs2xk/71z5xfc9X2TObjqi/xAlSbIS5Wi0b3c5D9iFLwhHjVrz35r/juHo4pdettbDp8eSi1oNulLwXKslU4ubxJ4MCk5+0NbrseT5dlN07m0yUN/vLnim1ZzXBfOtlmywWJK68Xjhz/e3tc8zTdNnKlubzNQef/dkyUT0fs6V+CVD0oTC5++5GkuU/HmE4PlurkeDyfshSF4rrnOaepyUOSkykBxJ64TlXI97QHnGgPPb3E23M+Bc7agUEUCeEwTv5I7KM4Q900BcRXfWAYQ95+RVW2c9jkDzl+5KCCDF+92VBwRzRnmHssPGBGvuL/S4TullS620TQn2VD7z3cummsBeD+VS/fLWEcAM84KzgrFoTLvXE8AMy9IWuXqapUMAM6wKS7WfgLlV2l/tJ2CeJKwHe4olv4+luR5hv7unWHKfesnGnmJKre9DTyGy2PbP+4ol1V7vK/rcE/pWOaVu9e0ddU4NHU59hctwU999kC21299xlyyQlPl40DhO3E3qpfGCMicqW4WF2yUr5PhNmdrOcHdrHIfOCEBqGvZ6rJRpVTAhAKloas6vndgVv7QNCcJ77Rm+ydb67JYdnqy/vAEJyHBTBuqqWJeTpHlMiDHp+b/XY1X+EHrj43bT1pC5eAB+d+f6GBXhh10er8dJK4L1Lq41bkaQ2l+Lm6VrHqOY2YtFRho4UJ3f8o/clUhRp67PTF3roLH/i5Conc9l6DKqzn4XKdYQc9UZcchYgp6OlXk9cMg4qYGOIFVmPwiNexnn1iVFEBrhWeZuXeYCyBB+pwGOapIGJDjCcR82wBM44/Oc4y77v/6Qw1xbT7lMVR810hMVeTxipJ02+SfkVBcJTX+8HmkYcOFX+V/aq94VXliNtDuA3EN5CDZHmuVKqit+Fd5IM5z8jFLG0Ie4yp3UIN0yDCxlXGsCTdh5jHs+Lsz5PHx5DIFVHGciB4OhCVRUu37LpaNwOI9ARqrrSdrh+n4HlcWCq/Ct/PyAp47HO0R7dvXtPH1MOqO0mhX7jTNExx5ut1PsN66yWPZ4m2GYu49WWbhst0rdLoxbYB6BzMxPaNpvmIM5BHPAZ+wmvCvHiOUQ0AEfmOEtrKriHmncQzN8A8ojiCMMr6Nsk/CfR5ItXpedcqq1HliR5gVcHVfYvSMZYypqMljrcaZvAFnDy9jX1lWxB+eArLHXR4q+wjOFt3Cs8X108XjA2b6BY459Ltaz7GcI7MEA4SG6C78XhtYUMBryvhv10JpijxR5EwfWbxhAgNjfBmYNtq7IQ2sIErSJE+PuHQMJ2DnBg/0bGEygPo+1uEju5j4EE6TPh8GbclozRQIYDXV1ZRpaE6DAPDYM/tTTmiMAFYj/HtkZgt5Ro9b8t+a/Yz4KAFZQOCC+AAAAsBQAnQEqkAHIAD7RaLFTKCYkoqAoAQAaCWlu4XdhG0AJ7APfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+1YAAP7/xgYAAAAAAAAAAAAAAEVYSUa6AAAARXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABJGQEA6AMAAEkZAQDoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAJABAAADoAQAAQAAAMgAAAAAAAAA" alt="Logo RIKSI" style={{ margin: '0 auto', width: 120 }} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'black', marginBottom: '16px' }}>
          Підтвердження вашої реєстрації на сайті RIKSI
        </h1>
        <p style={{ fontSize: '18px', color: 'black', marginBottom: '24px' }}>
          Ви отримали цей лист, тому що ми отримали запит на реєстрацію на нашому сайті. Для підтвердження
          реєстрації, будь ласка, використовуйте наступний код:
        </p>
        <div
          style={{
            color: 'black',
            fontSize: '24px',
            fontWeight: '700',
            padding: '16px 0',
            borderRadius: '8px',
          }}
        >
          {code}
        </div>
        <p style={{ fontSize: '14px', color: '#a0aec0', marginTop: '24px' }}>
          Якщо ви не робили цей запит, просто ігноруйте цей лист.
        </p>
      </div>
    </div>
  );
};
