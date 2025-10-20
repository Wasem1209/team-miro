"use client"
import HeroSection from "./Components/HeroSection";
import FeaturedVehicle from "./Components/FeaturedVehicle";
import WhyChooseUs from "./Components/WhyChooseUs";
import HowItWorks from "./Components/HowItWorks";
import Newsletter from "./Components/Newsletter";


export default function Home() {
    return (
        <main>
          
            <section className="mt-20 text-center  bg-[#F0F0F0]">
              <HeroSection />
          <FeaturedVehicle />
                <WhyChooseUs />
                <HowItWorks />
                <Newsletter />
            </section>
           
        </main>
    )
}
