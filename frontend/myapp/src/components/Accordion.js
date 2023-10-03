import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto', // Center horizontally
    width: '60vw', // Set the width to 80vw
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)', // Add the shadow
    marginBottom:'200px',
    // Media query for mobile screens
  '@media (max-width: 771px)': {
    width: '90vw', // Adjust width for mobile
  },
  });

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
    backgroundColor: '#fff', // Set the background color to white
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
        // Add font weight 700 to the text inside AccordionDetails
        '& p': {
            fontWeight: 700,
        },
    },
    '&:before': {
      display: 'none',
    },
  }));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: '#fff', // Set the background color to white
  // Add font weight 700 to the text inside AccordionDetails
  '& p': {
    fontWeight: 300,
  },
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
        <h1 className="accordion-title">Frequently <span className="accordion-title-blue">Asked</span> Questions (FAQ)</h1>
        <CenteredContainer>
        <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>What is Kotlibes?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Kotlibes is an AI-based marketing solution tailored specifically for small and medium-sized businesses (SMBs). It offers a range of useful tools to enhance your marketing efforts across various platforms.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>How does Kotlibes work?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Kotlibes uses advanced artificial intelligence algorithms to analyze your business needs and provide tailored marketing strategies, content ideas, ad creatives, and more. It helps you optimize your marketing efforts effectively.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>How can Kotlibes help with SEO?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Kotlibes offers an SEO toolkit that includes a meta tag generator, meta description, and SEO-friendly content outlines to improve your website's search engine rankings.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography>How does the credit-based subscription work?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Kotlibes employs a credit-based system for subscriptions. Each tool or feature utilized consumes a certain number of credits. Users can purchase credit packs based on their specific needs. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
            <Typography>How do the credit subscriptions work, and do unused credits expire?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                With our credit-based subscription model, you can purchase a specific number of credits that grant access to Kotlibes' powerful marketing tools. The good news is, any unused credits from your initial purchase won't expire after two months. However, to continue using the software, you'll need to maintain a minimum number of credits in your account. But here's the exciting part - when you buy new credit packs to meet the minimum requirement, not only do you get the new credits, but you also retain all your previously purchased credits. This way, you can keep building up your credit balance and continue enjoying Kotlibes' AI-based marketing solutions without any worries!
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
            <Typography>What tools are available in the SMM section?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            The SMM (Social Media Marketing) section includes tools for generating content ideas and scripts for YouTube, Instagram, and TikTok. and we still developing new tools.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
            <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
            <Typography>Tell me more about the Strategic growth suite section.</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                The strategic growth suite section focuses on defining your marketing strategy, Unique Selling Proposition (USP), and creating customer personas to align your marketing efforts with your target audience. and other more in the future.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
            <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
            <Typography>What does the Advertising section offer?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                In the AdGenius Toolkit section, you can find tools to create compelling ad copy, eye-catching ad creatives, and define your target audience based on demographics and interests.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
            <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
            <Typography>What types of emails can I generate with Kotlibes?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Kotlibes allows you to generate sales emails, leads generation emails, and offer emails to streamline your email marketing campaigns. and we will cover other email goals in future updates.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
            <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
            <Typography>How does Kotlibes handle customer communication?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            Kotlibes provides pre-defined AI responses for dealing with different types of customer messages, including those from angry or confused users. It helps maintain a professional and friendly communication tone.
            </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
        </CenteredContainer>
    </div>
  );
}