/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CardList, CardListItem } from '../About';

export interface AboutCardListProps {
	list: CardList;
}

export const AboutCardList: FC<AboutCardListProps> = (props: AboutCardListProps) => {
	const { list } = props;

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`$${list.title}-panel`} id={`${list.title}-header`}>
				<Typography>{list.title}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<List>
					{list.value.map((listItem: CardListItem, index: number) => {
						return listItem.link ? (
							<ListItem key={`${listItem.title}-${index}`} className="card-list-anchor" component="a" href={listItem.link}>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary={listItem.title} secondary={listItem.description} />
							</ListItem>
						) : (
							<ListItem key={`${listItem.title}-${index}`}>
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
