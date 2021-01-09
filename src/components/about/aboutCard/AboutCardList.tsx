/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface AboutCardListProps {
	item: any;
	list: any;
}

export const AboutCardList: FC<AboutCardListProps> = (props: AboutCardListProps) => {
	const { item, list } = props;

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`${item.title}-${list.title}-panel`}
				id={`${item.title}-${list.title}-header`}>
				<Typography>{list.title}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<List>
					{list.value.map((listItem: any) => {
						return listItem.link ? (
							<ListItem component="a" href={listItem.link}>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary={listItem.title} secondary={listItem.description} />
							</ListItem>
						) : (
							<ListItem>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary={listItem.title} secondary={listItem.description} />
							</ListItem>
						);
					})}
				</List>
			</AccordionDetails>
		</Accordion>
	);
};
