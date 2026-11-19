import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceList from '../features/services/ServiceList';

const advantages = [
  {
    "title": "Lightning Fast",
    "description": "Quick document verification and rapid processing for your compliance needs. Get active updates directly on your dashboard."
  },
  {
    "title": "Bank-Level Security",
    "description": "All confidential records and financial statements are safeguarded with strict access controls and encrypted archives."
  },
  {
    "title": "Expert CA Team",
    "description": "Every filing is thoroughly reviewed and submitted by licensed Chartered Accountants with extensive industry expertise."
  },
  {
    "title": "24/7 Support",
    "description": "Round-the-clock customer support available across chat, phone, and ticketing systems for continuous assistance."
  },
  {
    "title": "Full Transparency",
    "description": "No hidden charges or surprise invoices. Clear upfront pricing separating net professional fees and statutory government costs."
  },
  {
    "title": "Dedicated Coordinator",
    "description": "An operations coordinator is assigned to manage your order workflow from document collection to final invoice delivery."
  }
];

const metrics = [
  ['10,000+', 'Happy Clients'],
  ['50,000+', 'Services Completed'],
  ['250+', 'Expert Professionals'],
  ['15+', 'Industry Awards'],
];

// Keep existing business copy and service data; this slice changes presentation only.
export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <VStack gap={0}>
      <VStack as="section" paddingInline={4} paddingBlock={10} hAlign="center"
        style={{ background: 'var(--color-background-muted)' }}>
        <Grid columns={{ minWidth: 360, max: 2 }} gap={8} align="center" width="100%" maxWidth={1240}>
          <VStack gap={5}>
            <Text type="label" color="accent">FINANCIAL SERVICES. CLEARLY SIMPLIFIED.</Text>
            <Heading level={1} type="display-3" weight="bold" textWrap="balance">
              Your Financial Future Starts Here
            </Heading>
            <Text as="p" type="large" color="secondary">
              Navigate your financial journey with confidence. We provide comprehensive business registration, taxation, auditing, and certification solutions with verified professional expertise.
            </Text>
            <HStack gap={3} wrap="wrap">
              <Button label="Explore Solutions" variant="primary" size="lg"
                endContent={<ArrowRight aria-hidden="true" />} onClick={() => navigate('/services')} />
              <Button label="Explore Demo" variant="secondary" size="lg" onClick={() => navigate('/explore-demo')} />
              <Button label="Get in Touch" variant="secondary" size="lg" onClick={() => navigate('/contact')} />
            </HStack>
            <HStack gap={4} wrap="wrap">
              <Text type="supporting">10,000+ Active Clients</Text>
              <Text type="supporting">99.8% Satisfaction Rate</Text>
              <Text type="supporting">24/7 Compliance Support</Text>
            </HStack>
          </VStack>
          <Card elevation="low" padding={6}>
            <VStack gap={5}>
              <HStack gap={3} vAlign="center">
                <Shield aria-hidden="true" color="var(--color-accent)" />
                <Text type="label" color="accent">YOUR BUSINESS, SUPPORTED</Text>
              </HStack>
              <Heading level={2}>Finservkart Enterprise Suite</Heading>
              <Text type="supporting">ISO Certified &amp; Bank-Grade Security</Text>
              <VStack gap={4}>
                <VStack gap={1}>
                  <Heading level={3}>Zero Hidden Charges</Heading>
                  <Text color="secondary">Direct government fees + upfront professional cost breakdown.</Text>
                </VStack>
                <VStack gap={1}>
                  <Heading level={3}>Chartered Accountant Verified</Heading>
                  <Text color="secondary">Every workflow is assigned to licensed financial experts.</Text>
                </VStack>
                <VStack gap={1}>
                  <Heading level={3}>Encrypted Document Vault</Heading>
                  <Text color="secondary">Supporting docs zipped with AES encryption &amp; secure storage.</Text>
                </VStack>
              </VStack>
              <Button label="Create Customer Account" variant="secondary" size="lg" width="100%"
                onClick={() => navigate('/register')} />
            </VStack>
          </Card>
        </Grid>
      </VStack>

      <VStack as="section" paddingInline={4} paddingBlock={6} hAlign="center">
        <Grid columns={{ minWidth: 200, max: 4 }} gap={5} width="100%" maxWidth={1240}>
          {metrics.map(([value, label]) => (
            <VStack key={label} gap={1} hAlign="center">
              <Text type="display-3" color="accent" hasTabularNumbers>{value}</Text>
              <Text type="supporting">{label}</Text>
            </VStack>
          ))}
        </Grid>
      </VStack>

      <VStack as="section" paddingInline={4} paddingBlock={10} hAlign="center" gap={6}>
        <VStack gap={3} maxWidth={720} hAlign="center">
          <Text type="label" color="accent">COMPREHENSIVE SOLUTIONS</Text>
          <Heading level={2} justify="center" textWrap="balance">Financial services for every stage of business</Heading>
          <Text as="p" color="secondary" justify="center">
            Explore verified financial, taxation, and company formation services with clear government fee transparency and required document checklists.
          </Text>
        </VStack>
        <VStack width="100%" maxWidth={1240}>
          <ServiceList limit={6} />
        </VStack>
        <Button label="Explore All Available Services" variant="secondary" size="lg"
          endContent={<ArrowRight aria-hidden="true" />} onClick={() => navigate('/services')} />
      </VStack>

      <VStack as="section" paddingInline={4} paddingBlock={10} hAlign="center" gap={8}
        style={{ background: 'var(--color-background-muted)' }}>
        <VStack gap={3} maxWidth={720} hAlign="center">
          <Text type="label" color="accent">THE FINSERVKART ADVANTAGE</Text>
          <Heading level={2} justify="center">Why Choose Finservkart?</Heading>
          <Text as="p" color="secondary" justify="center">
            We are dedicated to delivering excellence, transparent pricing, and regulatory compliance for businesses across India.
          </Text>
        </VStack>
        <Grid columns={{ minWidth: 280, max: 3 }} gap={6} width="100%" maxWidth={1240}>
          {advantages.map((item, index) => (
            <VStack key={item.title} gap={3}>
              <Text type="label" color="accent">0{index + 1}</Text>
              <Heading level={3}>{item.title}</Heading>
              <Text as="p" color="secondary">{item.description}</Text>
            </VStack>
          ))}
        </Grid>
      </VStack>

      <VStack as="section" paddingInline={4} paddingBlock={10} hAlign="center" gap={5}>
        <Text type="label" color="accent">LET?S MOVE YOUR BUSINESS FORWARD</Text>
        <Heading level={2} justify="center" textWrap="balance">Ready to Streamline Your Business Finances?</Heading>
        <VStack maxWidth={720}>
          <Text as="p" color="secondary" justify="center">
            Join over 10,000 businesses across India that rely on Finservkart for GST, ITR, audits, and company registrations.
          </Text>
        </VStack>
        <HStack gap={3} wrap="wrap" hAlign="center">
          <Button label="Create Free Account" variant="primary" size="lg" onClick={() => navigate('/register')} />
          <Button label="Contact Our Advisors" variant="secondary" size="lg" onClick={() => navigate('/contact')} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default HomePage;
