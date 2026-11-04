/* ============================================================
   Filter SVG untuk efek "liquid glass".

   Dirender sekali di root (App) lalu dipakai lewat CSS:
     filter: url(#liquid-warp)     → blob latar belakang
     filter: url(#liquid-caustic)  → lapisan cahaya (caustics)
     filter: url(#liquid-ripple)   → gambar di dalam thumbnail

   Catatan performa: sengaja TANPA animasi SMIL, jadi hasil filter
   dihitung sekali lalu di-cache browser. Gerakan "cair" datang dari
   animasi CSS (drift blob, breathe caustics, sheen kaca) yang cukup
   memakai transform terkomposit.
   ============================================================ */

export function LiquidFilters() {
  return (
    <svg
      className="liquid-filters"
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
    >
      <defs>
        {/* Gelombang besar → latar belakang terlihat seperti kaca cair */}
        <filter
          id="liquid-warp"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0075 0.011"
            numOctaves={2}
            seed={11}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="7" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale={72}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Riak lebih rapat → lapisan cahaya di atas blob */}
        <filter
          id="liquid-caustic"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.016"
            numOctaves={2}
            seed={5}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="4" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale={44}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Distorsi halus → lapisan refraksi pada gambar proyek */}
        <filter
          id="liquid-ripple"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.026"
            numOctaves={1}
            seed={3}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.4" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale={16}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
