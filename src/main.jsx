import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, BedDouble, Check, ChevronDown, Clock3,
  Coffee, Heart, House, MapPin, Menu, MessageCircle, ShieldCheck,
  SlidersHorizontal, Sparkles, Star, Users, Wifi, X, Zap, Phone,
  CarFront, WashingMachine, Utensils, AirVent
} from "lucide-react";
import "./styles.css";

const WHATSAPP_NUMBER = "919876543210"; // Replace with your WhatsApp number, including country code
const CONTACT_PHONE = "+91 98765 43210"; // Replace with your business phone number

const properties = [
  {
    id: 1, name: "The Green House", location: "Sector 62, Noida", area: "Sector 62",
    rent: 8500, rating: "4.8", reviews: 124, type: "Unisex", sharing: "Double sharing",
    tag: "Most popular", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
    amenities: ["Wi-Fi", "Meals", "AC", "Laundry"], available: "3 beds available"
  },
  {
    id: 2, name: "Urban Nest", location: "Sector 18, Noida", area: "Sector 18",
    rent: 11500, rating: "4.9", reviews: 89, type: "Women", sharing: "Single sharing",
    tag: "Premium", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    amenities: ["Wi-Fi", "AC", "Security", "Meals"], available: "2 rooms available"
  },
  {
    id: 3, name: "The WorkLife PG", location: "Sector 15, Noida", area: "Sector 15",
    rent: 7200, rating: "4.7", reviews: 76, type: "Men", sharing: "Triple sharing",
    tag: "Great value", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=85",
    amenities: ["Wi-Fi", "Meals", "Laundry", "Security"], available: "5 beds available"
  },
  {
    id: 4, name: "Olive Co-Living", location: "Sector 137, Noida", area: "Sector 137",
    rent: 9800, rating: "4.8", reviews: 103, type: "Unisex", sharing: "Double sharing",
    tag: "Near metro", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    amenities: ["Wi-Fi", "AC", "Meals", "Parking"], available: "4 beds available"
  },
  {
    id: 5, name: "Bloom House", location: "Sector 51, Noida", area: "Sector 51",
    rent: 8900, rating: "4.6", reviews: 58, type: "Women", sharing: "Double sharing",
    tag: "Peaceful stay", image: "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1000&q=85",
    amenities: ["Wi-Fi", "Meals", "Security", "Laundry"], available: "2 beds available"
  },
  {
    id: 6, name: "Metro Miles", location: "Sector 16, Noida", area: "Sector 16",
    rent: 6800, rating: "4.7", reviews: 91, type: "Men", sharing: "Triple sharing",
    tag: "Budget friendly", image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1000&q=85",
    amenities: ["Wi-Fi", "Meals", "AC", "Security"], available: "6 beds available"
  }
];

