import { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Camera, Music2, Clock, Link2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    toast.success(t('common.messageSent'));
    form.reset();
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} - VIVRE BIO</title>
        <meta name="description" content={t('contact.subtitle')} />
      </Helmet>

      <div className="bg-gradient-to-b from-[#EDE6D6] to-[#F5F0E8] py-20 border-b border-[#DDD5C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
           <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#2D6A1B] border-b-2 border-[#2D6A1B] pb-1 mb-4">
             {t('contact.title')}
           </span>
           <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-gray-100 mb-4">
             {t('contact.title')}
           </h1>
          <p className="text-base text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-3xl p-8 lg:p-12 shadow-sm">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#2A2A2A] dark:text-gray-100 mb-2">{t('contact.formTitle')}</h2>
              <p className="text-sm text-[#6B6B6B] dark:text-gray-400 mb-10">{t('contact.formSubtitle')}</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-[#2A2A2A] dark:text-gray-200 mb-2">{t('common.name')}</FormLabel>
                           <FormControl>
                             <Input placeholder={t('common.name')} {...field} className="h-12 px-4 rounded-full border-[#DDD5C5] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-[#2D6A1B]" />
                           </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-[#2A2A2A] dark:text-gray-200 mb-2">{t('common.email')}</FormLabel>
                           <FormControl>
                             <Input type="email" placeholder={t('common.email')} {...field} className="h-12 px-4 rounded-full border-[#DDD5C5] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-[#2D6A1B]" />
                           </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#2A2A2A] dark:text-gray-200 mb-2">{t('common.subject')}</FormLabel>
                           <FormControl>
                             <Input placeholder={t('common.subject')} {...field} className="h-12 px-4 rounded-full border-[#DDD5C5] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-[#2D6A1B]" />
                           </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-[#2A2A2A] dark:text-gray-200 mb-2">{t('common.message')}</FormLabel>
                           <FormControl>
                             <Textarea placeholder={t('common.message')} rows={5} {...field} className="p-4 rounded-2xl border-[#DDD5C5] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-[#2D6A1B]" />
                           </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={sending} className="bg-[#2D6A1B] hover:bg-[#1B4D0F] text-white px-10 py-6 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
                    {sending ? t('common.loading') : t('common.sendMessage')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="space-y-6">
            <a href="https://wa.me/22967242407" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-all no-underline text-inherit group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform"><Phone size={22} /></div>
                <div>
                  <strong className="block text-sm font-semibold text-[#2A2A2A] dark:text-gray-100">{t('contact.whatsapp')}</strong>
                  <span className="text-xs text-[#6B6B6B] dark:text-gray-400">67 24 24 07</span>
                </div>
              </div>
            </a>

            <a href="tel:+22991043434" className="block bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-all no-underline text-inherit group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2D6A1B] flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform"><Phone size={22} /></div>
                <div>
                  <strong className="block text-sm font-semibold text-[#2A2A2A] dark:text-gray-100">{t('contact.phone')}</strong>
                  <span className="text-xs text-[#6B6B6B] dark:text-gray-400">91 04 34 34</span>
                </div>
              </div>
            </a>

            <a href="mailto:contact@vivrebio.shop" className="block bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-all no-underline text-inherit group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2D6A1B] flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform"><Mail size={22} /></div>
                 <div>
                   <strong className="block text-sm font-semibold text-[#2A2A2A] dark:text-gray-100">Email</strong>
                   <span className="text-xs text-[#6B6B6B] dark:text-gray-400">{t('common.email')}</span>
                 </div>
              </div>
            </a>

            <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2D6A1B] flex items-center justify-center text-white flex-shrink-0 shadow-sm"><MapPin size={22} /></div>
                <div>
                  <strong className="block text-sm font-semibold text-[#2A2A2A] dark:text-gray-100">{t('contact.delivery')}</strong>
                  <span className="text-xs text-[#6B6B6B] dark:text-gray-400">{t('contact.deliveryText')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#2D6A1B] flex items-center justify-center text-white flex-shrink-0 shadow-sm"><Clock size={22} /></div>
                <div>
                  <strong className="block text-sm font-semibold text-[#2A2A2A] dark:text-gray-100">{t('contact.hours')}</strong>
                  <span className="text-xs text-[#6B6B6B] dark:text-gray-400">{t('contact.hoursText')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-[#DDD5C5] dark:border-gray-700 rounded-2xl p-6">
              <p className="text-sm font-semibold text-[#2A2A2A] dark:text-gray-100 mb-4 uppercase tracking-wider">{t('contact.followUs')}</p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/pagevivrebio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#DDD5C5] dark:border-gray-600 flex items-center justify-center text-[#6B6B6B] dark:text-gray-400 hover:border-[#C4952E] hover:text-[#C4952E] transition-all no-underline" aria-label="Facebook"><Camera size={18} /></a>
                <a href="https://www.instagram.com/yeyibionature" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#DDD5C5] dark:border-gray-600 flex items-center justify-center text-[#6B6B6B] dark:text-gray-400 hover:border-[#C4952E] hover:text-[#C4952E] transition-all no-underline" aria-label="Instagram"><Globe size={18} /></a>
                <a href="https://www.tiktok.com/@vivrebioshop_bj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#DDD5C5] dark:border-gray-600 flex items-center justify-center text-[#6B6B6B] dark:text-gray-400 hover:border-[#C4952E] hover:text-[#C4952E] transition-all no-underline" aria-label="TikTok"><Music2 size={18} /></a>
                <a href="https://fr.pinterest.com/blanchehonvou" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#DDD5C5] dark:border-gray-600 flex items-center justify-center text-[#6B6B6B] dark:text-gray-400 hover:border-[#C4952E] hover:text-[#C4952E] transition-all no-underline" aria-label="Pinterest"><Link2 size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
