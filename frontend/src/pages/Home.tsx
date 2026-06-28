import HeroSection from '../components/home/HeroSection'
import FeaturedTours from '../components/home/FeaturedTours'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import StatsSection from '../components/home/StatsSection'

const Home = () => {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturedTours />
      <WhyChooseUs />
      <Testimonials />
    </main>
  )
}

export default Home