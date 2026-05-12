import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { CVData } from '../types/cv';

// Register fonts if needed (standard fonts are usually available)
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    paddingBottom: 15,
  },
  fullName: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af', // This will be dynamic in a real app
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 10,
  },
  contactItem: {
    fontSize: 9,
    color: '#64748b',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottom: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 5,
    marginBottom: 10,
    color: '#94a3b8',
  },
  item: {
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#1e40af',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 8,
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillTag: {
    fontSize: 9,
    padding: '4 8',
    backgroundColor: '#f8fafc',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  }
});

export const CVDocument = ({ data }: { data: CVData }) => {
  const isSidebar = data.metadata.template === 'the-sidebar';

  if (isSidebar) {
    return (
      <Document title={`${data.personalInfo.fullName} CV`}>
        <Page size="A4" style={[styles.page, { padding: 0, flexDirection: 'row' }]}>
          {/* Sidebar */}
          <View style={{ width: '30%', backgroundColor: data.metadata.themeColor, padding: 20, color: '#fff' }}>
            {data.personalInfo.avatar && (
              <Image src={data.personalInfo.avatar} style={{ width: '100%', aspectRatio: 1, borderRadius: 10, marginBottom: 20 }} />
            )}
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' }}>İletişim</Text>
            <View style={{ gap: 5, marginBottom: 20 }}>
              {data.personalInfo.email && <Text style={{ fontSize: 8 }}>{data.personalInfo.email}</Text>}
              {data.personalInfo.phone && <Text style={{ fontSize: 8 }}>{data.personalInfo.phone}</Text>}
              {data.personalInfo.location && <Text style={{ fontSize: 8 }}>{data.personalInfo.location}</Text>}
            </View>

            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' }}>Yetenekler</Text>
            <View style={{ gap: 4 }}>
              {data.skills.flatMap(c => c.items).map((skill) => (
                <Text key={skill.id} style={{ fontSize: 8, backgroundColor: 'rgba(255,255,255,0.1)', padding: '2 4', borderRadius: 2 }}>{skill.name}</Text>
              ))}
            </View>
          </View>

          {/* Main Content */}
          <View style={{ flex: 1, padding: 30 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data.personalInfo.fullName}</Text>
              <Text style={{ fontSize: 12, color: data.metadata.themeColor, marginTop: 5 }}>{data.personalInfo.title}</Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: data.metadata.themeColor }]}>İş Deneyimi</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemDate}>{exp.startDate} — {exp.endDate}</Text>
                  </View>
                  <Text style={{ fontSize: 9, color: data.metadata.themeColor, fontWeight: 'bold' }}>{exp.company}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: data.metadata.themeColor }]}>Eğitim</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.school}</Text>
                    <Text style={styles.itemDate}>{edu.startDate} — {edu.endDate}</Text>
                  </View>
                  <Text style={{ fontSize: 9 }}>{edu.degree} - {edu.field}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // Fallback to Standard
  return (
    <Document title={`${data.personalInfo.fullName} CV`}>
      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { borderBottomColor: data.metadata.themeColor }]}>
          <Text style={styles.fullName}>{data.personalInfo.fullName || 'Ad Soyad'}</Text>
          <Text style={[styles.title, { color: data.metadata.themeColor }]}>{data.personalInfo.title || 'Unvan'}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && <Text style={styles.contactItem}>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={styles.contactItem}>{data.personalInfo.location}</Text>}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İş Deneyimi</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemDate}>{exp.startDate} — {exp.endDate}</Text>
              </View>
              <Text style={[styles.itemSubtitle, { color: data.metadata.themeColor }]}>{exp.company}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eğitim</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.school}</Text>
                <Text style={styles.itemDate}>{edu.startDate} — {edu.endDate}</Text>
              </View>
              <Text style={styles.contactItem}>{edu.degree} - {edu.field}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
