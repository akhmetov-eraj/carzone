import { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
	return <div className='max-w-7xl px-[10px] mx-auto relative'>{children}</div>
}
