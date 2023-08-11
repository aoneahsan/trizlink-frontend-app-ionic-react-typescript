// Core Imports
import React, { useRef, useEffect } from 'react';

// Packages Imports
import classNames from 'classnames';

interface ZCustomScrollableProps {
	children: React.ReactNode;
	className?: string;
	scrollY?: boolean;
	scrollX?: boolean;
}

const ZCustomScrollable: React.FC<ZCustomScrollableProps> = ({
	children,
	className,
	scrollY = false,
	scrollX = false,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;

		if (!container) return;

		const observer = new ResizeObserver((entries) => {
			const { scrollHeight, clientHeight, scrollWidth, clientWidth } =
				entries[0].target;
			if (scrollY && scrollHeight > clientHeight) {
				container.classList.add('overflow-y-scroll');
				container.classList.add('zaions_pretty_scrollbar');
			} else if (scrollY && scrollHeight <= clientHeight) {
				container.classList.remove(
					'zaions_pretty_scrollbar',
					'overflow-y-scroll'
				);
			}

			if (scrollX && scrollWidth > clientWidth) {
				container.classList.add('zaions_pretty_scrollbar', 'overflow-x-scroll');
			} else if (scrollX && scrollWidth <= clientWidth) {
				container.classList.remove(
					'zaions_pretty_scrollbar',
					'overflow-x-scroll'
				);
			}
		});

		observer.observe(container);

		return () => {
			observer.unobserve(container);
		};
	}, [children, scrollX, scrollY]);

	return (
		<div ref={containerRef} className={classNames(className)}>
			{children}
		</div>
	);
};

export default ZCustomScrollable;
