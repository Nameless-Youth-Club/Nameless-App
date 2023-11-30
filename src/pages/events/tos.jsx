import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import styles from './tos.module.scss';


function TOS() {

   const [_, setLocation] = useLocation()
   const text = `Welcome to nameless. By creating an account and using our services, you agree to the following updated terms and conditions that govern your use of the digital wallet provided by nameless. Please read these terms carefully before proceeding.

   Account Creation and Digital Wallet: a. By signing up on nameless, you represent and warrant that you are of legal age and have the legal capacity to enter into this agreement. Creating an account on our platform will automatically generate a digital wallet for you to store non-speculative digital assets such as tickets to events and other promotional items.
   Use of Digital Assets: a. Your digital assets stored in the nameless wallet are non-transferable and can only be used for personal and promotional purposes within the platform's ecosystem. b. nameless reserves the right to refuse the use of digital assets for any commercial or speculative purposes. The assets stored in your wallet should not be used for any illegal, harmful, or fraudulent activities.
   Promotional Campaigns: a. By accepting these terms, you grant nameless the right to use non-personally identifiable data related to your digital assets for promotional campaigns within our platform. This data may include event preferences, attendance history, and other relevant information. b. To understand how we handle and protect your personal information, please refer to our comprehensive Privacy Policy available here. We will obtain your explicit consent before using any personally identifiable information in promotional campaigns.
   Intellectual Property: a. nameless and its licensors retain all rights, title, and interest in and to the platform, including any related intellectual property rights. You may not use our name, logo, trademarks, or other proprietary information without our prior written consent.
   Liability and Indemnification: a. nameless is not liable for any losses, damages, or liabilities arising from the use of your digital assets or any services provided by the platform, except where prohibited by law. b. You agree to indemnify and hold nameless, its affiliates, officers, employees, and agents from any claims, losses, damages, liabilities, or expenses arising out of your breach of these terms or the use of the platform's services.
   Modification of Terms: a. nameless reserves the right to modify these terms and conditions at any time and will notify you of changes via email or through a prominent notice on the platform. You should review the updated terms regularly. Continued use of our services after any changes constitutes your acceptance of the revised terms.
   Termination of Account: a. nameless may suspend or terminate your account at its discretion if you violate any of these terms and conditions or engage in any prohibited activities. b. Upon termination of your account, nameless may, at its discretion, provide you with the opportunity to withdraw your digital assets from your wallet within a specified period.
   Governing Law: a. These terms and conditions shall be governed by and construed in accordance with the laws of New York State. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in New York State.
   By creating an account on nameless, you acknowledge that you have read, understood, and agreed to these updated terms and conditions. If you do not agree with any part of these terms, you should not proceed with the registration process.

   If you have any questions or concerns regarding these terms, please contact us at nameless@nameless.nyc



   ------

   nameless Privacy Policy

   Last Updated: 9/3/21

   Welcome to nameless. This Privacy Policy explains how we collect, use, disclose, and protect your personal information and data when you use our application and related services. Please read this Privacy Policy carefully to understand your rights and how we handle your data. By using nameless, you consent to the practices described in this Privacy Policy.

   1. Information We Collect:

   Personal Information: We may collect your name, email address, and other contact details when you register for an account.
   Usage Data: We gather information about your interactions with the application, such as your preferences, activities, and event attendance.
   2. Use of Information:

   We use the collected information to provide and personalize our services, process transactions, and manage your digital assets in the wallet.
   The data may also be used to improve our application, analyze user behavior, and enhance user experience.
   Non-personal information may be used for promotional campaigns within our platform, as described in the Terms and Conditions.
   3. Data Sharing and Disclosure:

   We may share your data with trusted third-party service providers to assist with application operation, payment processing, or event organizers.
   Data may also be disclosed when required by law or to protect our rights and interests.
   4. Data Security:

   We implement technical and organizational measures to safeguard your data against unauthorized access, disclosure, or alteration.
   Despite our efforts, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.
   5. Data Retention:

   We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy.
   You may request the deletion of your account and associated data in compliance with applicable laws.
   6. Children's Privacy:

   nameless is not intended for use by children under 13. We do not knowingly collect personal information from children under this age without parental consent.
   7. International Data Transfers:

   Your data may be transferred to and processed in countries outside of your country of residence. We will take measures to ensure that data transfers comply with applicable laws.
   8. Updates to the Privacy Policy:

   We may update this Privacy Policy from time to time to reflect changes in our data practices. We will notify you of any significant updates via email or a notice on the application.
   9. Contact Information:

   If you have any questions or concerns about this Privacy Policy or your data, please contact us at nameless@nameless.nyc.
   By using nameless, you acknowledge that you have read, understood, and agreed to this Privacy Policy. If you do not agree with any part of this policy, please refrain from using the application.`
   return (
      <div className={styles.parentContainer}>
         <h1>Terms of Service</h1>
         <div className={styles.container}>
            <div className={styles.text}>
              {text}
            </div>
         </div>
      </div>
   );
}

export default TOS;
