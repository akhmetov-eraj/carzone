import Container from '@/shared/ui/container'
import { CustomerServiceSection } from '@/widgets/customer-service-section/customer-service-section'
import AboutUsSection from '@/widgets/sections/about-us-section/about-us-section'
import { BrandsSection } from '@/widgets/sections/brands-section/brands-section'
import CarsSection from '@/widgets/sections/cars-section/cars-section'
import HeroSection from '@/widgets/sections/hero-section/hero-section'

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<Container>
				<AboutUsSection />
			</Container>
			<CarsSection />
			<BrandsSection />
			<CustomerServiceSection />
		</>
	)
}
