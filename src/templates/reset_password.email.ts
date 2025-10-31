const reset_password_tempalte = (customer_name: string, token: number): string => {
    return `<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperação de Senha</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
            <tr>
                <td style="padding: 40px 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="padding: 40px 40px 30px; border-bottom: 2px solid #f0f0f0;">
                                <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">Recuperação de Senha</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.6;">
                                    Prezado(a) <strong>${customer_name}</strong>,
                                </p>
                                
                                <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                                    Recebemos uma solicitação de recuperação de senha para sua conta. Para prosseguir com a redefinição, utilize o código de verificação abaixo:
                                </p>
                                
                                <!-- Token Box -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                    <tr>
                                        <td style="text-align: center; padding: 28px; background-color: #fafafa; border: 1px solid #e0e0e0;">
                                            <p style="margin: 0 0 12px; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 500;">
                                                Código de Verificação
                                            </p>
                                            <p style="margin: 0; color: #1a1a1a; font-size: 28px; font-weight: 600; letter-spacing: 6px; font-family: 'Courier New', monospace;">
                                                ${token}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 14px; line-height: 1.6;">
                                    <strong>Validade:</strong> Este código expira em 30 minutos e pode ser utilizado apenas uma vez.
                                </p>
                                
                                <!-- Info Box -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                    <tr>
                                        <td style="padding: 20px; background-color: #f9f9f9; border-left: 3px solid #666666;">
                                            <p style="margin: 0; color: #4a4a4a; font-size: 14px; line-height: 1.6;">
                                                <strong>Importante:</strong> Caso você não tenha solicitado esta recuperação, desconsidere este email. Sua senha permanecerá inalterada e sua conta continuará protegida.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 32px 0 0; color: #4a4a4a; font-size: 14px; line-height: 1.6;">
                                    Atenciosamente,<br>
                                    <strong style="color: #1a1a1a;">Equipe de Suporte</strong>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e0e0e0; text-align: center;">
                                <p style="margin: 0 0 8px; color: #999999; font-size: 12px; line-height: 1.5;">
                                    Este é um email automático. Por favor, não responda a esta mensagem.
                                </p>
                                <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                                    © 2025 Casal que Cura. Todos os direitos reservados.
                                </p>
                                <p style="margin: 16px 0 0; color: #cccccc; font-size: 11px;">
                                    Solicitação originada do IP: {{ipAddress}}
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
}

export default reset_password_tempalte;