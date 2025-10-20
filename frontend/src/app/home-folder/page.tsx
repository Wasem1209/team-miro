"use client"
import HeroSection from "../home-folder/Components/HeroSection";
import FeaturedVehicle from "../home-folder/Components/FeaturedVehicle";
import WhyChooseUs from "../home-folder/Components/WhyChooseUs";
import HowItWorks from "../home-folder/Components/HowItWorks";
import Newsletter from "../home-folder/Components/Newsletter";


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
