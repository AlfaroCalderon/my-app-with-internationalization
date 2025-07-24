import { Form } from "@/app/components/Form/Form";
import { getDictionary } from "./dictionaries";

export default async function Home({params}: {params: Promise<{lang: 'en-US' | 'es-ES' | 'ru'}>}){

   const {lang} = await params;
   const dict = await getDictionary(lang)

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-md p-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900">
            {dict.HomePage.title}
          </h1>
          <p className="mt-2 text-gray-700">
            {dict.HomePage.description}
          </p>
        </div>
      </header>

      <main className="mx-auto  max-w-4xl px-6 py-8 ">
        <Form formTitle={dict.Form.formTitle} name={dict.Form.name} lastName={dict.Form.lastName}  namePlaceholder={dict.Form.namePlaceholder} lastNamePlaceholder={dict.Form.lastNamePlaceholder} email={dict.Form.email} emailPlaceholder={dict.Form.emailPlaceholder} comment={dict.Form.comment} commentPlaceholder={dict.Form.commentPlaceholder} gift={dict.Form.gift} giftPlaceholder={dict.Form.giftPlaceholder} submitButton={dict.Form.submit}  /> 
      </main>

    </section>
  );
}
