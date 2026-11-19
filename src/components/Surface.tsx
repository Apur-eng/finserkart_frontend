import { VStack, type VStackProps } from '@astryxdesign/core/VStack';

/** Transitional Astryx layout primitive for existing, behavior-preserving page compositions. */
export function Surface({ style, ...props }: VStackProps) {
  return <VStack {...props} style={{ display: 'block', flexDirection: 'row', minWidth: 0, ...style }} />;
}

export function Inline({ style, ...props }: VStackProps) {
  return <VStack as="span" {...props} style={{ display: 'inline', flexDirection: 'row', ...style }} />;
}
