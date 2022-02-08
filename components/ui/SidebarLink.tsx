type SidebarLinkProps = {
	text: string;
}

const SidebarLink = ({ text }: SidebarLinkProps) => (
	<button className='sidebar__link'>
		{
			text.length > 20 ? (
				<>
					{ text.substring(0, 20) }...
				</>
			)	: ( text )
		}
	</button>
);

export default SidebarLink;
