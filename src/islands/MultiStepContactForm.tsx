import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showToast } from './Toast';

// Validation schemas for each step
const step1Schema = z.object({
  eventType: z.string().min(1, 'Selecciona un tipo de evento'),
});

const step2Schema = z.object({
  eventDate: z.string().min(1, 'Selecciona una fecha'),
  guestCount: z.number().min(10, 'Mínimo 10 asistentes').max(500, 'Máximo 500 asistentes'),
  budget: z.string().min(1, 'Selecciona un rango de presupuesto'),
  specialRequirements: z.string().optional(),
});

const step3Schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const eventTypes = [
  { value: 'boda', label: '💒 Boda', description: 'Tu día especial' },
  { value: 'xv-anos', label: '👑 XV Años', description: 'Fiesta de quinceañera' },
  { value: 'corporativo', label: '🏢 Evento Corporativo', description: 'Conferencia o lanzamiento' },
  { value: 'otro', label: '✨ Otro', description: 'Cumpleaños, aniversario, etc.' },
];

const budgetRanges = [
  { value: '10-25k', label: '$10,000 - $25,000' },
  { value: '25-50k', label: '$25,000 - $50,000' },
  { value: '50-100k', label: '$50,000 - $100,000' },
  { value: '100k+', label: '$100,000 o más' },
];

/**
 * Multi-Step Contact Form
 * Features:
 * - 3-step form wizard
 * - Progressive disclosure
 * - Visual progress indicator
 * - Form validation on each step
 * - Smooth transitions
 * - Guest counter with slider
 * - Date picker
 * - Budget selector
 */
const MultiStepContactForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    guestCount: 100,
    budget: '',
    specialRequirements: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { eventType: formData.eventType },
  });

  // Step 2 form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      eventDate: formData.eventDate,
      guestCount: formData.guestCount,
      budget: formData.budget,
      specialRequirements: formData.specialRequirements,
    },
  });

  // Step 3 form
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    },
  });

  const handleStep1Submit = async (data: Step1Data) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const handleStep2Submit = async (data: Step2Data) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const handleStep3Submit = async (data: Step3Data) => {
    setIsSubmitting(true);
    const completeData = { ...formData, ...data };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData),
      });

      if (response.ok) {
        showToast(
          '¡Gracias! Tu solicitud fue enviada. Nos contactaremos pronto.',
          'success',
          5000
        );
        // Reset form
        setStep(1);
        setFormData({
          eventType: '',
          eventDate: '',
          guestCount: 100,
          budget: '',
          specialRequirements: '',
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        step1Form.reset();
        step2Form.reset();
        step3Form.reset();
      } else {
        showToast(
          'Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.',
          'error',
          5000
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showToast(
        'Error de conexión. Por favor intenta de nuevo.',
        'error',
        5000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            {/* Circle */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${
                s <= step
                  ? 'bg-gradient-to-r from-eventflow-primary to-eventflow-base text-white shadow-lg'
                  : 'bg-eventflow-black-dark border-2 border-eventflow-border-dark text-gray-400'
              }`}
            >
              {s < step ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                s
              )}
            </div>

            {/* Line */}
            {s < 3 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                  s < step
                    ? 'bg-gradient-to-r from-eventflow-primary to-eventflow-base'
                    : 'bg-eventflow-border-dark'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>Tipo de Evento</span>
        <span>Detalles</span>
        <span>Información</span>
      </div>

      {/* Forms */}
      <div className="relative min-h-96">
        {/* Step 1 */}
        {step === 1 && (
          <form
            onSubmit={step1Form.handleSubmit(handleStep1Submit)}
            className="space-y-6 animate-in fade-in slide-in-from-right-4"
          >
            <div>
              <label className="mb-4 block text-white font-semibold">
                ¿Qué tipo de evento celebras?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      step1Form.setValue('eventType', type.value);
                      setFormData({ ...formData, eventType: type.value });
                    }}
                    className={`glass-card p-4 text-left transition-all duration-300 ${
                      step1Form.watch('eventType') === type.value
                        ? 'ring-2 ring-eventflow-primary bg-eventflow-primary/10'
                        : 'hover:bg-eventflow-primary/5'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.label.split(' ')[0]}</div>
                    <div className="text-white font-semibold">{type.label.substring(2)}</div>
                    <div className="text-sm text-gray-400 mt-1">{type.description}</div>
                  </button>
                ))}
              </div>
              {step1Form.formState.errors.eventType && (
                <p className="text-red-400 text-sm mt-2">
                  {step1Form.formState.errors.eventType.message}
                </p>
              )}
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!step1Form.watch('eventType')}
                className="bg-gradient-to-r from-eventflow-primary to-eventflow-base text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form
            onSubmit={step2Form.handleSubmit(handleStep2Submit)}
            className="space-y-6 animate-in fade-in slide-in-from-right-4"
          >
            {/* Date */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Fecha del Evento *
              </label>
              <input
                type="date"
                {...step2Form.register('eventDate')}
                className="w-full rounded-lg border border-eventflow-border-dark bg-eventflow-black-dark text-white px-4 py-3 focus:border-eventflow-primary focus:outline-none focus:ring-2 focus:ring-eventflow-primary/30 transition-all duration-300"
              />
              {step2Form.formState.errors.eventDate && (
                <p className="text-red-400 text-sm mt-1">
                  {step2Form.formState.errors.eventDate.message}
                </p>
              )}
            </div>

            {/* Guest Counter */}
            <div>
              <label className="block text-white font-semibold mb-4">
                Número de Asistentes: <span className="text-eventflow-primary">{step2Form.watch('guestCount')}</span>
              </label>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                {...step2Form.register('guestCount', { valueAsNumber: true })}
                className="w-full h-2 bg-eventflow-border-dark rounded-lg appearance-none cursor-pointer accent-eventflow-primary"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>10</span>
                <span>500</span>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Rango de Presupuesto *
              </label>
              <select
                {...step2Form.register('budget')}
                className="w-full rounded-lg border border-eventflow-border-dark bg-eventflow-black-dark text-white px-4 py-3 focus:border-eventflow-primary focus:outline-none focus:ring-2 focus:ring-eventflow-primary/30 transition-all duration-300"
              >
                <option value="">Selecciona un rango</option>
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {step2Form.formState.errors.budget && (
                <p className="text-red-400 text-sm mt-1">
                  {step2Form.formState.errors.budget.message}
                </p>
              )}
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Requisitos Especiales (Opcional)
              </label>
              <textarea
                {...step2Form.register('specialRequirements')}
                placeholder="Ej: zona de fumadores, área VIP, decoración particular..."
                className="w-full rounded-lg border border-eventflow-border-dark bg-eventflow-black-dark text-white px-4 py-3 focus:border-eventflow-primary focus:outline-none focus:ring-2 focus:ring-eventflow-primary/30 transition-all duration-300 resize-none"
                rows={4}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="border-2 border-eventflow-primary text-eventflow-primary px-8 py-3 rounded-lg font-semibold hover:bg-eventflow-primary/10 transition-all duration-300"
              >
                Atrás
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-eventflow-primary to-eventflow-base text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Continuar
              </button>
            </div>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <form
            onSubmit={step3Form.handleSubmit(handleStep3Submit)}
            className="space-y-6 animate-in fade-in slide-in-from-right-4"
          >
            {/* Name */}
            <div>
              <label className="block text-white font-semibold mb-2">Nombre *</label>
              <input
                type="text"
                {...step3Form.register('name')}
                className="w-full rounded-lg border border-eventflow-border-dark bg-eventflow-black-dark text-white px-4 py-3 focus:border-eventflow-primary focus:outline-none focus:ring-2 focus:ring-eventflow-primary/30 transition-all duration-300"
              />
              {step3Form.formState.errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {step3Form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-semibold mb-2">Email *</label>
              <input
                type="email"
                {...step3Form.register('email')}
                className="w-full rounded-lg border border-eventflow-border-dark bg-eventflow-black-dark text-white px-4 py-3 focus:border-eventflow-primary focus:outline-none focus:ring-2 focus:ring-eventflow-primary/30 transition-all duration-300"
              />
              {step3Form.formState.errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {step3Form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white font-semibold mb-2">Teléfono *</label>
              <input
                type="tel"
                {...step3Form.register('phone')}
                className="w-full rounded-lg border border-eventflow-border-dark bg-eventflow-black-dark text-white px-4 py-3 focus:border-eventflow-primary focus:outline-none focus:ring-2 focus:ring-eventflow-primary/30 transition-all duration-300"
              />
              {step3Form.formState.errors.phone && (
                <p className="text-red-400 text-sm mt-1">
                  {step3Form.formState.errors.phone.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Mensaje Adicional *
              </label>
              <textarea
                {...step3Form.register('message')}
                placeholder="Cuéntanos sobre tu evento y lo que esperas de Majestic..."
                className="w-full rounded-lg border border-eventflow-border-dark bg-eventflow-black-dark text-white px-4 py-3 focus:border-eventflow-primary focus:outline-none focus:ring-2 focus:ring-eventflow-primary/30 transition-all duration-300 resize-none"
                rows={4}
              />
              {step3Form.formState.errors.message && (
                <p className="text-red-400 text-sm mt-1">
                  {step3Form.formState.errors.message.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={isSubmitting}
                className="border-2 border-eventflow-primary text-eventflow-primary px-8 py-3 rounded-lg font-semibold hover:bg-eventflow-primary/10 transition-all duration-300 disabled:opacity-50"
              >
                Atrás
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-eventflow-primary to-eventflow-base text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MultiStepContactForm;
