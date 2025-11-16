import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showToast } from './Toast';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  apiEndpoint?: string;
  successMessage?: string;
  errorMessage?: string;
  submitButtonText?: string;
}

export default function ContactForm({
  apiEndpoint = '/api/contact',
  successMessage = '¡Gracias! Tu mensaje fue enviado exitosamente.',
  errorMessage = 'Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.',
  submitButtonText = 'Enviar Mensaje',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        showToast(successMessage, 'success', 5000);
        // Auto-clear success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        showToast(errorMessage, 'error', 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      showToast(errorMessage, 'error', 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:outline-none ${
      hasError
        ? 'border-red-500 focus:ring-2 focus:ring-red-500/30 bg-red-50/30'
        : 'border-eventflow-border focus:border-eventflow-primary focus:ring-2 focus:ring-eventflow-primary/20'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="animate-in fade-in slide-in-from-top rounded-lg bg-green-50 p-4 text-green-700 border border-green-200 flex items-start gap-3">
          <svg className="h-5 w-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="animate-in fade-in slide-in-from-top rounded-lg bg-red-50 p-4 text-red-700 border border-red-200 flex items-start gap-3">
          <svg className="h-5 w-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name Field */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '0.05s' }}>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-eventflow-black">
          Nombre *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Tu nombre completo"
          {...register('name')}
          className={inputClasses(!!errors.name)}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200 flex items-center gap-1">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '0.1s' }}>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-eventflow-black">
          Email *
        </label>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          {...register('email')}
          className={inputClasses(!!errors.email)}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200 flex items-center gap-1">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
            </svg>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '0.15s' }}>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-eventflow-black">
          Teléfono (Opcional)
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+34 XXX XXX XXX"
          {...register('phone')}
          className={inputClasses(false)}
        />
      </div>

      {/* Subject Field */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '0.2s' }}>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-eventflow-black">
          Asunto *
        </label>
        <input
          id="subject"
          type="text"
          placeholder="¿De qué se trata tu consulta?"
          {...register('subject')}
          className={inputClasses(!!errors.subject)}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200 flex items-center gap-1">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
            </svg>
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '0.25s' }}>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-eventflow-black">
          Mensaje *
        </label>
        <textarea
          id="message"
          placeholder="Cuéntanos más detalles sobre tu evento..."
          rows={5}
          {...register('message')}
          className={inputClasses(!!errors.message)}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 animate-in fade-in duration-200 flex items-center gap-1">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
            </svg>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pt-4" style={{ animationDelay: '0.3s' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
        >
          {isSubmitting ? (
            <>
              <svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Enviando...
            </>
          ) : (
            <>
              {submitButtonText}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
