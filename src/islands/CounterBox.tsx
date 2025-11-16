import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface CounterBoxProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  label?: string;
  icon?: string;
}

export default function CounterBox({
  end,
  start = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  separator = ',',
  label = '',
  icon = '',
}: CounterBoxProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className="text-center"
    >
      {icon && (
        <div className="mb-4 flex justify-center">
          <span className="text-4xl">{icon}</span>
        </div>
      )}
      <div className="mb-2 text-4xl font-bold text-eventflow-primary md:text-5xl">
        {inView ? (
          <CountUp
            start={start}
            end={end}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
            separator={separator}
          />
        ) : (
          `${prefix}${start}${suffix}`
        )}
      </div>
      {label && <p className="text-sm font-medium text-eventflow-gray">{label}</p>}
    </div>
  );
}