const amenityIcons = {
  "Wi-Fi": Wifi, Meals: Utensils, AC: AirVent, Laundry: WashingMachine,
  Security: ShieldCheck, Parking: CarFront
};

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function PropertyCard({ property, onDetails, saved, onSave }) {
  return (
    <article className="property-card">
      <div className="property-photo">
        <img src={property.image} alt={`${property.name} room interior`} loading="lazy" />
        <span className="photo-tag">{property.tag}</span>
        <button className={`save-btn ${saved ? "saved" : ""}`} onClick={() => onSave(property.id)} aria-label="Save property">
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="property-content">
        <div className="property-heading">
          <div>
            <h3>{property.name}</h3>
            <p className="location"><MapPin size={14} /> {property.location}</p>
          </div>
          <span className="rating"><Star size={14} fill="currentColor" /> {property.rating} <small>({property.reviews})</small></span>
        </div>
        <div className="chip-row">
          <span>{property.type}</span><span>{property.sharing}</span>
        </div>
        <div className="amenity-row">
          {property.amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity] || Check;
            return <span key={amenity}><Icon size={14} />{amenity}</span>;
          })}
        </div>
        <div className="property-bottom">
          <div><strong>₹{property.rent.toLocaleString("en-IN")}</strong><span>/ month</span><p>{property.available}</p></div>
          <button className="outline-btn" onClick={() => onDetails(property)}>View details <ArrowUpRight size={15} /></button>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [area, setArea] = useState("All locations");
  const [occupant, setOccupant] = useState("Any");
  const [budget, setBudget] = useState("Any budget");
  const [searchText, setSearchText] = useState("");
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => properties.filter((p) => {
    const locationMatch = area === "All locations" || p.area === area;
    const occupantMatch = occupant === "Any" || p.type === occupant;
    const budgetMatch = budget === "Any budget" || (budget === "Under ₹8,000" ? p.rent < 8000 : budget === "₹8,000–₹10,000" ? p.rent >= 8000 && p.rent <= 10000 : p.rent > 10000);
    const textMatch = `${p.name} ${p.location} ${p.area}`.toLowerCase().includes(searchText.toLowerCase());
    return locationMatch && occupantMatch && budgetMatch && textMatch;
  }), [area, occupant, budget, searchText]);

  const toggleSaved = (id) => setSaved((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  const runSearch = () => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-shell">
      <div className="top-strip"><span><Sparkles size={14} /> Your next chapter starts with a better stay.</span><span className="top-right">Need help? <a href={`tel:${CONTACT_PHONE.replaceAll(" ", "")}`}>{CONTACT_PHONE}</a></span></div>
      <header className="navbar">
        <a href="#home" className="brand" aria-label="StayNest home"><span className="brand-mark"><House size={21} strokeWidth={2.4} /></span><span>staynest<span className="brand-dot">.</span><small>LIVE BETTER, EVERY DAY</small></span></a>
        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a href="#properties" onClick={() => setMobileMenu(false)}>Find a PG</a>
          <a href="#why" onClick={() => setMobileMenu(false)}>Why StayNest</a>
          <a href="#locations" onClick={() => setMobileMenu(false)}>Locations</a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
          <a className="nav-cta" href={whatsappLink("Hi StayNest, I want help finding a PG in Noida.")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Talk to us</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-orb orb-one"></div><div className="hero-orb orb-two"></div>
          <div className="hero-copy">
            <div className="eyebrow"><span></span> A better way to live away from home</div>
            <h1>Find your space.<br /><em>Feel at home.</em></h1>
            <p className="hero-description">Thoughtfully designed PGs and co-living spaces for the way you live, work and grow.</p>
            <div className="hero-trust"><div className="avatar-stack"><span>R</span><span>A</span><span>S</span><span>+</span></div><div><div className="mini-stars">★★★★★</div><small>Loved by residents across Noida</small></div></div>
          </div>
          <div className="hero-visual">
            <img className="hero-image" src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90" alt="Premium furnished co-living room" />
            <div className="floating-note note-rating"><span className="note-icon"><Star size={17} fill="currentColor" /></span><div><b>4.8/5 resident rating</b><small>Comfort you can count on</small></div></div>
            <div className="floating-note note-safe"><span className="safe-icon"><ShieldCheck size={19} /></span><div><b>Verified properties</b><small>Feel safe, feel settled</small></div></div>
            <div className="image-caption"><span>01 / YOUR SPACE, YOUR STORY</span><ArrowUpRight size={18} /></div>
          </div>
          <div className="search-panel">
            <div className="search-title"><span className="search-icon"><SlidersHorizontal size={18} /></span><div><b>Find your perfect stay</b><small>Let's find a place that feels like you</small></div></div>
            <label className="search-field"><span>LOCATION</span><div><MapPin size={17} /><select value={area} onChange={e => setArea(e.target.value)}><option>All locations</option><option>Sector 62</option><option>Sector 18</option><option>Sector 15</option><option>Sector 137</option><option>Sector 51</option><option>Sector 16</option></select><ChevronDown size={15} /></div></label>
            <label className="search-field"><span>WHO'S STAYING?</span><div><Users size={17} /><select value={occupant} onChange={e => setOccupant(e.target.value)}><option>Any</option><option>Men</option><option>Women</option><option>Unisex</option></select><ChevronDown size={15} /></div></label>
            <label className="search-field"><span>MONTHLY BUDGET</span><div><span className="rupee">₹</span><select value={budget} onChange={e => setBudget(e.target.value)}><option>Any budget</option><option>Under ₹8,000</option><option>₹8,000–₹10,000</option><option>Above ₹10,000</option></select><ChevronDown size={15} /></div></label>
            <button className="search-btn" onClick={runSearch}>Explore stays <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="stats-band">
          <div><b>20+</b><span>Thoughtful living spaces</span></div><div><b>1,200+</b><span>Happy residents</span></div><div><b>24/7</b><span>Resident support</span></div><div><b>100%</b><span>Furnished comfort</span></div>
        </section>

        <section className="section properties-section" id="properties">
          <div className="section-top"><div><div className="eyebrow dark-eyebrow"><span></span> FIND YOUR PLACE</div><h2>Spaces you'll love<br /><em>coming home to.</em></h2></div><p>From focused workdays to relaxed weekends, discover a stay that fits your routine and your budget.</p></div>
          <div className="listing-toolbar"><div className="listing-count"><b>{filtered.length} stays</b><span> in Noida, curated for you</span></div><label className="quick-search"><SlidersHorizontal size={16} /><input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search property or sector..." /></label></div>
          <div className="property-grid">
            {(showAll ? filtered : filtered.slice(0, 3)).map(p => <PropertyCard key={p.id} property={p} onDetails={setSelected} saved={saved.includes(p.id)} onSave={toggleSaved} />)}
          </div>
          {filtered.length === 0 && <div className="empty-state"><House size={28} /><h3>No stays found</h3><p>Try another sector or adjust your filters.</p><button className="outline-btn" onClick={() => {setArea("All locations");setOccupant("Any");setBudget("Any budget");setSearchText("");}}>Clear filters</button></div>}
          {filtered.length > 3 && <div className="center-action"><button className="text-btn" onClick={() => setShowAll(!showAll)}>{showAll ? "Show featured stays" : "Explore all stays"} <ArrowRight size={16} /></button></div>}
        </section>

        <section className="why-section" id="why">
          <div className="why-image-wrap"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85" alt="Warm, welcoming shared living space" /><div className="image-stamp"><Sparkles size={18} /><span>More than a room.<br /><b>A place to belong.</b></span></div></div>
          <div className="why-copy"><div className="eyebrow"><span></span> THE STAYNEST DIFFERENCE</div><h2>Room to grow.<br /><em>Space to be you.</em></h2><p className="why-intro">Moving to a new city is a big step. We make the living part simple, so you can focus on what brought you here.</p>
            <div className="benefit-list"><div><span><ShieldCheck /></span><div><b>Safety comes first</b><p>Verified properties, secure access and support when you need it.</p></div></div><div><span><Coffee /></span><div><b>Everyday comfort, sorted</b><p>Furnished rooms, Wi-Fi, housekeeping and meal options.</p></div></div><div><span><Zap /></span><div><b>Easy move-in</b><p>Simple enquiries, transparent pricing and a smoother start.</p></div></div></div>
            <a className="light-link" href={whatsappLink("Hi StayNest, please tell me more about your PG facilities.")} target="_blank" rel="noreferrer">Discover the StayNest way <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="locations-section section" id="locations"><div className="section-top"><div><div className="eyebrow dark-eyebrow"><span></span> WELL CONNECTED</div><h2>Find your people.<br /><em>Find your neighbourhood.</em></h2></div><p>Stay close to work, college, metro stations and the places that make your everyday easier.</p></div>
          <div className="location-grid">
            {[["Sector 62","IT hubs · Colleges · Metro","sector-62"],["Sector 18","Shopping · Cafés · Metro","sector-18"],["Sector 137","Business parks · Expressway","sector-137"]].map(([name,desc,id],i)=><button className={`location-card loc-${i+1}`} key={id} onClick={() => {setArea(name);document.getElementById("properties")?.scrollIntoView({behavior:"smooth"});}}><span className="loc-number">0{i+1}</span><span className="loc-copy"><b>{name}</b><small>{desc}</small></span><span className="loc-arrow"><ArrowUpRight size={18}/></span></button>)}
          </div>
        </section>

        <section className="cta-section" id="contact"><div className="cta-spark"><Sparkles size={23}/></div><div><div className="eyebrow"><span></span> LET'S FIND YOUR PLACE</div><h2>Your next chapter<br />starts <em>right here.</em></h2><p>Tell us what you're looking for. Our team will help you find a stay that feels right.</p></div><div className="cta-actions"><a className="cta-whatsapp" href={whatsappLink("Hi StayNest, I'm looking for a PG in Noida. Please help me with available options.")} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Chat on WhatsApp <ArrowRight size={17}/></a><a className="cta-phone" href={`tel:${CONTACT_PHONE.replaceAll(" ", "")}`}><Phone size={16}/> {CONTACT_PHONE}</a><small>Typically replies within business hours</small></div></section>
      </main>

      <footer className="footer"><div className="footer-main"><div className="footer-brand"><a href="#home" className="brand"><span className="brand-mark"><House size={21}/></span><span>staynest<span className="brand-dot">.</span><small>LIVE BETTER, EVERY DAY</small></span></a><p>Thoughtful spaces for people building their next big thing. Find comfort, community and a place to call your own.</p><div className="social-row"><a href={whatsappLink("Hi StayNest!")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17}/></a><a href={`tel:${CONTACT_PHONE.replaceAll(" ", "")}`} aria-label="Call"><Phone size={17}/></a></div></div><div className="footer-column"><b>Explore</b><a href="#properties">Find a PG</a><a href="#why">Why StayNest</a><a href="#locations">Locations</a></div><div className="footer-column"><b>Popular areas</b><a href="#properties" onClick={() => setArea("Sector 62")}>Sector 62</a><a href="#properties" onClick={() => setArea("Sector 18")}>Sector 18</a><a href="#properties" onClick={() => setArea("Sector 137")}>Sector 137</a></div><div className="footer-column footer-contact"><b>Get in touch</b><p><MapPin size={16}/> Noida, Uttar Pradesh, India</p><p><Phone size={16}/> {CONTACT_PHONE}</p><p><Clock3 size={16}/> Mon – Sun, 9 AM – 8 PM</p><a className="footer-whatsapp" href={whatsappLink("Hi StayNest, I have a question.")} target="_blank" rel="noreferrer"><MessageCircle size={15}/> Message us</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} StayNest Living. All rights reserved.</span><span>Made for better living <Heart size={13} fill="currentColor"/></span></div></footer>

      <a className="floating-whatsapp" href={whatsappLink("Hi StayNest, I'm interested in your PGs in Noida.")} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><MessageCircle size={25}/><span>Chat with us</span></a>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="property-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X size={20}/></button><img src={selected.image} alt={selected.name}/><div className="modal-body"><span className="modal-tag">{selected.tag}</span><h2>{selected.name}</h2><p className="location"><MapPin size={15}/>{selected.location}</p><div className="modal-price"><b>₹{selected.rent.toLocaleString("en-IN")}</b><span>/ month onwards</span></div><p className="modal-description">A thoughtfully furnished {selected.sharing.toLowerCase()} space for comfortable everyday living. Contact our team to confirm current availability, deposit and inclusions.</p><div className="modal-amenities">{selected.amenities.map(a => {const Icon=amenityIcons[a]||Check;return <span key={a}><Icon size={15}/>{a}</span>})}</div><a className="search-btn modal-enquire" href={whatsappLink(`Hi StayNest, I'm interested in ${selected.name} at ${selected.location}. Please share current availability, rent and visit timings.`)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Enquire on WhatsApp <ArrowRight size={17}/></a></div></div></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
