import java.awt.Color;
import java.awt.Image;
import javax.swing.ImageIcon;
import javax.swing.JFrame;

public class Game extends JFrame {

    private Image hoop, basketballIcon;
    private GamePanel game;

    public Game() {
        super("Baskemtball");
        initializeImages();
        game = new GamePanel(basketballIcon, hoop);
        initialize();
    }

    private void initializeImages() {
        hoop = new ImageIcon("hoop.png").getImage();
        basketballIcon = new ImageIcon("basketball.png").getImage();

        if (basketballIcon == null) {
            System.err.println("Failed to load the basketball icon image.");
        }
    }

    private void initialize() {
        setSize(500, 500);
        setLocationRelativeTo(null);
        setBackground(Color.WHITE);
        setResizable(false);
        addKeyListener(game);
        add(game);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        if (basketballIcon != null) {
            setIconImage(basketballIcon);
        } else {
            System.exit(1); // Exit the application if icon loading fails
        }

        setVisible(true);
        game.run(); // Game starts
    }

    public static void main(String[] args) {
        new Game();
    }
}
