import React from 'react'
import { CASE_STUDIES } from '../../data/caseStudies'
import foxplayBlack from '../../assets/Foxplay-black.webp'
import foxplayWhite from '../../assets/Foxplay-White.webp'

const STORIES = Object.values(CASE_STUDIES)

export default function BrandStories() {
    return (
        <section className="py-20 md:py-28 px-6 bg-t-bg overflow-hidden border-t-0" style={{ borderBottom: '1px solid var(--t-border)' }}>
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16 md:mb-20 text-center sm:text-left">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-t-primary mb-3">
                        Brand Stories
                    </h2>
                    <p className="text-t-secondary text-sm md:text-base max-w-2xl">
                        See how we've partnered with ambitious brands to transform their digital presence and drive scale.
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-10 md:gap-12 pb-8 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-t-border [&::-webkit-scrollbar-thumb]:rounded-full">
                    {STORIES.map((s, i) => (
                        <div key={i} className="flex-none w-[85vw] sm:w-[320px] lg:w-[300px] snap-center sm:snap-start flex flex-col items-center sm:items-start text-center sm:text-left">
                            {/* Logo */}
                            <div className="h-[140px] flex items-center justify-center sm:justify-start mb-6 w-full">
                                {s.slug === 'foxplay' ? (
                                    <>
                                        {/* Light Mode Logo */}
                                        <img
                                            src={foxplayWhite}
                                            width="3375"
                                            height="1294"
                                            loading="lazy"
                                            alt={s.brand}
                                            className="max-h-[60px] w-auto object-contain transition-all duration-300 dark:hidden"
                                        />
                                        {/* Dark Mode Logo */}
                                        <img
                                            src={foxplayBlack}
                                            width="3375"
                                            height="1368"
                                            loading="lazy"
                                            alt={s.brand}
                                            className="max-h-[60px] w-auto object-contain transition-all duration-300 hidden dark:block"
                                        />
                                    </>
                                ) : (
                                    <img
                                        src={s.heroImage}
                                        width={s.imgWidth}
                                        height={s.imgHeight}
                                        loading="lazy"
                                        alt={s.brand}
                                        className="max-h-[60px] w-auto object-contain transition-all duration-300"
                                    />
                                )}
                            </div>

                            {/* Headline */}
                            <h3 className="text-[17px] md:text-[19px] font-medium text-t-primary tracking-tight leading-snug mb-5">
                                {s.headline}
                            </h3>

                            {/* Description (Challenge mapped to the paragraph) */}
                            <p className="text-t-secondary text-[14px] md:text-[15px] leading-relaxed font-light">
                                {s.strategy || s.challenge}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
