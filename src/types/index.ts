export interface NavItem {
  label: string
  href: string
}

export interface Feature {
  icon: string
  title: string
  description: string
  href?: string
}

export interface Testimonial {
  name: string
  rating: number
  text: string
  date: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ServiceArea {
  label: string
  keyword: string
}
