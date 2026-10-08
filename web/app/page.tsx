/* eslint-disable @next/next/no-img-element */
import {getContent, imageUrl} from '@/lib/sanity'
import SiteHeader from '@/components/SiteHeader'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Reviews from '@/components/Reviews'
import Faq from '@/components/Faq'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'
import {ExternalLink, telHref} from '@/components/Icons'

// Re-fetch from Sanity at most once a minute, so Harry's edits go live within ~60s.
export const revalidate = 60

const FALLBACK_PHOTO = '/assets/images/harry.jpg'

export default async function Home() {
  const {home, settings} = await getContent()

  const photo = home.aboutPhoto?.asset ? imageUrl(home.aboutPhoto).width(1000).height(1250).fit('crop').url() : FALLBACK_PHOTO
  // Round avatar: use Harry's hotspot if set in Sanity, otherwise aim for the upper part (face)
  const avatar = home.aboutPhoto?.asset
    ? (home.aboutPhoto.hotspot
        ? imageUrl(home.aboutPhoto)
        : imageUrl(home.aboutPhoto).crop('focalpoint').focalPoint(0.5, 0.28)
      ).width(160).height(160).fit('crop').url()
    : FALLBACK_PHOTO
  const paragraphs = home.aboutBody.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const tel = telHref(settings.phone)
  const infoBar = home.infoBar.flatMap((item) => [item, '/'])

  return (
    <>
      <SiteHeader />
      <main>
        <Hero eyebrow={home.heroEyebrow} heading={home.heroHeading} intro={home.heroIntro} phone={settings.phone} avatar={avatar} />

        {/* Info bar */}
        <div className="infobar">
          <div className="marquee">
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee__group" aria-hidden={copy === 1 || undefined}>
                {infoBar.map((item, i) => (
                  <li key={i} aria-hidden={item === '/' || undefined}>
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Services */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-head" data-reveal>
              <div className="section-head__title">
                <p className="eyebrow">(01) Services</p>
                <h2 className="h2">{home.servicesHeading}</h2>
              </div>
              <p className="lede">{home.servicesIntro}</p>
            </div>
            <Services services={home.services} />
          </div>
        </section>

        {/* About */}
        <section className="section" id="about">
          <div className="container split about">
            <div className="split__a about__text" data-reveal>
              <div className="section-head__title">
                <p className="eyebrow">(02) About Harry</p>
                <h2 className="h2">{home.aboutHeading}</h2>
              </div>
              <div className="about__body">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {home.aboutStats.length > 0 && (
                <dl className="stats">
                  {home.aboutStats.map((s, i) => (
                    <div key={i}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div>
                <a className="pill" href="#contact">
                  Contact us today <ExternalLink />
                </a>
              </div>
            </div>
            <figure className="photo" data-reveal>
              <img src={photo} alt={home.aboutPhoto?.alt || 'Harry Betts on site'} width={500} height={750} loading="lazy" />
              {home.aboutCaption && <figcaption>{home.aboutCaption}</figcaption>}
            </figure>
          </div>
        </section>

        {/* Process */}
        <section className="section section--grey" id="process">
          <div className="container">
            <div className="section-head" data-reveal>
              <div className="section-head__title">
                <p className="eyebrow">(03) Process</p>
                <h2 className="h2">{home.processHeading}</h2>
              </div>
            </div>
            <div className="steps">
              {home.steps.map((s, i) => (
                <article key={i} className="step" data-reveal>
                  <p className="step__num" aria-hidden="true">
                    {i + 1}
                  </p>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section" id="reviews">
          <div className="container">
            <div className="section-head" data-reveal>
              <div className="section-head__title">
                <p className="eyebrow">(04) Reviews</p>
                <h2 className="h2">{home.reviewsHeading}</h2>
              </div>
              {home.reviewsRating && <p className="eyebrow">{home.reviewsRating}</p>}
            </div>
            <Reviews reviews={home.reviews} />
          </div>
        </section>

        {/* Service area */}
        <section className="section section--grey">
          <div className="container split">
            <div className="split__a section-head__title" data-reveal>
              <p className="eyebrow">(05) Service area</p>
              <h2 className="h2">{home.areasHeading}</h2>
              <p className="lede" style={{marginTop: 8}}>
                {home.areasIntro}
              </p>
            </div>
            <ul className="split__b areas" data-reveal>
              {home.areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container split">
            <div className="split__a faq-aside" data-reveal>
              <div className="section-head__title">
                <p className="eyebrow">(06) FAQ</p>
                <h2 className="h2">{home.faqHeading}</h2>
              </div>
              <div className="help-card">
                <div className="help-card__who">
                  <img src={avatar} alt="" width={48} height={48} />
                  <div>
                    <strong>{home.faqHelpTitle}</strong>
                    <span>Ask Harry directly.</span>
                  </div>
                </div>
                <p>{home.faqHelpText}</p>
                <a className="pill" href={tel}>
                  Call {settings.phone} <ExternalLink />
                </a>
              </div>
            </div>
            <Faq faqs={home.faqs} />
          </div>
        </section>

        {/* Contact */}
        <section className="section section--yellow" id="contact">
          <div className="container split">
            <div className="split__a contact__text" data-reveal>
              <div>
                <p className="eyebrow">(07) Contact</p>
                <h2 className="h2">{home.contactHeading}</h2>
                <p className="lede">{home.contactIntro}</p>
              </div>
              <dl className="details">
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={tel}>{settings.phone}</a>
                  </dd>
                </div>
                {settings.email && (
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${settings.email}`}>{settings.email}</a>
                    </dd>
                  </div>
                )}
                {settings.hours && (
                  <div>
                    <dt>Hours</dt>
                    <dd>{settings.hours}</dd>
                  </div>
                )}
                <div>
                  <dt>Area</dt>
                  <dd>{settings.area}</dd>
                </div>
              </dl>
            </div>
            <ContactForm services={home.services.map((s) => s.name)} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cols">
            <div>
              <h2>Tarlo</h2>
              <span>Harry Betts, licensed electrician</span>
              <span>Northern Beaches, Sydney</span>
            </div>
            <nav aria-label="Footer">
              <h2>Site</h2>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#reviews">Reviews</a>
              <a href="#contact">Contact</a>
            </nav>
            <div>
              <h2>Contact</h2>
              <a href={tel}>{settings.phone}</a>
              {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
              {settings.instagram && <a href={settings.instagram}>Instagram</a>}
            </div>
            <div>
              <h2>Details</h2>
              {settings.licence && <span>Licence No. {settings.licence}</span>}
              {settings.abn && <span>ABN {settings.abn}</span>}
              <span>Fully insured</span>
            </div>
          </div>
          <img className="footer-logo" src="/assets/tarlo-logo-white.svg" alt="" width={1819} height={325} loading="lazy" />
          <div className="footer-base">
            <span>© {new Date().getFullYear()} Tarlo Electrical Connections</span>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </footer>
      <Reveal />
    </>
  )
}
