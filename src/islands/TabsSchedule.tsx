import { useState } from 'react';

interface ScheduleEvent {
  id: string;
  title: string;
  speaker: string;
  location: string;
  time: string;
  image?: string;
  description?: string;
}

interface DayTab {
  id: string;
  label: string;
  date: string;
  events: ScheduleEvent[];
}

interface TabsScheduleProps {
  days: DayTab[];
  defaultTab?: string;
}

export default function TabsSchedule({
  days,
  defaultTab,
}: TabsScheduleProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab || days[0]?.id || ''
  );

  const activeEvents = days.find((day) => day.id === activeTab)?.events || [];

  return (
    <div>
      {/* Tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-4 border-b border-eventflow-border">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveTab(day.id)}
            className={`px-6 py-4 font-medium transition-all duration-300 ${
              activeTab === day.id
                ? 'border-b-2 border-eventflow-primary text-eventflow-primary'
                : 'text-eventflow-gray hover:text-eventflow-primary'
            }`}
          >
            <span className="block text-sm">{day.label}</span>
            <span className="block text-xs text-eventflow-gray">{day.date}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeEvents.map((event) => (
          <div
            key={event.id}
            className="overflow-hidden rounded-lg border border-eventflow-border transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col gap-6 p-6 md:flex-row">
              {event.image && (
                <div className="h-48 w-full flex-shrink-0 md:h-40 md:w-40">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="mb-2 flex items-center gap-4 text-sm text-eventflow-gray">
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {event.time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {event.location}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-eventflow-black">
                  {event.title}
                </h3>

                <p className="mb-4 text-sm font-medium text-eventflow-primary">
                  {event.speaker}
                </p>

                {event.description && (
                  <p className="text-sm text-eventflow-gray">
                    {event.description}
                  </p>
                )}
              </div>

              <div className="flex flex-shrink-0 items-center md:flex-col">
                <button className="btn-primary text-sm">
                  Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
