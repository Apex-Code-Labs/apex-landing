import Link from 'next/link'
import { Metadata } from 'next'
import Logo from '@/components/Logo'
import { WA_NUMBER, waLink } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Política de Privacidad - Apex Code Labs',
  description: 'Política de privacidad y protección de datos de Apex Code Labs. Conoce cómo manejamos y protegemos tu información personal.',
  robots: 'index, follow'
}

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-primary text-white py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Logo variant="dark" />
            </Link>
            <Link
              href="/"
              className="text-white hover:text-accent transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-8">
            Política de Privacidad
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-SV')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                1. Información que Recopilamos
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                En Apex Code Labs recopilamos la siguiente información cuando utilizas nuestros servicios:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Información de contacto:</strong> Nombre, empresa, correo electrónico, teléfono y país.</li>
                <li><strong>Información del proyecto:</strong> Detalles sobre tus necesidades y servicios de interés.</li>
                <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, y datos de uso del sitio web.</li>
                <li><strong>Comunicaciones:</strong> Mensajes que nos envías a través de formularios o WhatsApp.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                2. Cómo Utilizamos tu Información
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Responder a tus consultas y proporcionar cotizaciones personalizadas.</li>
                <li>Comunicarnos contigo sobre nuestros servicios y proyectos.</li>
                <li>Mejorar nuestros servicios y experiencia del usuario.</li>
                <li>Cumplir con obligaciones legales y contractuales.</li>
                <li>Enviar información relevante sobre nuestros servicios (con tu consentimiento).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                3. Base Legal para el Tratamiento
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Procesamos tu información personal basándonos en:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Consentimiento:</strong> Cuando nos das permiso explícito para procesar tus datos.</li>
                <li><strong>Interés legítimo:</strong> Para responder a consultas y proporcionar servicios solicitados.</li>
                <li><strong>Cumplimiento contractual:</strong> Para ejecutar contratos de servicios.</li>
                <li><strong>Obligación legal:</strong> Para cumplir con requisitos legales aplicables.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                4. Compartir Información
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No vendemos, alquilamos o compartimos tu información personal con terceros, excepto:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio (bajo estrictos acuerdos de confidencialidad).</li>
                <li>Cuando sea requerido por ley o autoridades competentes.</li>
                <li>Para proteger nuestros derechos legales o la seguridad de nuestros usuarios.</li>
                <li>Con tu consentimiento explícito para fines específicos.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                5. Seguridad de los Datos
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Encriptación de datos en tránsito y en reposo.</li>
                <li>Acceso restringido a información personal solo para personal autorizado.</li>
                <li>Auditorías regulares de seguridad y actualizaciones de sistemas.</li>
                <li>Políticas internas de manejo de datos y capacitación del personal.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                6. Retención de Datos
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Conservamos tu información personal solo durante el tiempo necesario para cumplir con los fines 
                para los que fue recopilada, generalmente:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Consultas y cotizaciones:</strong> 3 años desde el último contacto.</li>
                <li><strong>Contratos de servicios:</strong> Durante la vigencia del contrato más 7 años.</li>
                <li><strong>Información de marketing:</strong> Hasta que retires tu consentimiento.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                7. Tus Derechos
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Tienes los siguientes derechos respecto a tu información personal:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Acceso:</strong> Solicitar una copia de la información que tenemos sobre ti.</li>
                <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta.</li>
                <li><strong>Eliminación:</strong> Solicitar la eliminación de tu información personal.</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado y legible.</li>
                <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos para fines específicos.</li>
                <li><strong>Limitación:</strong> Solicitar la restricción del procesamiento de tus datos.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                8. Cookies y Tecnologías Similares
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar tu experiencia. 
                Utilizamos cookies para análisis web (Plausible Analytics) que respeta tu privacidad y 
                no rastrea información personal identificable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                9. Transferencias Internacionales
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de El Salvador. 
                En tales casos, nos aseguramos de que existan garantías adecuadas para proteger tu información 
                personal de acuerdo con estándares internacionales de protección de datos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                10. Cambios a esta Política
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre
                cambios significativos publicando la nueva política en nuestro sitio web y actualizando
                la fecha de &quot;última actualización&quot;.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                11. Contacto
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, 
                puedes contactarnos:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Apex Code Labs</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Email: <a href="mailto:privacidad@apexcodelabs.com" className="text-primary hover:underline">privacidad@apexcodelabs.com</a>
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  WhatsApp: <a href={waLink()} className="text-primary hover:underline">+{WA_NUMBER}</a>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Ubicación: El Salvador
                </p>
              </div>
            </section>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
